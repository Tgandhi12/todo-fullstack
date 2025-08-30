export default function EmptyState({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-dashed p-10 bg-white">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-slate-300">
        <path
          d="M8 6h8M8 10h8M8 14h5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <h3 className="mt-3 font-medium">No tasks found</h3>
      <p className="text-sm text-slate-500">Try creating a task or adjusting your filters.</p>
      <button
        onClick={onRefresh}
        className="mt-4 px-3 py-1.5 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-700"
      >
        Refresh
      </button>
    </div>
  );
}
