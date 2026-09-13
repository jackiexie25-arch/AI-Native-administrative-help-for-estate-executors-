export function ProgressBar({
  value,
  colorClass = "bg-warm-primary",
  trackClass = "bg-warm-border",
  height = "h-2",
}: {
  value: number; // 0-100
  colorClass?: string;
  trackClass?: string;
  height?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full overflow-hidden rounded-full ${height} ${trackClass}`}>
      <div
        className={`${height} rounded-full transition-all ${colorClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
