export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  order: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'priority' | 'createdAt';