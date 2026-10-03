import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const CONTAINER = 'relative w-full px-4 sm:px-6 lg:px-8';

const fmt = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function News({ news, limit, showAll = true }) {
  const items = limit ? news?.slice(0, limit) : news;
  return (
    <section id="news" className="py-20 md:py-28">
      <div className={CONTAINER}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h2">News and insights</h2>
          <p className="lead mt-3">The latest updates and stories from Arrowgo.</p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl divide-y divide-line">
          {items?.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.09}>
              <article className="group relative grid items-center gap-6 py-10 md:grid-cols-2 md:gap-12">
                <div>
                  {/* Optional fields: only shown if your data has them */}
                  {n.tags?.length > 0 && (
                    <ul className="m-0 mb-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-[11px] font-medium uppercase tracking-[.14em] text-brand-dark">
                      {n.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  )}

                  <h3 className="text-2xl font-semibold leading-snug text-navy md:text-[28px]">
                    <Link to={`/news/${n.id}`} className="after:absolute after:inset-0 after:content-['']">{n.title}</Link>
                  </h3>

                  {n.excerpt && <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-mute">{n.excerpt}</p>}

                  <div className="mt-5 flex items-center gap-3 text-sm text-mute">
                    {n.author && <><span>{n.author}</span><span aria-hidden="true">•</span></>}
                    <time dateTime={n.date}>{fmt(n.date)}</time>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                    Read more
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-line bg-soft">
                  <img
                    src={n.image}
                    alt={n.alt}
                    loading="lazy"
                    className="block aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {showAll && (
          <div className="mt-6 text-center">
            <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-brand">View all news <ArrowRight className="size-4" /></Link>
          </div>
        )}
      </div>
    </section>
  );
}