import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { ARTICLES } from '@/data/site';

const fmt = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function ArticlePage({ news }) {
  const { id } = useParams();
  if (!news.data) return <PageShell title="News" crumbs={[['News', '/news']]}><p className="wrap py-16 text-mute">{news.error ? 'We could not load this story.' : 'Loading...'}</p></PageShell>;
  const n = news.data.find((x) => String(x.id) === id);
  if (!n) return <PageShell title="Story not found" crumbs={[['News', '/news'], ['Not found']]}><div className="wrap py-16"><Button asChild><Link to="/news">Back to news</Link></Button></div></PageShell>;
  const a = ARTICLES[n.id];
  return (
    <PageShell title={n.title} crumbs={[['News', '/news'], ['Story']]}>
      <article className="py-12">
        <div className="wrap max-w-[760px]">
          <time dateTime={n.date} className="text-sm text-mute">{fmt(n.date)}</time>
          <img src={n.image} alt={n.alt} className="mt-5 block aspect-[16/10] w-full rounded-2xl border border-line object-cover" />
          <div className="mt-8 grid gap-5 text-[17px] leading-relaxed text-ink">
            {a?.paragraphs.map((p) => <p key={p} className="m-0">{p}</p>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="outline" asChild><Link to="/news"><ArrowLeft className="mr-2 size-4" />All news</Link></Button>
            {a?.source && <Button variant="ghost" asChild><a href={a.source} target="_blank" rel="noreferrer">Read on our previous site<ExternalLink className="ml-2 size-4" /></a></Button>}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
