export function LoadingSpinner({
  centered = true,
  minHeight = '80vh',
  size = 'md',
  ariaLabel = 'Загрузка...',
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div
      className={`rounded-full border-gray-200 border-t-primary animate-spin ${sizeClasses[size]}`}
      role="status"
    />
  );

  if (!centered) return spinner;

  return (
    <div
      className="flex items-center justify-center"
      style={minHeight ? { minHeight } : undefined}
      aria-busy="true"
      aria-label={ariaLabel}
    >
      {spinner}
    </div>
  );
}
