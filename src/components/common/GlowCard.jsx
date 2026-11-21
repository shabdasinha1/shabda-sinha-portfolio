import { useTheme } from '../../hooks/useTheme';
import { BRAND_ACCENT } from '../../utils/brand';
import { cn } from '../../utils/cn';
import SpotlightCard from '../reactbits/SpotlightCard';

/**
 * React Bits SpotlightCard wired to the site's design tokens: a card whose
 * surface and border glow softly where the pointer (or keyboard focus) is.
 * Colours follow the active theme; the light is the brand accent.
 */
export function GlowCard({ className, children, ...props }) {
  const { theme } = useTheme();
  const light = theme === 'light';

  return (
    <SpotlightCard
      theme={theme}
      spotlightColor={BRAND_ACCENT[theme]}
      intensity={light ? 0.55 : 0.2}
      borderGlow={0.9}
      spotlightSize={280}
      className={cn('h-full border border-line', className)}
      style={{
        '--spotlight-card-surface': 'var(--surface)',
        '--spotlight-card-border': 'var(--border)',
        '--spotlight-card-shadow': 'var(--shadow-sm)',
      }}
      {...props}
    >
      {children}
    </SpotlightCard>
  );
}
