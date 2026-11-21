import ScrollVelocity from '../../reactbits/ScrollVelocity';

// Technologies from the resume (the Skills section lists them in full).
const ROWS = [
  'React.js · Node.js · Express.js · MongoDB · Redux Toolkit · MySQL ·',
  'REST APIs · JWT / RBAC · AWS S3 · Razorpay · Firebase · Chart.js ·',
];

/**
 * React Bits ScrollVelocity band: two rows of technologies that slide in
 * opposite directions while the page scrolls, and rest when it stops.
 * Decorative only, so it is hidden from assistive technology.
 */
export function TechMarquee() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-line bg-bg-elevated py-8 select-none sm:py-12">
      <ScrollVelocity
        texts={ROWS}
        velocity={40}
        numCopies={4}
        fadeEdges
        outlineAlternate
        skewWithVelocity={6}
        className="px-3"
        scrollerClassName="!text-3xl !leading-[1.15] !font-semibold !tracking-[-0.03em] text-fg/80 !drop-shadow-none sm:!text-5xl sm:!leading-[1.1] lg:!text-6xl"
        parallaxClassName="py-1"
      />
    </div>
  );
}
