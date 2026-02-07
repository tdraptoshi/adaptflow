import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { userId, healthData } = await request.json()

    console.log('Apple Health sync started for user:', userId)

    if (!userId || !healthData || !Array.isArray(healthData)) {
      return NextResponse.json({ 
        error: 'Invalid request. Expected userId and healthData array.' 
      }, { status: 400 })
    }

    // Verify user exists
    const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(userId)
    if (authError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let recordsAdded = 0
    let recordsSkipped = 0

    // Process each health data record
    for (const record of healthData) {
      const {
        dataType,      // 'steps', 'distance', 'activeEnergy', 'workout'
        value,         // numeric value
        unit,          // 'count', 'meters', 'calories', 'minutes'
        sourceName,    // 'Apple Watch', 'iPhone', etc.
        startDate,     // ISO 8601 timestamp
        endDate,       // ISO 8601 timestamp
        metadata       // optional: workout type, etc.
      } = record

      // Validate required fields
      if (!dataType || value === undefined || !startDate || !endDate) {
        console.log('Skipping invalid record:', record)
        recordsSkipped++
        continue
      }

      // Check if record already exists (deduplication)
      const { data: existing } = await supabase
        .from('apple_health_data')
        .select('id')
        .eq('user_id', userId)
        .eq('data_type', dataType)
        .eq('start_date', startDate)
        .eq('end_date', endDate)
        .eq('value', value)
        .single()

      if (existing) {
        console.log('Duplicate record skipped:', dataType, startDate)
        recordsSkipped++
        continue
      }

      // Insert health data record
      const { error: insertError } = await supabase
        .from('apple_health_data')
        .insert({
          user_id: userId,
          data_type: dataType,
          value: value,
          unit: unit || 'count',
          source_name: sourceName || 'Apple Health',
          start_date: startDate,
          end_date: endDate
        })

      if (insertError) {
        console.error('Error inserting health data:', insertError)
        continue
      }

      recordsAdded++
    }

    console.log(`Sync complete: ${recordsAdded} added, ${recordsSkipped} skipped`)

    // After storing data, sync to active challenges
    await syncHealthDataToChallenges(userId)

    return NextResponse.json({ 
      success: true,
      recordsAdded,
      recordsSkipped,
      message: `Synced ${recordsAdded} health records`
    })

  } catch (error: any) {
    console.error('Apple Health sync error:', error)
    return NextResponse.json({ 
      error: error.message || 'Sync failed'
    }, { status: 500 })
  }
}

// Sync Apple Health data to user's active challenges
async function syncHealthDataToChallenges(userId: string) {
  try {
    // Get user's active challenge participations
    const { data: participations } = await supabase
      .from('challenge_participants')
      .select('challenge_id')
      .eq('user_id', userId)

    if (!participations || participations.length === 0) {
      console.log('User not in any challenges')
      return
    }

    // Get challenge details
    const challengeIds = participations.map(p => p.challenge_id)
    const { data: challenges } = await supabase
      .from('challenges')
      .select('*')
      .in('id', challengeIds)
      .eq('status', 'active')

    if (!challenges || challenges.length === 0) {
      console.log('No active challenges found')
      return
    }

    // Process each challenge
    for (const challenge of challenges) {
      // Only sync to step challenges
      if (challenge.activity_type !== 'steps') {
        console.log(`Skipping non-step challenge: ${challenge.name}`)
        continue
      }

      const challengeStartDate = new Date(challenge.start_date)
      const challengeEndDate = new Date(challenge.end_date)

      console.log(`Syncing to challenge: ${challenge.name}`)

      // Get daily step counts within challenge date range
      const { data: stepData } = await supabase
        .from('apple_health_data')
        .select('*')
        .eq('user_id', userId)
        .eq('data_type', 'steps')
        .gte('start_date', challengeStartDate.toISOString())
        .lte('end_date', challengeEndDate.toISOString())
        .order('start_date', { ascending: true })

      if (!stepData || stepData.length === 0) {
        console.log('No step data found in date range')
        continue
      }

      // Aggregate steps by day (take MAX value per day to avoid duplicates)
      const dailySteps: { [key: string]: number } = {}
      
      stepData.forEach(record => {
        const day = new Date(record.start_date).toISOString().split('T')[0]
        dailySteps[day] = Math.max(dailySteps[day] || 0, record.value)
      })

      // Create/update challenge activities for each day
      for (const [day, steps] of Object.entries(dailySteps)) {
        // Check if activity already exists for this day
        const { data: existingActivity } = await supabase
          .from('challenge_activities')
          .select('id, steps, source')
          .eq('challenge_id', challenge.id)
          .eq('user_id', userId)
          .eq('activity_date', day)
          .single()

        if (existingActivity) {
          // Only update if Apple Health has more steps or higher priority
          const SOURCE_PRIORITY: { [key: string]: number } = {
            'garmin': 1,
            'coros': 2,
            'strava': 3,
            'apple_health': 4,
            'fitbit': 5,
            'manual': 6
          }

          const existingPriority = SOURCE_PRIORITY[existingActivity.source] || 6
          const applePriority = SOURCE_PRIORITY['apple_health']

          if (applePriority < existingPriority || steps > existingActivity.steps) {
            // Update with Apple Health data
            await supabase
              .from('challenge_activities')
              .update({
                steps: steps,
                source: 'apple_health'
              })
              .eq('id', existingActivity.id)

            console.log(`Updated activity for ${day}: ${steps} steps`)
          } else {
            console.log(`Skipped ${day}: existing source has priority`)
          }
        } else {
          // Insert new activity
          await supabase
            .from('challenge_activities')
            .insert({
              challenge_id: challenge.id,
              user_id: userId,
              distance: 0,
              duration_minutes: 0,
              steps: steps,
              activity_date: day,
              notes: `${steps.toLocaleString()} steps from Apple Health`,
              source: 'apple_health'
            })

          console.log(`Added activity for ${day}: ${steps} steps`)
        }
      }

      // Recalculate participant totals
      await recalculateChallengeParticipant(userId, challenge.id)
    }

  } catch (error) {
    console.error('Error syncing to challenges:', error)
  }
}

// Recalculate participant totals for a challenge
async function recalculateChallengeParticipant(userId: string, challengeId: number) {
  try {
    // Get all activities for this user in this challenge
    const { data: activities } = await supabase
      .from('challenge_activities')
      .select('*')
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)

    if (!activities) return

    // Calculate totals
    const totalMiles = activities.reduce((sum, a) => sum + (a.distance || 0), 0)
    const totalDuration = activities.reduce((sum, a) => sum + (a.duration_minutes || 0), 0)
    const activityCount = activities.length

    // For steps: aggregate by day and sum (to handle multiple entries per day)
    const dailySteps: { [key: string]: number } = {}
    activities.forEach(activity => {
      if (activity.steps) {
        const day = activity.activity_date
        dailySteps[day] = Math.max(dailySteps[day] || 0, activity.steps)
      }
    })
    const totalSteps = Object.values(dailySteps).reduce((sum, steps) => sum + steps, 0)

    // Get last activity date
    const lastActivityDate = activities.length > 0
      ? activities.sort((a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime())[0].activity_date
      : null

    // Update participant record
    await supabase
      .from('challenge_participants')
      .update({
        total_miles: totalMiles,
        total_duration: totalDuration,
        total_steps: totalSteps,
        activity_count: activityCount,
        last_activity_date: lastActivityDate
      })
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)

    console.log(`Updated totals: ${totalSteps} steps, ${activityCount} activities`)

  } catch (error) {
    console.error('Error recalculating totals:', error)
  }
}
