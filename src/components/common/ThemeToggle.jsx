import { AnimatePresence, m } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';
import { DURATION, EASE_OUT } from '../../utils/motion';

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className={cn(
        // touch-target: 36px visual, 44px hit area (see index.css)
        'touch-target relative inline-flex size-9 items-center justify-center rounded-full',
        'border border-line text-muted transition-colors',
        'hover:border-line-strong hover:bg-surface-muted hover:text-fg',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ y: 8, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -8, opacity: 0, scale: 0.85 }}
          transition={{ duration: DURATION.fast, ease: EASE_OUT }}
          className="flex"
        >
          <Icon className="size-[17px]" strokeWidth={1.75} aria-hidden="true" />
        </m.span>
      </AnimatePresence>
    </button>
  );
}
