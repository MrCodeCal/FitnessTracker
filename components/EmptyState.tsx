import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dumbbell } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
}

export default function EmptyState({ message, subMessage }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Dumbbell size={64} color={Colors.inactive} />
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginTop: 16,
  },
  subMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});