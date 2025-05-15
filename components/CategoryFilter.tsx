import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Colors from '@/constants/colors';
import { ExerciseCategory } from '@/types/exercise';

interface CategoryFilterProps {
  selectedCategory: ExerciseCategory | 'all';
  onSelectCategory: (category: ExerciseCategory | 'all') => void;
}

const categories: Array<ExerciseCategory | 'all'> = [
  'all', 'strength', 'cardio', 'flexibility', 'balance'
];

export default function CategoryFilter({ 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  
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
      case 'all':
      default:
        return Colors.text;
    }
  };

  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <Pressable
          key={category}
          style={({ pressed }) => [
            styles.categoryButton,
            selectedCategory === category && {
              backgroundColor: getCategoryColor(category) + '20', // 20% opacity
              borderColor: getCategoryColor(category),
            },
            pressed && styles.pressed
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text 
            style={[
              styles.categoryText,
              selectedCategory === category && {
                color: getCategoryColor(category),
                fontWeight: '600',
              }
            ]}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});