import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import Filters from '@/components/ui/Filters';
import Stats from '@/components/ui/Stats';
import { useState } from 'react';

export default function Home() {
  const [filters, setFilters] = useState({ q: '', view: 'all' as 'all' | 'active' | 'done', onlyImportant: false, category: 'all' });

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="rounded-2xl bg-white shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Your Tasks</h1>
            <p className="text-slate-500 text-sm">Capture, prioritize, and track your work.</p>
          </div>
          <TodoForm />
        </div>
      </section>

      <Stats />

      <section className="rounded-2xl bg-white shadow-sm border p-2">
        <Filters value={filters} onChange={setFilters} />
        <div className="p-4">
          <TodoList filters={filters} />
        </div>
      </section>
    </div>
  );
}
