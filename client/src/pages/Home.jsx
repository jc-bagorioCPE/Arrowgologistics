import { useState } from 'react';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import Solutions from '@/components/Solutions';
import Locations from '@/components/Locations';
import Facilities from '@/components/Facilities';
import About from '@/components/About';
import News from '@/components/News';

export default function Home({ services, locations, categories, news }) {
  const [filter, setFilter] = useState(null);
  const failed = [services, locations, categories, news].some((x) => x.error);

  // Used by the hero quick links and the "See where" button
  const showLocations = (category) => {
    setFilter(category);
    requestAnimationFrame(() => document.getElementById('locations')?.scrollIntoView());
  };

  return (
    <>
      <Hero locations={locations.data || []} onQuick={showLocations} />
      <Clients />
      {failed && (
        <div role="alert" className="wrap mt-10">
          <div className="rounded-xl border border-destructive/40 bg-white p-5 text-[15px]">
            <b className="text-navy">We could not load the latest content.</b>
            <p className="m-0 mt-1 text-mute">Start MySQL in the XAMPP Control Panel, import <code>server/db/arrowgo.sql</code>, then run <code>npm run dev</code> and reload this page.</p>
          </div>
        </div>
      )}
      <Solutions services={services.data} locations={locations.data || []} onSeeWhere={showLocations} />
      <Locations locations={locations.data} categories={categories.data} filter={filter} setFilter={setFilter} />
      <Facilities />
      <About />
      <News news={news.data} limit={3} />
    </>
  );
}
