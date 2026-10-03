import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Fades content in once, the first time it scrolls into view. */
export default function Reveal({ children, delay = 0, className, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px',
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} style={{ '--d': `${delay}s` }} className={cn('rv', seen && 'in', className)}>
      {children}
    </Tag>
  );
}
