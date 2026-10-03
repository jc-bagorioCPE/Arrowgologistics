import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const mark = 'inline-flex items-center gap-2 whitespace-nowrap text-white/75 transition-colors group-hover:text-white';
const geo = { fontFamily: 'Georgia, serif' };

function Logos({ dup }) {
  return (
    <ul
      aria-label={dup ? undefined : 'Arrowgo clients'}
      aria-hidden={dup ? 'true' : undefined}
      className={cn('m-0 flex list-none items-center gap-[60px] px-[30px] py-0', dup && 'mq-dup')}
    >
      <li className="group"><span className={cn(mark, 'flex-col items-start gap-0 leading-none')}><b className="text-[23px] font-semibold" style={geo}>Bell-Kenz</b><small className="mt-0.5 text-[10px] tracking-[.14em]">PHARMA INC.</small></span></li>
      <li className="group"><span className={cn(mark, 'border-[3px] border-current px-2.5 text-[26px] font-semibold tracking-[.14em]')}>TFS</span></li>
      <li className="group"><span className={cn(mark, 'text-2xl font-semibold')}><i className="h-4 w-4 rounded-full border-4 border-current" />pickup coffee</span></li>
      <li className="group"><span className={cn(mark, 'text-2xl font-semibold tracking-[.12em]')}><svg viewBox="0 0 16 24" aria-hidden="true" className="h-6 w-4 fill-current"><path d="M10 0L0 14h6l-2 10 12-16H9z" /></svg>ZEUS COFFEE</span></li>
      <li className="group"><span className={cn(mark, 'text-[28px] font-light')}>Lumi<b className="font-semibold">tek</b></span></li>
      <li className="group"><span className={cn(mark, 'border-b-2 border-current pb-0.5 text-[22px] italic')} style={geo}>Personal Collection</span></li>
    </ul>
  );
}

export default function Clients() {
  const box = useRef(null);
  const [off, setOff] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOff(!e.isIntersecting));
    io.observe(box.current);
    return () => io.disconnect();
  }, []);
  return (
    <section aria-label="Our clients" className="bg-gradient-to-r from-[#2350D0] to-[#1A3594] py-6">
      {/* Full-bleed: no container, no side margin, no edge fade */}
      <div ref={box} className={cn('mq relative overflow-hidden [-webkit-mask-image:none] [mask-image:none]', off && 'off')}>
        <div className="mq-track flex w-max animate-marquee">
          <Logos />
          <Logos dup />
        </div>
      </div>
    </section>
  );
}