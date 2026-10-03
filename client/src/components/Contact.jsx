import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';

const CONTAINER = 'relative w-full px-4 sm:px-6 lg:px-8';

const EXPLORE = [['Solutions', '/services'], ['Locations', '/#locations'], ['Facilities', '/#facilities'], ['About', '/about'], ['News', '/news'], ['Contact', '/contact']];
const OFFICES = [
  ['Cebu', 'Brgy. Canduman, Mandaue City'],
  ['Mindanao', 'Brgy. Angliongto Sr., Buhangin District, Davao City'],
];
const LEGAL = [['Privacy policy', '/privacy'], ['Terms of use', '/terms']];

// Add real links when you have them, e.g. { icon: Linkedin, label: 'LinkedIn', href: 'https://...' }
// import the icon from 'lucide-react' too. Nothing renders while this is empty.
const SOCIALS = [];

// Halftone wordmark colour (Arrowgo brand blue). Swap for any hex.
const DOT = '#1A3594';

const FootLink = ({ href, children }) => (
  <Link to={href} className="group inline-flex items-center gap-1 py-2 text-[15px] text-mute transition-colors hover:text-navy">
    {children}
    <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
  </Link>
);

const ColTitle = ({ children }) => <h3 className="mb-3 text-base font-semibold text-navy">{children}</h3>;

// Component name and file stay the same so your imports keep working.
// `categories` is no longer used, so you can stop passing it from the parent.
export default function Contact() {
  return (
    <footer className="bg-white">
      <div className={CONTAINER}>
        <div className="border-t border-line" />

        <div className="grid gap-10 px-0 pb-16 pt-14 sm:grid-cols-2 sm:px-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr] lg:gap-12">
          <div>
            <Link to="/" aria-label="Arrowgo Logistics Inc. home">
              <img src="/logo.png" alt="Arrowgo Logistics Inc." width="191" height="44" className="block h-11 w-auto" />
            </Link>
            <p className="mt-3 text-xl font-semibold italic text-[#3E9A24]">moving excellence!</p>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-mute">
              Head office: {SITE.hq}.
            </p>
            <p className="mt-2 text-[15px] text-mute">
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="hover:text-navy">{SITE.phone}</a>
              {SITE.email && <> &middot; <a href={`mailto:${SITE.email}`} className="hover:text-navy">{SITE.email}</a></>}
            </p>
          </div>

          <nav aria-label="Explore">
            <ColTitle>Explore</ColTitle>
            <ul className="m-0 grid list-none p-0">{EXPLORE.map(([t, h]) => <li key={t}><FootLink href={h}>{t}</FootLink></li>)}</ul>
          </nav>

          <div>
            <ColTitle>Offices</ColTitle>
            <ul className="m-0 grid list-none gap-4 p-0">
              {OFFICES.map(([name, addr]) => (
                <li key={name} className="text-[15px]">
                  <p className="font-medium text-navy">{name}</p>
                  <address className="mt-0.5 max-w-[30ch] not-italic text-mute">{addr}</address>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Legal">
            <ColTitle>Legal</ColTitle>
            <ul className="m-0 grid list-none p-0">{LEGAL.map(([t, h]) => <li key={t}><FootLink href={h}>{t}</FootLink></li>)}</ul>
          </nav>
        </div>

        {/* ---- Halftone wordmark ---- */}
        <div aria-hidden="true" className="relative h-[clamp(140px,17vw,260px)] select-none overflow-hidden">
          <div
            className="absolute inset-0 [background-size:6px_6px] [mask-image:linear-gradient(to_top,#000_35%,transparent_100%)]"
            style={{ backgroundImage: `radial-gradient(circle, ${DOT} 1.3px, transparent 1.7px)` }}
          />
          <span className="absolute bottom-0 left-[2%] translate-y-[16%] text-[clamp(110px,22vw,320px)] font-extrabold leading-[.8] tracking-tight text-white">
            Arrowgo
          </span>
        </div>
        <div className="border-t border-line" />

        {/* ---- Bottom bar ---- */}
        <div className="flex flex-col items-start justify-between gap-4 px-0 py-6 text-[14px] text-mute sm:flex-row sm:items-center sm:px-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="m-0">© {new Date().getFullYear()} Arrowgo Logistics Inc.</p>
            {LEGAL.map(([t, h]) => <Link key={t} to={h} className="transition hover:text-navy">{t.split(' ')[0]}</Link>)}
          </div>
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-mute transition hover:text-navy">
                <Icon className="size-5" />
              </a>
            ))}
            {SOCIALS.length > 0 && <span aria-hidden="true" className="h-5 w-px bg-line" />}
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 font-medium transition hover:text-navy">
              Back to top <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}