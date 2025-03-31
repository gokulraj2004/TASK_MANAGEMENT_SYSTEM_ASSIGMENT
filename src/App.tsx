import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { undo, redo } from './store/tasksSlice';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import { Undo2, Redo2 } from 'lucide-react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          dispatch(redo());
        } else {
          dispatch(undo());
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Task Manager
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(undo())}
                className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-5 h-5 text-blue-600" />
              </button>
              <button
                onClick={() => dispatch(redo())}
                className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
                title="Redo (Ctrl+Shift+Z)"
              >
                <Redo2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
          <TaskForm />
        </header>
        <main>
          <TaskFilters />
          <TaskList />
        </main>
      </div>
    </div>
  );
}

export default App;