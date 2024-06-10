import parse from 'csv-simple-parser'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

type HevyData = {
  title: string
  start_time: string
  end_time: string
  description: string
  exercise_title: string
  superset_id: string
  exercise_notes: string
  set_index: string
  set_type: string
  weight_kg: string
  reps: string
  distance_km: string
  duration_seconds: string
  rpe: string
}

type StrongData = {
  Date: string
  'Workout Name': string
  Duration: string
  'Exercise Name': string
  'Set Order': string
  Weight: string
  Reps: string
  Distance: string
  Seconds: string
  Notes: string
  'Workout Notes': string
  RPE: string
}

const hevyFile = Bun.file('./files/hevy.csv')
const hevyData = parse(await hevyFile.text(), { header: true }) as HevyData[]

const strongFile = Bun.file('./files/strong.csv')
const strongData = parse(await strongFile.text(), {
  header: true
}) as StrongData[]

const uniqueHevyExercises = [...new Set(hevyData.map(row => row.exercise_title))].join('\n')
const uniqueStrongExercises = [...new Set(strongData.map(row => row['Exercise Name']))].join('\n')

Bun.write('./files/unique-hevy-exercises.txt', uniqueHevyExercises)
Bun.write('./files/unique-strong-exercises.txt', uniqueStrongExercises)

const mapped: Record<string, string> = {
  'Bench Press (Barbell)': 'Bench Press (Barbell)',
  'Incline Chest Press (Machine)': 'Incline Bench Press (Dumbbell)',
  'Bench Press (Dumbbell)': 'Bench Press (Dumbbell)',
  'Chest Fly (Dumbbell)': 'Chest Fly (Dumbbell)',
  'Squat (Barbell)': 'Squat (Barbell)',
  'Leg Extension (Machine)': 'Leg Extension (Machine)',
  'Lying Leg Curl (Machine)': 'Lying Leg Curl (Machine)',
  'Bicep Curl (Barbell)': 'Bicep Curl (Barbell)',
  'Bicep Curl (Cable)': 'Bicep Curl (Cable)',
  'Bent Over Row (Barbell)': 'Bent Over Row (Barbell)',
  'Lat Pulldown (Cable)': 'Lat Pulldown (Cable)',
  'Seated Wide-Grip Row (Cable)': 'Seated Cable Row - Bar Grip',
  'Lat pull down (crossover)': 'Lat Pulldown (Cable)',
  'Overhead Press (Barbell)': 'Overhead Press (Barbell)',
  'Reverse Fly (Dumbbell)': 'Rear Delt Reverse Fly (Dumbbell)',
  'Front Raise (Dumbbell)': 'Plate Front Raise',
  'Triceps Extension (Dumbbell)': 'Triceps Extension (Dumbbell)',
  'Triceps Pushdown (Cable - Straight Bar)': 'Triceps Pushdown',
  'Incline Bench Press (Dumbbell)': 'Incline Bench Press (Dumbbell)',
  'Cable Crossover': 'Cable Fly Crossovers',
  'Cable Crunch': 'Cable Crunch',
  'Russian Twist': 'Russian Twist (Weighted)',
  'Bicep Curl (Dumbbell)': 'Bicep Curl (Dumbbell)',
  "Knee Raise (Captain's Chair)": 'Leg Raise Parallel Bars',
  'Leg Press': 'Leg Press (Machine)',
  'Seated Calf Raise (Plate Loaded)': 'Seated Calf Raise',
  'Shoulder Press (Machine)': 'Shoulder Press (Dumbbell)',
  'Chest Dip': 'Chest Dip',
  'Seated Row (Cable)': 'Seated Cable Row - V Grip (Cable)',
  'Arnold Press (Dumbbell)': 'Arnold Press (Dumbbell)',
  'Decline Crunch': 'Decline Crunch',
  'Concentration Curl (Dumbbell)': 'Concentration Curl',
  'Ab Wheel': 'Ab Wheel',
  'T Bar Row': 'T Bar Row',
  'Hammer Curl (Dumbbell)': 'Hammer Curl (Dumbbell)',
  'Preacher Curl (Barbell)': 'Preacher Curl (Barbell)',
  'Shrug (Dumbbell)': 'Shrug (Dumbbell)',
  'Pec Deck (Machine)': 'Butterfly (Pec Deck)',
  'Skullcrusher (Barbell)': 'Skullcrusher (Barbell)',
  'Upright Row (Dumbbell)': 'Upright Row (Dumbbell)',
  'T bar row (free weight)': 'T Bar Row',
  'Lat pulldown - Crossover': 'Lat Pulldown (Cable)',
  'Back Extension': 'Back Extension (Hyperextension)',
  Crunch: 'Crunch',
  'Triceps Extension (Cable)': 'Triceps Extension (Cable)',
  'Bench Press (Smith Machine)': 'Bench Press (Smith Machine)',
  'Front Raise (Plate)': 'Plate Front Raise',
  'Lateral Raise (Cable)': 'Lateral Raise (Cable)',
  'Face Pull (Cable)': 'Face Pull',
  'Chest Fly': 'Cable Fly Crossovers',
  'Lunge (Dumbbell)': 'Curtsy Lunge (Dumbbell)',
  'Lunge (Bodyweight)': 'Lunge',
  'Jump Squat': 'Jump Squat',
  'Lateral Raise (Dumbbell)': 'Lateral Raise (Dumbbell)',
  'Chin Up (Assisted)': 'Chin Up',
  'Seated biceps curl (-45deg)': 'Bicep Curl (Dumbbell)',
  'Seated Overhead Press (Dumbbell)': 'Seated Overhead Press (Dumbbell)',
  'Pullover (Dumbbell)': 'Pullover (Dumbbell)',
  'Lat Pulldown (Single Arm)': 'Single Arm Lat Pulldown',
  'Inverted Row (Bodyweight)': 'Inverted Row',
  'Squat (Smith Machine)': 'Squat (Smith Machine)',
  'Upright Row (Barbell)': 'Upright Row (Barbell)',
  'Pull Up': 'Pull Up',
  'Bent Over Row (Dumbbell)': 'Bent Over Row (Dumbbell)',
  'Pull Up (Assisted)': 'Pull Up',
  'Romanian Deadlift (Barbell)': 'Romanian Deadlift (Barbell)',
  'Chest Press (Machine)': 'Chest Press (Machine)',
  'Wrist Roller': 'Wrist Roller',
  'Wrist barbell': 'Seated Wrist Extension (Barbell)',
  'Reverse Curl (Barbell)': 'Reverse Curl (Barbell)',
  'Back wrist barbell': 'Behind the Back Bicep Wrist Curl (Barbell)',
  'Chin Up': 'Chin Up',
  'Iso-Lateral Chest Press (Machine)': 'Iso-Lateral Chest Press (Machine)',
  'Deadlift (Barbell)': 'Deadlift (Barbell)',
  'Reverse Fly (Machine)': 'Rear Delt Reverse Fly (Machine)',
  'Hack Squat': 'Hack Squat (Machine)',
  'Standing Calf Raise (Smith Machine)':
    'Single Leg Standing Calf Raise (Machine)',
  'Chest dip (mashine)': 'Chest Dip',
  'Standing Calf Raise (Bodyweight)':
    'Single Leg Standing Calf Raise (Machine)',
  'Hammer Curl (Cable)': 'Hammer Curl (Cable)',
  'Hanging Knee Raise': 'Hanging Knee Raise',
  'Lat Pulldown - Wide Grip (Cable)': 'Lat Pulldown (Cable)',
  'Calf Press on Leg Press': 'Calf Press (Machine)',
  'Hanging Leg Raise': 'Hanging Leg Raise',
  'Reverse Curl (Dumbbell)': 'Reverse Curl (Dumbbell)',
  'Lat Pulldown (Machine)': 'Lat Pulldown (Machine)',
  'Bench press (close grip)': 'Bench Press - Close Grip (Barbell)',
  'Chest Dip (Assisted)': 'Chest Dip (Assisted)',
  'Sumo Deadlift (Barbell)': 'Sumo Deadlift',
  'Lat pulldown (close grip)': 'Lat Pulldown - Close Grip (Cable)',
  'Front Raise (Barbell)': 'Front Raise (Barbell)',
  'Triceps Extension': 'Triceps Extension (Dumbbell)',
  'Decline Bench Press (Barbell)': 'Decline Bench Press (Barbell)',
  'Iso-Lateral Row (Machine)': 'Iso-Lateral Row (Machine)',
  'Preacher Curl (Machine)': 'Preacher Curl (Machine)',
  'Crunch (Machine)': 'Crunch (Machine)',
  'Seated Leg Curl (Machine)': 'Seated Leg Curl (Machine)'
}

