import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import TodoRow from '@/components/ui/TodoRow';
import EmptyState from '@/components/ui/EmptyState';

type Todo = {
  _id: string;
  text: string;
  completed: boolean;
  dueDate: string;
  scheduledDate: string;
  isImportant: boolean;
  category?: string;
};

export default function TodoList({
  filters
}: {
  filters: { q: string; view: 'all' | 'active' | 'done'; onlyImportant: boolean; category: string };
}) {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/todos');
      setData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener('todos:created', handler as EventListener);
    return () => window.removeEventListener('todos:created', handler as EventListener);
  }, []);

  const filtered = data.filter((t) => {
    if (filters.q && !t.text.toLowerCase().includes(filters.q.toLowerCase())) return false;
    if (filters.view === 'active' && t.completed) return false;
    if (filters.view === 'done' && !t.completed) return false;
    if (filters.onlyImportant && !t.isImportant) return false;
    if (filters.category !== 'all' && (t.category || '').toLowerCase() !== filters.category) return false;
    return true;
  });

  if (loading) return <div className="text-sm text-slate-500">Loading tasks...</div>;
  if (!filtered.length) return <EmptyState onRefresh={load} />;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((t) => (
        <TodoRow key={t._id} todo={t} onChange={load} />
      ))}
    </div>
  );
}
