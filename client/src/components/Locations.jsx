import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import paths from '@/data/phPaths.json';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Reveal from './Reveal';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const REGIONS = [['all', 'All'], ['Luzon', 'Luzon'], ['Visayas', 'Visayas and Palawan'], ['Mindanao', 'Mindanao']];

// Frame a region inside the 300x480 map viewBox.
function zoomFor(g, locs) {
  const P = locs.filter((l) => l.group === g);
  if (g === 'all' || !P.length) return { z: 1, tx: 0, ty: 0 };
  const xs = P.map((l) => l.x), ys = P.map((l) => l.y);
  let x0 = Math.min(...xs) - 36, x1 = Math.max(...xs) + 36, y0 = Math.min(...ys) - 36, y1 = Math.max(...ys) + 36, w = x1 - x0, h = y1 - y0;
  if (w / h > 0.625) h = w / 0.625; else w = h * 0.625;
  w = Math.min(300, Math.max(w, 94)); h = w / 0.625;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  x0 = Math.min(300 - w, Math.max(0, mx - w / 2)); y0 = Math.min(480 - h, Math.max(0, my - h / 2));
  return { z: 300 / w, tx: x0 / 3, ty: y0 / 4.8 };
}

export default function Locations({ locations, categories, filter, setFilter }) {
  const [sel, setSel] = useState(null);
  const [region, setRegion] = useState('all');
  const [say, setSay] = useState('');
  const track = useRef(null), map = useRef(null), programmatic = useRef(false), timer = useRef();

  const visible = useMemo(() => (locations || []).filter((l) => !filter || l.services.includes(filter)), [locations, filter]);
  const cur = visible.find((l) => l.id === sel) ?? visible[0];
  const idx = cur ? visible.indexOf(cur) : -1;
  const { z, tx, ty } = zoomFor(region, locations || []);

  const scrollCard = (id, instant) => {
    const t = track.current, c = t?.querySelector(`[data-id="${id}"]`);
    if (!c) return;
    programmatic.current = true;
    const position = window.matchMedia('(min-width: 1024px)').matches
      ? { top: c.offsetTop - t.offsetTop }
      : { left: c.offsetLeft - t.offsetLeft };
    t.scrollTo({ ...position, behavior: instant || reduce ? 'auto' : 'smooth' });
    setTimeout(() => (programmatic.current = false), 500);
  };
  const select = (l, scroll = false) => {
    if (scroll && region !== 'all' && l.group !== region) setRegion(l.group);
    setSel(l.id);
    if (scroll) { scrollCard(l.id); setSay(`${l.name}, ${l.region}. ${visible.indexOf(l) + 1} of ${visible.length}`); }
  };
  const step = (d, focus) => {
    const n = visible[(idx + d + visible.length) % visible.length];
    select(n, true);
    if (focus) map.current.querySelector(`[data-mk="${n.id}"]`)?.focus();
  };
  useEffect(() => { if (cur) scrollCard(cur.id, true); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scrolling the directory selects the location nearest its active edge.
  const onTrackScroll = () => {
    if (programmatic.current) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const t = track.current, cs = [...t.querySelectorAll('[data-id]')];
      if (!cs.length) return;
      const vertical = window.matchMedia('(min-width: 1024px)').matches;
      const at = (c) => Math.abs(vertical
        ? c.offsetTop - t.offsetTop - t.scrollTop
        : c.offsetLeft - t.offsetLeft - t.scrollLeft);
      setSel(+cs.reduce((a, c) => (at(c) < at(a) ? c : a)).dataset.id);
    }, 120);
  };

  return (
    <section id="locations" className="bg-gradient-to-b from-[#F3F7FC] via-[#F8FAFB] to-[#F1F7F4] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-[#DCE5EB] pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand">Arrowgo network</p>
              <h2 className="h2">Coverage across the Philippines</h2>
              <p className="lead mt-3">Explore our operating locations and the services available in each region.</p>
            </div>
            <div className="flex w-fit items-center gap-3 rounded-lg border border-[#DCE5EB] bg-white/75 px-4 py-3">
              <span className="text-2xl font-semibold leading-none text-navy">{locations?.length ?? 0}</span>
              <span className="text-sm leading-tight text-mute">coverage<br />locations</span>
            </div>
          </div>
        </Reveal>

        {locations && categories && (
          <>
            <Reveal delay={0.05}>
              <div className="mt-6 flex flex-col gap-3 border-b border-[#DCE5EB] pb-6 xl:flex-row xl:items-center xl:justify-between">
                <p className="m-0 text-sm font-medium text-navy">Filter by service</p>
                <div role="group" aria-label="Filter locations by service" className="flex flex-wrap gap-2">
                  {['All', ...categories].map((c) => (
                    <Button key={c} variant="pill" size="sm" aria-pressed={(filter || 'All') === c} onClick={() => setFilter(c === 'All' ? null : c)}>
                      {c}
                    </Button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid items-start gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
              {/* Map */}
              <Reveal delay={0.08} className="lg:sticky lg:top-24">
                <div className="rounded-xl border border-[#DCE5EB] bg-white/80 p-4 shadow-[0_12px_36px_-28px_rgba(15,31,92,.35)] sm:p-5">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-mute">Network map</p>
                      <h3 className="mt-1 text-lg font-semibold text-navy">Philippines coverage</h3>
                    </div>
                    <div role="group" aria-label="Zoom the map to a region" className="flex flex-wrap gap-1.5">
                      {REGIONS.map(([g, label]) => (
                        <Button key={g} variant="pill" size="sm" className="min-h-9 px-3 text-sm" aria-pressed={region === g} onClick={() => setRegion(g)}>{label}</Button>
                      ))}
                    </div>
                  </div>

                  <div
                    ref={map}
                    role="group"
                    aria-label="Map of the Philippines with Arrowgo locations"
                    className="relative mx-auto aspect-[300/480] max-h-[620px] w-full max-w-[420px] overflow-hidden rounded-lg border border-[#D5E1E8] bg-[#EAF2F4]"
                  >
                    <div className="absolute inset-0 origin-top-left transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: z === 1 ? 'none' : `scale(${z}) translate(${-tx}%,${-ty}%)` }}>
                      <svg viewBox="0 0 300 480" aria-hidden="true" className="ph-map absolute inset-0 h-full w-full">
                        {paths.map((d, k) => <path key={k} d={d} />)}
                      </svg>
                      {visible.map((l) => (
                        <button
                          key={l.id}
                          className="mk"
                          data-mk={l.id}
                          style={{ left: `${l.x / 3}%`, top: `${l.y / 4.8}%`, '--z': z }}
                          aria-label={`${l.name}, ${l.region}`}
                          aria-current={cur?.id === l.id ? 'true' : undefined}
                          onClick={() => select(l, true)}
                          onKeyDown={(e) => { const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (k) { e.preventDefault(); step(k, true); } }}
                        >
                          <span className={cn('mk-lb', l.x > 200 && 'left')}>{l.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Cards */}
              <Reveal delay={0.1} className="min-w-0">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-mute">Location directory</p>
                    <h3 className="mt-1 text-lg font-semibold text-navy">{filter || 'All'} locations</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="m-0 text-sm tabular-nums text-mute">
                      {visible.length ? `${idx + 1} / ${visible.length}` : '0 locations'}
                    </p>
                    <div className="hidden gap-2 sm:flex">
                      <Button variant="outline" size="icon" aria-label="Previous location" disabled={!visible.length} onClick={() => step(-1)}><ChevronLeft className="size-5" /></Button>
                      <Button variant="outline" size="icon" aria-label="Next location" disabled={!visible.length} onClick={() => step(1)}><ChevronRight className="size-5" /></Button>
                    </div>
                  </div>
                </div>

                <div ref={track} onScroll={onTrackScroll} tabIndex={0} aria-label="Location cards" className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:thin] lg:max-h-[min(620px,70vh)] lg:flex-col lg:snap-none lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto lg:pr-2 lg:pb-2">
                  {!visible.length && (
                    <div className="flex-[0_0_100%] rounded-xl border border-[#DCE5EB] bg-white p-10 text-center lg:flex-none">
                      <p className="text-lg text-navy">No locations offer {filter} yet.</p>
                      <Button className="mt-4" onClick={() => setFilter(null)}>Show all locations</Button>
                    </div>
                  )}
                  {visible.map((l) => {
                    const on = cur?.id === l.id;
                    return (
                      <button
                        type="button"
                        key={l.id}
                        data-id={l.id}
                        aria-pressed={on}
                        onClick={() => select(l)}
                        className={cn(
                          'group relative flex-[0_0_92%] snap-start rounded-lg border bg-white p-5 text-left transition-[border-color,opacity,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:flex-[0_0_70%] lg:w-full lg:flex-none',
                          on ? 'border-brand shadow-sm shadow-brand/10' : 'border-[#DCE5EB] hover:border-[#AABED0]'
                        )}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-mute">{l.region}</span>
                          <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', on ? 'bg-[#E6EDFC] text-brand-dark' : 'bg-[#F1F5F7] text-mute')}>
                            {on ? 'Selected' : l.type}
                          </span>
                        </span>
                        <span className="mt-2 block text-xl font-semibold text-navy">{l.name}</span>
                        <span className="mt-2 flex items-start gap-2 text-sm leading-5 text-mute">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                          <span>{l.address}</span>
                        </span>
                        <span className="mt-4 block border-t border-[#E7EDF1] pt-3 text-sm leading-5 text-mute">{l.services.join(', ')}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs leading-5 text-mute">Services and addresses are provisional until Arrowgo confirms its directory.</p>
                <div className="sr-only" aria-live="polite">{say}</div>
              </Reveal>
            </div>
          </>
        )}
      </div>
    </section>
  );
}