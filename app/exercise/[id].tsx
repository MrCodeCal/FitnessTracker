import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ChevronLeft, Clock, Dumbbell, Target } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import Colors from '@/constants/colors';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getExerciseById, activeWorkout, addExerciseToWorkout } = useWorkoutStore();
  
  const exercise = getExerciseById(id);

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </View>
    );
  }

  const handleAddToWorkout = () => {
    if (activeWorkout) {
      addExerciseToWorkout({ exerciseId: exercise.id });
      router.push('/add-workout');
    } else {
      // Start a new workout and add this exercise
      useWorkoutStore.getState().startWorkout("New Workout");
      setTimeout(() => {
        addExerciseToWorkout({ exerciseId: exercise.id });
        router.push('/add-workout');
      }, 100);
    }
  };

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

  return (
    <>
      <Stack.Screen 
        options={{
          title: exercise.name,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={Colors.text} />
            </Pressable>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image
          source={{ uri: exercise.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
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
        
        <Text style={styles.description}>{exercise.description}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Target size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Target Muscles</Text>
            <Text style={styles.infoValue}>
              {exercise.muscles.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Dumbbell size={20} color={Colors.primary} />
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={styles.infoValue}>
              {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
            </Text>
          </View>
          
          {exercise.equipment && (
            <View style={styles.infoItem}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Equipment</Text>
              <Text style={styles.infoValue}>
                {exercise.equipment.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {exercise.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>{index + 1}</Text>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
        
        <Pressable 
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed
          ]}
          onPress={handleAddToWorkout}
        >
          <Text style={styles.addButtonText}>
            {activeWorkout ? 'Add to Current Workout' : 'Start Workout with This Exercise'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

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
  image: {
    width: '100%',
    height: 240,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoContainer: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
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
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    marginRight: 12,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: 'white',
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