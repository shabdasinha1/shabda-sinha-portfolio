import { useSyncExternalStore } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

const subscribe = (onChange) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

/**
 * True on devices with a precise, hover-capable pointer (mouse / trackpad).
 * Pointer-following effects are only enabled when this is true, so they never
 * run on touch screens.
 */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
