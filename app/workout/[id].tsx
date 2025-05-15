import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ChevronLeft, Clock, Calendar, Trash2 } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import Colors from '@/constants/colors';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getWorkoutById, getExerciseById, deleteWorkout } = useWorkoutStore();
  
  const workout = getWorkoutById(id);

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Workout not found</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  };

  const handleDeleteWorkout = () => {
    deleteWorkout(workout.id);
    router.replace('/workouts');
  };

  const handleExercisePress = (exerciseId: string) => {
    router.push(`/exercise/${exerciseId}`);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: workout.name,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={Colors.text} />
            </Pressable>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{workout.name}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={Colors.primary} style={styles.metaIcon} />
              <Text style={styles.metaText}>{formatDate(workout.date)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.primary} style={styles.metaIcon} />
              <Text style={styles.metaText}>{formatTime(workout.date)}</Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{workout.exercises.length}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatDuration(workout.duration)}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {workout.exercises.map((workoutExercise, index) => {
            const exercise = getExerciseById(workoutExercise.exerciseId);
            if (!exercise) return null;
            
            return (
              <Pressable 
                key={`${workoutExercise.exerciseId}-${index}`}
                style={({ pressed }) => [
                  styles.exerciseItem,
                  pressed && styles.exerciseItemPressed
                ]}
                onPress={() => handleExercisePress(exercise.id)}
              >
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View 
                    style={[
                      styles.categoryBadge, 
                      { backgroundColor: getCategoryColor(exercise.category) }
                    ]}
                  >
                    <Text style={styles.categoryText}>
                      {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.exerciseDetails}>
                  {workoutExercise.sets && workoutExercise.reps && (
                    <Text style={styles.exerciseDetail}>
                      {workoutExercise.sets} sets × {workoutExercise.reps} reps
                    </Text>
                  )}
                  {workoutExercise.duration && (
                    <Text style={styles.exerciseDetail}>
                      {Math.floor(workoutExercise.duration / 60)} min
                    </Text>
                  )}
                  {workoutExercise.distance && (
                    <Text style={styles.exerciseDetail}>
                      {workoutExercise.distance / 1000} km
                    </Text>
                  )}
                  {workoutExercise.weight && (
                    <Text style={styles.exerciseDetail}>
                      {workoutExercise.weight} kg
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
        
        {workout.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>{workout.notes}</Text>
            </View>
          </View>
        )}
        
        <Pressable 
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.buttonPressed
          ]}
          onPress={handleDeleteWorkout}
        >
          <Trash2 size={20} color={Colors.danger} style={styles.deleteIcon} />
          <Text style={styles.deleteButtonText}>Delete Workout</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'strength':
      return Colors.primary;
    case 'cardio':
      return Colors.success;
    case 'flexibility':
      return Colors.warning;
    case 'balance':
      return Colors.secondary;
    default:
      return Colors.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  backButton: {
    padding: 8,
  },
  header: {
    backgroundColor: Colors.card,
    padding: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  metaContainer: {
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaIcon: {
    marginRight: 8,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  stat: {
    marginRight: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  exerciseItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exerciseItemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exerciseDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 16,
  },
  notesContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  notesText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 16,
  },
  buttonPressed: {
    opacity: 0.8,
    backgroundColor: Colors.danger + '10', // 10% opacity
  },
  deleteIcon: {
    marginRight: 8,
  },
  deleteButtonText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: Colors.danger,
    textAlign: 'center',
    marginTop: 24,
  },
});