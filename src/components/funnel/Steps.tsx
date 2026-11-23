// Small "where am I" dots shown above each funnel step's headline.
export function Steps({ current, total = 4 }: { current: number; total?: number }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-1.5" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full ${i + 1 === current ? "w-8 bg-purple" : i + 1 < current ? "w-4 bg-teal" : "w-4 bg-sage-200"}`}
        />
      ))}
    </div>
  );
}
