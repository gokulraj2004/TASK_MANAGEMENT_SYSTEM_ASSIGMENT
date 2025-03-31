import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TasksState {
  items: Task[];
  selectedIds: string[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  searchQuery: string;
  history: Task[][];
  currentHistoryIndex: number;
}

const loadTasksFromStorage = (): Task[] => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch {
    return [];
  }
};

const initialState: TasksState = {
  items: loadTasksFromStorage(),
  selectedIds: [],
  filter: 'all',
  sortBy: 'createdAt',
  searchQuery: '',
  history: [loadTasksFromStorage()],
  currentHistoryIndex: 0,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
      state.history.splice(state.currentHistoryIndex + 1);
      state.history.push([...state.items]);
      state.currentHistoryIndex++;
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.history.splice(state.currentHistoryIndex + 1);
        state.history.push([...state.items]);
        state.currentHistoryIndex++;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      state.history.splice(state.currentHistoryIndex + 1);
      state.history.push([...state.items]);
      state.currentHistoryIndex++;
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        state.history.splice(state.currentHistoryIndex + 1);
        state.history.push([...state.items]);
        state.currentHistoryIndex++;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
    deleteBulkTasks: (state) => {
      state.items = state.items.filter(task => !state.selectedIds.includes(task.id));
      state.selectedIds = [];
      state.history.splice(state.currentHistoryIndex + 1);
      state.history.push([...state.items]);
      state.currentHistoryIndex++;
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    completeBulkTasks: (state) => {
      state.items = state.items.map(task => 
        state.selectedIds.includes(task.id) ? { ...task, completed: true } : task
      );
      state.selectedIds = [];
      state.history.splice(state.currentHistoryIndex + 1);
      state.history.push([...state.items]);
      state.currentHistoryIndex++;
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'priority' | 'createdAt'>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const [removed] = state.items.splice(action.payload.startIndex, 1);
      state.items.splice(action.payload.endIndex, 0, removed);
      state.items.forEach((task, index) => {
        task.order = index;
      });
      state.history.splice(state.currentHistoryIndex + 1);
      state.history.push([...state.items]);
      state.currentHistoryIndex++;
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    undo: (state) => {
      if (state.currentHistoryIndex > 0) {
        state.currentHistoryIndex--;
        state.items = [...state.history[state.currentHistoryIndex]];
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    redo: (state) => {
      if (state.currentHistoryIndex < state.history.length - 1) {
        state.currentHistoryIndex++;
        state.items = [...state.history[state.currentHistoryIndex]];
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  setSelectedIds,
  deleteBulkTasks,
  completeBulkTasks,
  setFilter,
  setSortBy,
  setSearchQuery,
  reorderTasks,
  undo,
  redo,
} = tasksSlice.actions;

export default tasksSlice.reducer;