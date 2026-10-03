import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// [label, route, home-section id used for scroll-highlighting]
const LINKS = [['Solutions', '/services', 'solutions'], ['Locations', '/#locations', 'locations'], ['Facilities', '/#facilities', 'facilities'], ['About', '/about', 'about'], ['News', '/news', 'news']];
const SECTION_IDS = LINKS.map(([, , id]) => id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { pathname } = useLocation();
  const home = pathname === '/';

  useEffect(() => {
    if (!home) return setActive('');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTION_IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [home]);

  const link = 'block border-b-2 border-transparent px-1 py-3.5 text-[15px] text-mute hover:text-navy aria-[current=true]:border-brand aria-[current=true]:text-navy md:px-3 md:py-2.5';

  return (
    <header className="sticky top-0 z-20 animate-drop border-b border-line bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="Arrowgo Logistics Inc. home">
          <img src="/logo.png" alt="" width="191" height="44" className="block h-11 w-auto" />
        </Link>
        <Button variant="outline" size="sm" className="md:hidden" aria-expanded={open} aria-controls="mainnav" onClick={() => setOpen((o) => !o)}>
          Menu
        </Button>
        <nav
          id="mainnav"
          aria-label="Main"
          className={cn(
            'absolute inset-x-0 top-16 flex-col border-b border-line bg-white px-5 pb-4 pt-2 md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0',
            open ? 'flex' : 'hidden'
          )}
        >
          {LINKS.map(([label, to, id]) => {
            const current = to.includes('#') ? home && active === id : pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link key={id} to={to} className={link} aria-current={current ? 'true' : undefined} onClick={() => setOpen(false)}>
                {label}
              </Link>
            );
          })}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-navy px-3 py-2.5 text-center text-[15px] text-white md:ml-2 md:mt-0">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
