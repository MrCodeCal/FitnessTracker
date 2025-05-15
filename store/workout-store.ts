import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, Workout, WorkoutExercise } from '@/types/exercise';
import { exercises as mockExercises } from '@/mocks/exercises';
import { workouts as mockWorkouts } from '@/mocks/workouts';

interface WorkoutState {
  exercises: Exercise[];
  workouts: Workout[];
  activeWorkout: Workout | null;
  
  // Actions
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  startWorkout: (name: string) => void;
  endWorkout: (notes?: string) => void;
  addExerciseToWorkout: (exercise: WorkoutExercise) => void;
  updateExerciseInWorkout: (index: number, exercise: WorkoutExercise) => void;
  removeExerciseFromWorkout: (index: number) => void;
  getExerciseById: (id: string) => Exercise | undefined;
  getWorkoutById: (id: string) => Workout | undefined;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      exercises: mockExercises,
      workouts: mockWorkouts,
      activeWorkout: null,

      addWorkout: (workout) => 
        set((state) => ({ workouts: [...state.workouts, workout] })),
      
      updateWorkout: (workout) => 
        set((state) => ({
          workouts: state.workouts.map((w) => 
            w.id === workout.id ? workout : w
          ),
        })),
      
      deleteWorkout: (id) => 
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        })),
      
      startWorkout: (name) => {
        const newWorkout: Workout = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          name,
          exercises: [],
          duration: 0,
        };
        set({ activeWorkout: newWorkout });
      },
      
      endWorkout: (notes) => {
        const { activeWorkout } = get();
        if (activeWorkout) {
          const completedWorkout: Workout = {
            ...activeWorkout,
            notes,
            duration: Math.floor((Date.now() - new Date(activeWorkout.date).getTime()) / 1000),
          };
          get().addWorkout(completedWorkout);
          set({ activeWorkout: null });
        }
      },
      
      addExerciseToWorkout: (exercise) => {
        const { activeWorkout } = get();
        if (activeWorkout) {
          set({
            activeWorkout: {
              ...activeWorkout,
              exercises: [...activeWorkout.exercises, exercise],
            },
          });
        }
      },
      
      updateExerciseInWorkout: (index, exercise) => {
        const { activeWorkout } = get();
        if (activeWorkout) {
          const updatedExercises = [...activeWorkout.exercises];
          updatedExercises[index] = exercise;
          set({
            activeWorkout: {
              ...activeWorkout,
              exercises: updatedExercises,
            },
          });
        }
      },
      
      removeExerciseFromWorkout: (index) => {
        const { activeWorkout } = get();
        if (activeWorkout) {
          const updatedExercises = [...activeWorkout.exercises];
          updatedExercises.splice(index, 1);
          set({
            activeWorkout: {
              ...activeWorkout,
              exercises: updatedExercises,
            },
          });
        }
      },
      
      getExerciseById: (id) => {
        return get().exercises.find((e) => e.id === id);
      },
      
      getWorkoutById: (id) => {
        return get().workouts.find((w) => w.id === id);
      },
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);