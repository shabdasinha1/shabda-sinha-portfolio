/**
 * Decorative, static background for the hero: soft blue and pink light fields
 * behind the headline and a faint grid that fades out. Pure CSS (no animation),
 * so it costs nothing at runtime.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_20%,transparent_70%)]" />
      <div className="absolute -top-56 left-1/2 h-[44rem] w-[44rem] -translate-x-[78%] rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_62%)] blur-3xl" />
      <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-[18%] rounded-full bg-[radial-gradient(circle,var(--glow-b),transparent_62%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
