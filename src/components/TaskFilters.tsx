import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSortBy, setSearchQuery } from '../store/tasksSlice';
import { RootState } from '../store';
import { Search } from 'lucide-react';

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, sortBy, searchQuery } = useSelector((state: RootState) => state.tasks);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tasks..."
            className="input-field w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value as any))}
          className="input-field px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          className="input-field px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="createdAt">Sort by Created Date</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;