import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { useMotionEnabled } from '../../hooks/useMotionEnabled';
import { cn } from '../../utils/cn';

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{children}</m.span>{' '}
    </>
  );
}

/**
 * Apple-style scroll reveal: a large paragraph whose words light up one after
 * another as it moves up the screen. The text is ordinary text in the DOM, so
 * screen readers and copy/paste see the whole sentence. With reduced motion it
 * renders fully visible.
 */
export function WordReveal({ text, className }) {
  const ref = useRef(null);
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] });

  if (!enabled) {
    return (
      <p ref={ref} className={cn('relative', className)}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');
  return (
    <p ref={ref} className={cn('relative', className)}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}
