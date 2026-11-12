/**
 * Decorative, static background for the hero: a faded engineering grid and two
 * soft colour fields. Pure CSS (no animation) so it costs nothing at runtime.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-[70%] rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_65%)] blur-2xl" />
      <div className="absolute -top-24 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,var(--glow-b),transparent_65%)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
