import { Workout } from '@/types/exercise';

export const workouts: Workout[] = [
  {
    id: '1',
    date: '2023-11-15T08:30:00Z',
    name: 'Morning Strength',
    exercises: [
      { exerciseId: '1', sets: 3, reps: 15 },
      { exerciseId: '2', sets: 4, reps: 12 },
      { exerciseId: '4', duration: 60 }
    ],
    duration: 1800,
    notes: 'Felt strong today!'
  },
  {
    id: '2',
    date: '2023-11-13T17:00:00Z',
    name: 'Cardio Session',
    exercises: [
      { exerciseId: '3', duration: 1200, distance: 3000 },
      { exerciseId: '7', duration: 900, distance: 5000 }
    ],
    duration: 2100,
    notes: 'Pushed hard on the bike'
  },
  {
    id: '3',
    date: '2023-11-10T12:15:00Z',
    name: 'Full Body Workout',
    exercises: [
      { exerciseId: '5', sets: 3, reps: 8, weight: 70 },
      { exerciseId: '2', sets: 3, reps: 12 },
      { exerciseId: '8', sets: 3, reps: 6 },
      { exerciseId: '6', duration: 300 }
    ],
    duration: 2700,
    notes: 'Great session, increased deadlift weight'
  }
];