const result = [
  'title,start_time,end_time,description,exercise_title,superset_id,exercise_notes,set_index,set_type,weight_kg,reps,distance_km,duration_seconds,rpe'
]

const dateFormat = 'DD MMM YYYY, HH:mm'

for (const strongRow of strongData) {
  const startTime = dayjs(strongRow.Date)
  let duration = dayjs(strongRow.Duration, 'H[h] m[m]')

  if (duration.isValid() === false) {
    duration = dayjs(strongRow.Duration, 'm[m]')
  }

  if (duration.isValid() === false) {
    continue
  }

  const exericeTitle = mapped[strongRow['Exercise Name']]
  const order = parseInt(strongRow['Set Order'])
  const title = strongRow['Workout Name']
  const weight = parseInt(strongRow.Weight)
  const endTime = startTime
    .add(duration.hour(), 'hours')
    .add(duration.minute(), 'minutes')

  if (!exericeTitle) {
    continue
  }

  const row = {
    title,
    start_time: startTime.format(dateFormat),
    end_time: endTime.format(dateFormat),
    description: '',
    exercise_title: strongRow['Exercise Name'],
    superset_id: '',
    exercise_notes: '',
    set_index: order > 0 ? (order - 1).toString() : order.toString(),
    set_type: 'normal',
    weight_kg: weight,
    reps: strongRow.Reps,
    distance_km: "",
    duration_seconds: "",
    rpe: ""
  }

  result.push(
    Object.values(row)
      .map(v => `"${v}"`)
      .join(',')
  )
}

const output = result.join('\n')
Bun.write('./files/strong2hevy.csv', output)
