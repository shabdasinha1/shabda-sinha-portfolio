/**
 * Runs `callback` once the page has settled: after the `load` event, a further
 * `delay` ms (so the hero entrance and the largest contentful paint finish first),
 * and then the next idle period. Heavy, purely decorative work (WebGL scenes,
 * shader compilation) goes through this so it never competes with first paint.
 * Returns a cancel function, suitable as a useEffect cleanup.
 */
export function whenSettled(callback, delay = 0) {
  let timer;
  let idle;
  let cancelled = false;

  const runWhenIdle = () => {
    if (cancelled) return;
    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(callback, { timeout: 1500 });
    else timer = window.setTimeout(callback, 50);
  };
  const afterLoad = () => {
    timer = window.setTimeout(runWhenIdle, delay);
  };

  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener('load', afterLoad);
    window.clearTimeout(timer);
    if (idle !== undefined) window.cancelIdleCallback?.(idle);
  };
}
