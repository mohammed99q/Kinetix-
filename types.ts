export enum AppView {
  DASHBOARD = 'DASHBOARD',
  AI_COACH = 'AI_COACH',
  PLAN_GENERATOR = 'PLAN_GENERATOR',
  TECHNIQUE_ANALYSIS = 'TECHNIQUE_ANALYSIS',
  HOME_WORKOUTS = 'HOME_WORKOUTS',
  PROFILE = 'PROFILE',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface TrainingMetric {
  day: string;
  load: number; // Arbitrary unit
  recovery: number; // Percentage
  readiness: number; // Percentage
}

export interface UserProfile {
  name: string;
  sport: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  age: number;
  weight: number; // kg
  height: number; // cm
  expiryDate?: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  target: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  reps: string;
  description: string;
}
