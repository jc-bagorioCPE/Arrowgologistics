import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-dark to-[#5B86F0] motion-reduce:hidden"
    />
  );
}
