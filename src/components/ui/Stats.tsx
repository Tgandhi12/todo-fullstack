import { useEffect, useState } from 'react';
import api from '@/lib/axios';

type Todo = { _id: string; completed: boolean; isImportant: boolean };

export default function Stats() {
  const [stats, setStats] = useState({ total: 0, done: 0, important: 0 });

  useEffect(() => {
    api
      .get('/todos')
      .then((res) => {
        const list: Todo[] = res.data || [];
        const done = list.filter((t) => t.completed).length;
        const important = list.filter((t) => t.isImportant).length;
        setStats({ total: list.length, done, important });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="All Tasks" value={stats.total} hint="Everything on your plate" />
      <Card title="Completed" value={stats.done} hint="Great job!" />
      <Card title="Important" value={stats.important} hint="High priority items" />
    </section>
  );
}

function Card({ title, value, hint }: { title: string; value: number; hint: string }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border p-5">
      <div className="text-xs uppercase tracking-wider text-slate-500">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-slate-500 mt-2">{hint}</div>
    </div>
  );
}
