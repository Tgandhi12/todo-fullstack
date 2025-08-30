import { useState } from 'react';
import api from '@/lib/axios';

export default function TodoForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ text: '', dueDate: '', scheduledDate: '', isImportant: false, category: '' });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post('/todos', form);
      setForm({ text: '', dueDate: '', scheduledDate: '', isImportant: false, category: '' });
      setOpen(false);
      window.dispatchEvent(new CustomEvent('todos:created'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full flex md:justify-end">
      {!open ? (
        <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 text-sm">
          + New Task
        </button>
      ) : (
        <form onSubmit={submit} className="w-full md:w-auto bg-slate-50 border rounded-xl p-3 md:flex md:items-end md:gap-2">
          <input
            required
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Task title"
            className="bg-white border rounded-md px-2 py-2 text-sm w-full md:w-60"
          />
          <input
            required
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="bg-white border rounded-md px-2 py-2 text-sm"
          />
          <input
            required
            type="date"
            value={form.scheduledDate}
            onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
            className="bg-white border rounded-md px-2 py-2 text-sm"
          />
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
            className="bg-white border rounded-md px-2 py-2 text-sm w-28"
          />
          <label className="inline-flex items-center gap-2 text-sm px-2">
            <input type="checkbox" checked={form.isImportant} onChange={(e) => setForm({ ...form, isImportant: e.target.checked })} />
            Important
          </label>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button disabled={busy} className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">
              {busy ? 'Adding...' : 'Add'}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
