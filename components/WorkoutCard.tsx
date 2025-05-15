import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { Workout } from '@/types/exercise';
import { useWorkoutStore } from '@/store/workout-store';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const router = useRouter();
  const getExerciseById = useWorkoutStore((state) => state.getExerciseById);

  const handlePress = () => {
    router.push(`/workout/${workout.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getExerciseNames = () => {
    return workout.exercises.map(ex => {
      const exercise = getExerciseById(ex.exerciseId);
      return exercise?.name || 'Unknown exercise';
    }).join(', ');
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.date}>{formatDate(workout.date)}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{workout.exercises.length}</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatDuration(workout.duration)}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
      </View>
      
      <Text style={styles.exercises} numberOfLines={1}>
        {getExerciseNames()}
      </Text>
      
      {workout.notes && (
        <Text style={styles.notes} numberOfLines={1}>
          Note: {workout.notes}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stat: {
    marginRight: 24,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  exercises: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});