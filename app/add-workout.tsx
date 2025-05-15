import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Plus, X, Save, Trash2 } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import Colors from '@/constants/colors';

export default function AddWorkoutScreen() {
  const router = useRouter();
  const { 
    activeWorkout, 
    exercises, 
    endWorkout, 
    removeExerciseFromWorkout,
    getExerciseById
  } = useWorkoutStore();
  
  const [workoutName, setWorkoutName] = useState(activeWorkout?.name || 'New Workout');
  const [notes, setNotes] = useState(activeWorkout?.notes || '');

  if (!activeWorkout) {
    router.replace('/');
    return null;
  }

  const handleSaveWorkout = () => {
    if (activeWorkout.exercises.length === 0) {
      Alert.alert(
        "No Exercises",
        "Please add at least one exercise to your workout.",
        [{ text: "OK" }]
      );
      return;
    }

    // Update workout name if changed
    if (workoutName !== activeWorkout.name) {
      activeWorkout.name = workoutName;
    }

    endWorkout(notes);
    router.replace('/workouts');
  };

  const handleAddExercise = () => {
    router.push('/exercises');
  };

  const handleRemoveExercise = (index: number) => {
    removeExerciseFromWorkout(index);
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Workout",
      "Are you sure you want to cancel this workout? All progress will be lost.",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          style: "destructive",
          onPress: () => {
            useWorkoutStore.setState({ activeWorkout: null });
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Create Workout",
          headerLeft: () => (
            <Pressable onPress={handleCancel} style={styles.headerButton}>
              <X size={24} color={Colors.danger} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleSaveWorkout} style={styles.headerButton}>
              <Save size={24} color={Colors.primary} />
            </Pressable>
          ),
        }} 
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Workout Name</Text>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <Pressable 
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.buttonPressed
              ]}
              onPress={handleAddExercise}
            >
              <Plus size={16} color="white" />
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </Pressable>
          </View>
          
          {activeWorkout.exercises.length > 0 ? (
            activeWorkout.exercises.map((workoutExercise, index) => {
              const exercise = getExerciseById(workoutExercise.exerciseId);
              if (!exercise) return null;
              
              return (
                <View key={`${workoutExercise.exerciseId}-${index}`} style={styles.exerciseItem}>
                  <View style={styles.exerciseContent}>
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
                  <Pressable 
                    style={({ pressed }) => [
                      styles.removeButton,
                      pressed && styles.removeButtonPressed
                    ]}
                    onPress={() => handleRemoveExercise(index)}
                  >
                    <Trash2 size={20} color={Colors.danger} />
                  </Pressable>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyExercises}>
              <Text style={styles.emptyText}>No exercises added yet</Text>
              <Text style={styles.emptySubtext}>
                Tap the "Add Exercise" button to add exercises to your workout
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes about your workout (optional)"
            placeholderTextColor={Colors.textSecondary}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        <Pressable 
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.buttonPressed
          ]}
          onPress={handleSaveWorkout}
        >
          <Text style={styles.saveButtonText}>Save Workout</Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  headerButton: {
    padding: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
  },
  notesInput: {
    height: 120,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonPressed: {
    opacity: 0.7,
  },
  emptyExercises: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});