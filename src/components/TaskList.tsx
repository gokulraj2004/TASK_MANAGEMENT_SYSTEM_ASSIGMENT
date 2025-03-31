import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { RootState } from '../store';
import {
  toggleTaskCompletion,
  deleteTask,
  setSelectedIds,
  deleteBulkTasks,
  completeBulkTasks,
  reorderTasks,
} from '../store/tasksSlice';
import { Task } from '../types/task';
import { Trash2, CheckSquare, Square, AlertCircle, Clock } from 'lucide-react';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, selectedIds, filter, sortBy, searchQuery } = useSelector(
    (state: RootState) => state.tasks
  );

  const filteredTasks = items
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      const search = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { low: 0, medium: 1, high: 2 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(
      reorderTasks({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
  };

  const toggleSelect = (taskId: string) => {
    const newSelectedIds = selectedIds.includes(taskId)
      ? selectedIds.filter((id) => id !== taskId)
      : [...selectedIds, taskId];
    dispatch(setSelectedIds(newSelectedIds));
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => dispatch(completeBulkTasks())}
            className="success-button px-4 py-2 rounded-lg"
          >
            Complete Selected
          </button>
          <button
            onClick={() => dispatch(deleteBulkTasks())}
            className="danger-button px-4 py-2 rounded-lg"
          >
            Delete Selected
          </button>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-card rounded-xl p-4 transition-all duration-200 hover:shadow-xl ${
                        task.completed ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(task.id)}
                            onChange={() => toggleSelect(task.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => dispatch(toggleTaskCompletion(task.id))}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {task.completed ? (
                              <CheckSquare className="w-5 h-5" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <div className="flex-grow">
                          <h3
                            className={`text-lg font-medium ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{task.description}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <AlertCircle
                                className={`w-4 h-4 ${getPriorityColor(
                                  task.priority
                                )}`}
                              />
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(deleteTask(task.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {filteredTasks.length === 0 && (
        <div className="task-card rounded-xl p-8 text-center text-gray-500">
          No tasks found. Add some tasks to get started!
        </div>
      )}
    </div>
  );
};

export default TaskList;