import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { scenes } from '@/data/scenes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Reveal from './Reveal';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const INTERVAL = 4000; // longer than before: the centre card now has details to read
const pad = (n) => String(n + 1).padStart(3, '0');

const Icon = ({ d, className }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.7]', className)} dangerouslySetInnerHTML={{ __html: d }} />
);
const Check = () => (
  <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-white/15 text-white">
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true"><path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);
const Arrow = ({ left }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-4 w-4 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]', left && 'rotate-180')}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function pose(d) {
  const a = Math.abs(d);
  if (a >= 3) return { transform: 'translateX(-50%) translateZ(-420px) scale(.6)', opacity: 0, filter: 'brightness(.4)', zIndex: 0, pointerEvents: 'none' };
  return {
    transform: `translateX(calc(-50% + ${d * 62}%)) translateZ(${-a * 140}px) rotateY(${Math.max(-48, Math.min(48, -d * 40))}deg) scale(${1 - a * 0.06})`,
    opacity: a === 0 ? 1 : a === 1 ? 0.9 : 0.55,
    filter: `brightness(${1 - a * 0.25})`,
    zIndex: 10 - a,
  };
}

export default function Solutions({ services, locations, onSeeWhere }) {
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const box = useRef(null);
  const drag = useRef({ x: 0, down: false, moved: false });
  const n = services?.length || 0;

  const running = n > 0 && !reduce && !hover && !focus && inView;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [services]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((k) => (k + 1) % n), INTERVAL);
    return () => clearTimeout(t);
  }, [i, n, running]);

  const go = (k) => { setTouched(true); setI(((k % n) + n) % n); };

  const onKeyDown = (e) => {
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    go(next);
  };

  const down = (e) => { drag.current = { x: e.clientX, down: true, moved: false }; };
  const move = (e) => {
    const s = drag.current;
    if (s.down && !s.moved && Math.abs(e.clientX - s.x) > 10) { s.moved = true; e.currentTarget.setPointerCapture?.(e.pointerId); }
  };
  const up = (e) => {
    const s = drag.current;
    if (!s.down) return;
    s.down = false;
    const dx = e.clientX - s.x;
    if (s.moved && Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  };

  const active = services?.[i];
  const coverage = (s) => {
    const total = locations?.length || 0;
    const covered = total ? locations.filter((l) => s.categories.some((c) => l.services.includes(c))).length : 0;
    return { covered, total, pct: total ? Math.round((covered / total) * 100) : 0 };
  };

  return (
    <section id="solutions" className="py-20">
      <style>{'@keyframes svcfill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'}</style>
      <div className="wrap">
        <Reveal>
          <h2 className="h2">What you need, and how we cover it</h2>
          <p className="lead">Choose what you need to see how Arrowgo handles it, what is included and where it is available.</p>
        </Reveal>
      </div>

      {services && (
        <div
          ref={box}
          className="mt-9"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); }}
        >
          <div className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#1A3594_0%,#0F1F5C_55%,#050D1C_100%)] pb-8 pt-8">
            <div
              role="group"
              aria-roledescription="carousel"
              aria-label="Arrowgo services"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
              className="relative mx-auto h-[660px] max-w-[1100px] touch-pan-y select-none outline-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-white/70 sm:h-[690px]"
            >
              {services.map((s, k) => {
                let d = k - i;
                if (d > n / 2) d -= n;
                if (d < -n / 2) d += n;
                const on = d === 0;
                const { covered, total, pct } = coverage(s);
                return (
                  <div
                    key={s.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${k + 1} of ${n}: ${s.title}`}
                    aria-hidden={on ? undefined : true}
                    onClick={() => { if (!on && !drag.current.moved) go(k); }}
                    style={pose(d)}
                    className={cn(
                      'absolute left-1/2 top-4 h-[610px] w-[300px] overflow-hidden rounded-[26px] border border-white/15 bg-navy shadow-[0_30px_60px_-20px_rgba(0,0,0,.65)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [backface-visibility:hidden] motion-reduce:transition-none sm:h-[640px] sm:w-[350px]',
                      on ? 'cursor-default' : 'cursor-pointer'
                    )}
                  >
                    <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: scenes[k % scenes.length] }} />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#0F1F5C_0%,rgba(15,31,92,.96)_55%,rgba(15,31,92,.45)_82%,transparent_100%)]" />

                    <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                      <span className="rounded-full bg-navy/70 px-3 py-1 font-mono text-xs tracking-wider text-white backdrop-blur">( {pad(k)} )</span>
                      <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-navy backdrop-blur">#{s.categories[0]}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-6 text-white">
                      <Icon d={s.icon} className="mb-3 h-8 w-8 text-white/90" />
                      <h3 className="text-[22px] font-semibold uppercase leading-tight tracking-wide text-white">{s.title}</h3>
                      <p className="mt-1.5 text-[12px] font-medium uppercase tracking-[.16em] text-white/70">&ndash; {s.name}</p>

                      {on && (
                        <div className="animate-swap">
                          <p className="mt-3 line-clamp-2 text-[13px] italic leading-snug text-white/80">{s.description}</p>

                          <div className="my-4 h-px bg-white/15" />

                          <p className="text-[11px] font-medium uppercase tracking-[.16em] text-white/60">What is included</p>
                          <ul className="mt-3 grid list-none gap-2.5 p-0">
                            {s.inclusions.slice(0, 4).map((x) => (
                              <li key={x} className="flex items-start gap-2.5 text-[13px] leading-snug text-white/90">
                                <Check />{x}
                              </li>
                            ))}
                          </ul>

                          {s.facts.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              {s.facts.slice(0, 2).map((f) => (
                                <div key={f.label} className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
                                  <b className="block text-[15px] font-semibold leading-tight text-white">{f.value}</b>
                                  <span className="text-[11px] leading-tight text-white/65">{f.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-4">
                            <span className="mb-1.5 block text-[12px] text-white/70">Available in {covered} of {total} areas</span>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                              <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
                            </div>
                          </div>

                          <Button
                            onClick={() => onSeeWhere(s.categories[0])}
                            className="mt-5 h-10 w-full rounded-full bg-white px-5 text-xs font-semibold uppercase tracking-[.14em] text-navy hover:bg-mist"
                          >
                            See where <Arrow />
                          </Button>
                          <Link to={`/services/${s.id}`} className="mt-3 block text-center text-xs font-medium uppercase tracking-[.14em] text-white/80 underline-offset-4 hover:text-white hover:underline">Service details</Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-1 flex items-center justify-center gap-4">
              <button type="button" aria-label="Previous service" onClick={() => go(i - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Arrow left /></button>
              <div className="flex items-center gap-2">
                {services.map((s, k) => (
                  <button key={s.id} type="button" aria-label={`Show ${s.title}`} aria-current={k === i ? 'true' : undefined} onClick={() => go(k)}
                    className={cn('relative h-2.5 overflow-hidden rounded-full bg-white/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white', k === i ? 'w-9' : 'w-2.5 hover:bg-white/45')}>
                    {k === i && running && <span key={i} className="absolute inset-0 origin-left bg-white" style={{ animation: `svcfill ${INTERVAL}ms linear forwards` }} />}
                    {k === i && !running && <span className="absolute inset-0 bg-white" />}
                  </button>
                ))}
              </div>
              <button type="button" aria-label="Next service" onClick={() => go(i + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Arrow /></button>
            </div>
          </div>

          <div className="sr-only" aria-live="polite">{touched ? `${active.title}. ${i + 1} of ${n}` : ''}</div>
        </div>
      )}
    </section>
  );
}