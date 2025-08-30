type FiltersValue = {
  q: string;
  view: 'all' | 'active' | 'done';
  onlyImportant: boolean;
  category: string;
};

export default function Filters({ value, onChange }: { value: FiltersValue; onChange: (v: FiltersValue) => void }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center p-3">
      <div className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-white grow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Search tasks..."
          className="outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
        {(['all', 'active', 'done'] as const).map((v) => (
          <button
            key={v}
            onClick={() => onChange({ ...value, view: v })}
            className={
              'px-3 py-1 text-sm rounded-md ' + (value.view === v ? 'bg-white border shadow-sm' : 'text-slate-600')
            }
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value.onlyImportant}
          onChange={(e) => onChange({ ...value, onlyImportant: e.target.checked })}
        />
        Only important
      </label>

      <select
        value={value.category}
        onChange={(e) => onChange({ ...value, category: e.target.value })}
        className="text-sm border rounded-md px-2 py-1 bg-white"
      >
        <option value="all">All categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
      </select>
    </div>
  );
}
