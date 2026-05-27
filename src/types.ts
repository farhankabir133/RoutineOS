/**
 * RoutineOS Data Models
 */

export type Priority = "low" | "medium" | "high";
export type KanbanColumn = "todo" | "in_progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  isCompleted: boolean;
  dueDate?: string;
  tags: string[];
  column: KanbanColumn;
  subtasks: { id: string; title: string; isCompleted: boolean }[];
  recurring?: "daily" | "weekly" | "none";
}

export interface Habit {
  id: string;
  title: string;
  category: string;
  streak: number;
  lastCompleted?: string; // ISO date string (YYYY-MM-DD)
  history: string[]; // List of completed Dates (YYYY-MM-DD)
  targetFrequency: number; // times per week
}

export interface RoutineStep {
  id: string;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
  notes?: string;
}

export interface Routine {
  id: string;
  title: string;
  tagline: string;
  color: string; // e.g., emerald, indigo, violet
  steps: RoutineStep[];
  currentStepIndex: number;
  elapsedSeconds: number;
  isRunning: boolean;
  historyCount: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  tags: string[];
  updatedAt: string;
}

export type CreatorPlatform = "youtube" | "writing" | "linkedin";

export interface CreatorProject {
  id: string;
  platform: CreatorPlatform;
  title: string;
  status: "idea" | "scripting" | "draft" | "scheduled" | "published";
  notes: string;
  checklist: { title: string; checked: boolean }[];
  metricValue?: string; // word count or post date
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  unlockedAt?: string;
  xpReward: number;
}

export interface UserStats {
  xp: number;
  level: number;
  totalFocusedMinutes: number;
  streakDays: number;
}

export interface OnboardingData {
  role: string;
  goals: string[];
  preferredRoutineTimes: string[];
  categories: string[];
  completed: boolean;
  name?: string;
  email?: string;
}
