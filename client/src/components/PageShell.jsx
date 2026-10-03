import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-mute">
      <Link to="/" className="hover:text-navy">Home</Link>
      {items.map(([label, to]) => (
        <span key={label} className="inline-flex items-center gap-1">
          <ChevronRight className="size-3.5" aria-hidden="true" />
          {to ? <Link to={to} className="hover:text-navy">{label}</Link> : <span aria-current="page" className="text-navy">{label}</span>}
        </span>
      ))}
    </nav>
  );
}

export default function PageShell({ title, intro, crumbs = [], children, title: t }) {
  useEffect(() => { document.title = `${t} | Arrowgo Logistics Inc.`; }, [t]);
  return (
    <>
      <section className="bg-gradient-to-b from-mist to-white">
        <div className="wrap pb-12 pt-10 md:pb-16">
          <Crumbs items={crumbs} />
          <h1 className="text-[clamp(34px,5vw,56px)]">{title}</h1>
          {intro && <p className="lead">{intro}</p>}
        </div>
      </section>
      {children}
    </>
  );
}
