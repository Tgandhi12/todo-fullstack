import api from '@/lib/axios';
import { useState } from 'react';

type Todo = {
  _id: string;
  text: string;
  completed: boolean;
  dueDate: string;
  scheduledDate: string;
  isImportant: boolean;
  category?: string;
};

export default function TodoRow({ todo, onChange }: { todo: Todo; onChange: () => void }) {
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    setBusy(true);
    try {
      await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
      onChange();
    } finally {
      setBusy(false);
    }
  };

  const del = async () => {
    if (!confirm('Delete this task?')) return;
    setBusy(true);
    try {
      await api.delete(`/todos/${todo._id}`);
      onChange();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={'rounded-xl border shadow-sm p-4 bg-white transition ' + (todo.completed ? 'opacity-75' : '')}>
      <div className="flex items-start gap-3">
        <button
          onClick={toggle}
          disabled={busy}
          title="Toggle complete"
          className={
            'w-5 h-5 rounded border flex items-center justify-center mt-1 ' +
            (todo.completed ? 'bg-emerald-500 border-emerald-600 text-white' : '')
          }
        >
          {todo.completed ? '✓' : ''}
        </button>
        <div className="grow">
          <div className={'font-medium pr-6 ' + (todo.completed ? 'line-through text-slate-500' : '')}>{todo.text}</div>
          <div className="mt-1 text-xs text-slate-500 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border">
              {new Date(todo.dueDate).toDateString()}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border">
              Scheduled: {new Date(todo.scheduledDate).toDateString()}
            </span>
            {todo.isImportant && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300">
                ★ Important
              </span>
            )}
                        {todo.category && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                {todo.category}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={del}
          disabled={busy}
          className="text-slate-400 hover:text-red-600 transition"
          title="Delete"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6v12m8-12v12M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

