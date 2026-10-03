import PageShell from '@/components/PageShell';
import News from '@/components/News';

export default function NewsPage({ news }) {
  return (
    <PageShell title="News and insights" crumbs={[['News']]} intro="The latest updates and stories from Arrowgo.">
      {news.error && <p className="wrap py-10 text-mute">We could not load the news right now.</p>}
      <div className="-mt-10"><News news={news.data} showAll={false} /></div>
    </PageShell>
  );
}
