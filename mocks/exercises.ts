import { Exercise } from '@/types/exercise';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'strength',
    description: 'A classic bodyweight exercise that targets the chest, shoulders, and triceps.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
    muscles: ['chest', 'shoulders', 'triceps'],
    instructions: [
      'Start in a plank position with hands slightly wider than shoulder-width apart',
      'Lower your body until your chest nearly touches the floor',
      'Push yourself back up to the starting position',
      'Repeat for the desired number of repetitions'
    ],
    difficulty: 'beginner'
  },
  {
    id: '2',
    name: 'Squats',
    category: 'strength',
    description: 'A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.',
    imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2069&auto=format&fit=crop',
    muscles: ['quadriceps', 'hamstrings', 'glutes', 'core'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending your knees and pushing your hips back',
      'Keep your chest up and back straight',
      'Lower until thighs are parallel to the ground (or as low as comfortable)',
      'Push through your heels to return to standing position'
    ],
    difficulty: 'beginner'
  },
  {
    id: '3',
    name: 'Running',
    category: 'cardio',
    description: 'A high-impact cardiovascular exercise that improves endurance and burns calories.',
    imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop',
    muscles: ['quadriceps', 'hamstrings', 'calves', 'glutes'],
    instructions: [
      'Start with a proper warm-up',
      'Maintain good posture with shoulders relaxed',
      'Land midfoot and roll through to push off with your toes',
      'Keep a consistent pace for your desired duration',
      'Cool down with a slower pace at the end'
    ],
    difficulty: 'intermediate'
  },
  {
    id: '4',
    name: 'Plank',
    category: 'strength',
    description: 'An isometric core exercise that improves stability and strengthens the abdominals.',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=2070&auto=format&fit=crop',
    muscles: ['core', 'shoulders', 'back'],
    instructions: [
      'Start in a forearm plank position with elbows aligned below shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      'Hold the position for the desired duration',
      'Breathe normally throughout'
    ],
    difficulty: 'beginner'
  },
  {
    id: '5',
    name: 'Deadlift',
    category: 'strength',
    description: 'A compound exercise that targets multiple muscle groups, particularly the posterior chain.',
    imageUrl: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=2070&auto=format&fit=crop',
    muscles: ['hamstrings', 'glutes', 'lower back', 'traps'],
    equipment: ['barbell', 'dumbbells'],
    instructions: [
      'Stand with feet hip-width apart, barbell over midfoot',
      'Bend at hips and knees to grip the bar with hands shoulder-width apart',
      'Keep your back straight and chest up',
      'Push through your heels and stand up straight, lifting the bar',
      'Return the weight to the ground with controlled movement'
    ],
    difficulty: 'intermediate'
  },
  {
    id: '6',
    name: 'Yoga - Downward Dog',
    category: 'flexibility',
    description: 'A yoga pose that stretches the hamstrings, calves, and shoulders while strengthening the arms and legs.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop',
    muscles: ['hamstrings', 'calves', 'shoulders', 'arms'],
    instructions: [
      'Start on hands and knees in a tabletop position',
      'Lift your hips up and back to form an inverted V shape',
      'Straighten your legs as much as comfortable',
      'Press your heels toward the floor',
      'Hold the position while breathing deeply'
    ],
    difficulty: 'beginner'
  },
  {
    id: '7',
    name: 'Cycling',
    category: 'cardio',
    description: 'A low-impact cardiovascular exercise that strengthens the legs and improves endurance.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
    muscles: ['quadriceps', 'hamstrings', 'calves', 'glutes'],
    equipment: ['bicycle', 'stationary bike'],
    instructions: [
      'Adjust the seat height so your leg is slightly bent at the bottom of the pedal stroke',
      'Maintain good posture with a slight forward lean',
      'Pedal at a consistent cadence',
      'Vary intensity as needed for your workout goals',
      'Cool down with lower resistance at the end'
    ],
    difficulty: 'beginner'
  },
  {
    id: '8',
    name: 'Pull-ups',
    category: 'strength',
    description: 'An upper body compound exercise that primarily targets the back and biceps.',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=1974&auto=format&fit=crop',
    muscles: ['lats', 'biceps', 'shoulders', 'forearms'],
    equipment: ['pull-up bar'],
    instructions: [
      'Grip the bar with hands slightly wider than shoulder-width apart',
      'Hang with arms fully extended',
      'Pull yourself up until your chin is over the bar',
      'Lower yourself with control back to the starting position',
      'Repeat for the desired number of repetitions'
    ],
    difficulty: 'advanced'
  }
];