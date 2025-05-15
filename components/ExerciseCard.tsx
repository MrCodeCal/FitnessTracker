import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { Exercise } from '@/types/exercise';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/exercise/${exercise.id}`);
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
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <Image
        source={{ uri: exercise.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{exercise.name}</Text>
        <View style={styles.details}>
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
          <Text style={styles.difficulty}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {exercise.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  difficulty: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});