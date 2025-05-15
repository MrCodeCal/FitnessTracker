import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workout-store';
import WorkoutCard from '@/components/WorkoutCard';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';

export default function WorkoutsScreen() {
  const router = useRouter();
  const { workouts, startWorkout } = useWorkoutStore();

  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleStartWorkout = () => {
    startWorkout("New Workout");
    router.push('/add-workout');
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.buttonPressed
        ]}
        onPress={handleStartWorkout}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Start New Workout</Text>
      </Pressable>

      {sortedWorkouts.length > 0 ? (
        <FlatList
          data={sortedWorkouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState 
          message="No workouts yet" 
          subMessage="Start tracking your fitness journey by adding a workout"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
});