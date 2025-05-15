export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility' | 'balance';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  description: string;
  imageUrl: string;
  muscles: string[];
  equipment?: string[];
  instructions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkoutExercise {
  exerciseId: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  weight?: number; // in kg
}

export interface Workout {
  id: string;
  date: string; // ISO string
  name: string;
  exercises: WorkoutExercise[];
  duration: number; // in seconds
  notes?: string;
}