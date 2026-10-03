import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Wallet, TrendingUp, Palette, MapPin, Users, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const VALUES = ['Integrity', 'Efficiency', 'Quality service'];

const PROOF = [
  { icon: ShieldCheck, title: 'Liability from handover',
    text: 'Arrowgo assumes liability for your cargo as soon as it is turned over to us.' },
  { icon: Wallet, title: 'No upfront capital',
    text: 'We provide the equipment and resources to move and store your cargo, which lowers your operating cost.' },
  { icon: TrendingUp, title: 'Scales with you',
    text: 'Increase or trim capacity day by day without worrying about logistics.' },
  { icon: Palette, title: 'Made for your business',
    text: 'Services can be tailored, including your company logo on them.' },
];

// Paste your photo paths here (e.g. '/images/about/warehouse.jpg').
// Leave as null to show the gradient fallback.
const IMAGES = {
  feature: null,   // large hero photo (trucks / operations)
  taguig: null,    // office or location photo
  team: null,      // team photo
  gallery: [
    { src: null, label: 'Warehousing' },
    { src: null, label: 'Fleet & delivery' },
    { src: null, label: 'Cargo handling' },
  ],
};

/* Image with zoom-on-hover and gradient fallback */
function Photo({ src, alt, className = '', tone = 'from-[#DCE6FB] to-[#B3C8F3]' }) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${tone} ${className}`}>
      {showImg && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
        />
      )}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-soft py-20 md:py-28">
      {/* soft background glow */}
      <div className="pointer-events-none absolute -top-32 right-0 size-[420px] rounded-full bg-brand/10 blur-3xl" />

      {/* Full width with a small side margin */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-2 md:items-end md:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <span className="size-1.5 rounded-full bg-brand" /> Who we are
              </span>
              <h2 className="h2 mt-4">About Arrowgo</h2>
            </div>
            <p className="lead">
              Arrowgo Logistics Inc. is a Philippine logistics provider based in Taguig, serving
              everyone from small local businesses to large corporations.
            </p>
            <Link
              to="/about"
              className="group relative mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand focus-visible:text-brand md:col-start-2"
            >
              <span className="relative">
                Our vision, mission and values
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" />
              </span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none" />
            </Link>
          </div>
        </Reveal>

        {/* Bento */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          {/* Feature card */}
          <Reveal>
            <div className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl p-8 text-navy shadow-sm transition-shadow duration-500 hover:shadow-2xl motion-reduce:transition-none md:min-h-[440px] md:p-10">
              <Photo src={IMAGES.feature} alt="Arrowgo operations" />
              {/* readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
              {/* shine sweep on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full motion-reduce:hidden" />

              <div className="relative">
                <p className="text-sm font-medium uppercase tracking-wider text-mute">Our aim</p>
                <p className="mt-2 max-w-lg text-3xl font-semibold leading-tight md:text-5xl">
                  To be the leading nationwide logistics provider.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {VALUES.map((v) => (
                    <li
                      key={v}
                      className="cursor-default rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white motion-reduce:transition-none"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Side cards with photos */}
          <div className="flex flex-col gap-4 md:flex-row lg:flex-col">
            <Reveal delay={0.09} className="md:flex-1">
              <div className="group relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-none">
                <Photo src={IMAGES.taguig} alt="Arrowgo in Taguig" tone="from-[#EEF3FF] to-[#D5E1FA]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/0" />
                <div className="relative">
                  <span className="grid size-10 place-items-center rounded-xl bg-white text-brand shadow-sm transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <MapPin className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-lg font-semibold text-navy transition-colors group-hover:text-brand">Based in Taguig</p>
                  <p className="mt-1 text-mute">Serving small local businesses and large corporations alike.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="md:flex-1">
              <div className="group relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-none">
                <Photo src={IMAGES.team} alt="The Arrowgo team" tone="from-[#E6EEFF] to-[#C4D6F7]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/0" />
                <div className="relative">
                  <span className="grid size-10 place-items-center rounded-xl bg-white text-brand shadow-sm transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Users className="size-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-lg font-semibold text-navy transition-colors group-hover:text-brand">Invested in our people</p>
                  <p className="mt-1 text-mute">We keep improving by investing in the team behind every delivery.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Photo gallery strip */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {IMAGES.gallery.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.08}>
              <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl shadow-sm transition-shadow duration-500 hover:shadow-xl motion-reduce:transition-none">
                <Photo src={g.src} alt={g.label} tone="from-[#C9D8F8] to-[#9DB6EC]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white">
                  <p className="text-lg font-semibold transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none">
                    {g.label}
                  </p>
                  <span className="grid size-9 translate-y-2 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Proof points */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-xl motion-reduce:transition-none">
                {/* bottom accent line grows on hover */}
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" />
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:rotate-3 group-hover:bg-brand group-hover:text-white motion-reduce:transition-none">
                  <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy transition-colors duration-300 group-hover:text-brand">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}