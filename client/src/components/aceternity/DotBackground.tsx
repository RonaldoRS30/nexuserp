export function DotBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.55]"
      style={{
        backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
      aria-hidden
    />
  );
}
