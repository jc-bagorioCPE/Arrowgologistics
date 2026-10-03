import { Link } from 'react-router-dom';
import { Warehouse, Snowflake, PackageCheck, Truck, Plane, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Reveal from './Reveal';
import Photo from './Photo';

// Set `image` to your photo path (e.g. '/images/facilities/warehouse.jpg').
// Leave null to show the gradient fallback.
const TILES = [
  { name: 'Warehouse', note: '500 to 20,000 sqm, covered space available', icon: Warehouse,
    bg: 'linear-gradient(160deg,#DCE6FB,#B3C8F3)', image: null, featured: true },
  { name: 'Cold room', note: 'Temperature-controlled storage', icon: Snowflake,
    bg: 'linear-gradient(160deg,#DCEBF7,#B4D3EC)', image: null },
  { name: 'Collection hub', note: 'Consolidation and pickup', icon: PackageCheck,
    bg: 'linear-gradient(160deg,#E3F4F2,#C3D3F5)', image: null },
  { name: 'Transport fleet', note: 'Road delivery', icon: Truck,
    bg: 'linear-gradient(160deg,#E6ECF4,#C4D2E4)', image: null },
  { name: 'Air and sea freight', note: 'International moves', icon: Plane,
    bg: 'linear-gradient(160deg,#DCE6FB,#B4D3EC)', image: null },
];

const STATS = [
  { value: '500 sqm', label: 'Smallest warehouse' },
  { value: '20,000 sqm', label: 'Largest warehouse' },
  { value: 'PHP 33', label: 'Per pallet, per day' },
];

export default function Facilities() {
  return (
    <section id="facilities" className="relative w-full overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-1/3 size-[380px] rounded-full bg-brand/10 blur-3xl" />

      {/* Full width with a small side margin */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <span className="size-1.5 rounded-full bg-brand" /> Facilities
              </span>
              <h2 className="h2 mt-4">Facilities built for the goods you move</h2>
            </div>
            <p className="lead">
              Warehouses from 500 to 20,000 sqm, including covered space.
            </p>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map(({ name, note, icon: Icon, bg, image, featured }, i) => (
            <Reveal
              key={name}
              delay={i * 0.08}
              className={cn(featured && 'sm:col-span-2 sm:row-span-2')}
            >
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 text-navy shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl motion-reduce:transition-none md:p-7">
                <Photo src={image} alt={name} gradient={bg} />

                {/* readability overlay, stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/20 to-transparent transition-opacity duration-500" />
                {/* shine sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full motion-reduce:hidden" />

                <div className="relative flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-white/80 shadow-sm backdrop-blur transition-all duration-300 group-hover:rotate-3 group-hover:bg-brand group-hover:text-white motion-reduce:transition-none">
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </span>
                  <span className="grid size-9 -translate-x-2 translate-y-2 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <div className="relative">
                  <p
                    className={cn(
                      'font-semibold transition-all duration-300 group-hover:text-brand',
                      featured ? 'text-3xl md:text-4xl' : 'text-lg'
                    )}
                  >
                    {name}
                  </p>
                  <p
                    className={cn(
                      'mt-1 text-mute transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none',
                      featured ? 'max-w-xs text-base' : 'text-[13px]'
                    )}
                  >
                    {note}
                  </p>
                  {/* underline grows on hover */}
                  <span className="mt-3 block h-0.5 w-full origin-left scale-x-0 rounded bg-brand transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rate bar */}
        <Reveal delay={0.2}>
          <div className="mt-4 flex flex-col gap-8 rounded-3xl bg-muted p-8 transition-shadow duration-500 hover:shadow-lg motion-reduce:transition-none md:flex-row md:items-center md:justify-between md:p-10">
            <dl className="grid flex-1 grid-cols-1 gap-6 text-center sm:grid-cols-3 md:text-left">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="group cursor-default rounded-2xl p-3 transition-colors duration-300 hover:bg-white/70 motion-reduce:transition-none"
                >
                  <dd className="text-3xl font-semibold text-navy transition-colors duration-300 group-hover:text-brand md:text-4xl">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-sm text-mute">{s.label}</dt>
                </div>
              ))}
            </dl>
            <Button size="lg" asChild className="group shrink-0 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none">
              <Link to="/contact?service=Warehousing">
                Request a quote
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}