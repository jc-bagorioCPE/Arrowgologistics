import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { Button } from '@/components/ui/button';
import { scenes } from '@/data/scenes';

const Icon = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.7]" dangerouslySetInnerHTML={{ __html: d }} />;

function Loading({ state }) {
  return (
    <div className="wrap py-20 text-mute">
      {state.error ? 'We could not load services right now. Please try again shortly.' : 'Loading services...'}
    </div>
  );
}

function Detail({ services, id }) {
  const k = services.findIndex((s) => String(s.id) === id);
  const s = services[k];
  if (!s) return <PageShell title="Service not found" crumbs={[['Services', '/services'], ['Not found']]}><div className="wrap py-16"><Button asChild><Link to="/services">See all services</Link></Button></div></PageShell>;
  return (
    <PageShell title={s.title} intro={s.description} crumbs={[['Services', '/services'], [s.title]]}>
      <section className="py-16">
        <div className="wrap grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold">What is included</h2>
            <ul className="mt-6 grid list-none gap-3 p-0">
              {s.inclusions.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[16px]">
                  <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-brand/10 text-brand"><Check className="size-3.5" /></span>{x}
                </li>
              ))}
            </ul>
            {s.facts.length > 0 && (
              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.facts.map((f) => (
                  <div key={f.label} className="rounded-xl border border-line bg-soft px-4 py-3">
                    <dd className="text-lg font-semibold text-navy">{f.value}</dd>
                    <dt className="text-sm text-mute">{f.label}</dt>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link to={`/contact?service=${encodeURIComponent(s.categories[0] || '')}`}>Request a quote</Link></Button>
              <Button variant="outline" asChild><Link to="/#locations">See where we offer this</Link></Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-mist">
              <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: scenes[k % scenes.length] }} />
              <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-xl bg-white/85 text-navy backdrop-blur"><Icon d={s.icon} /></span>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

export default function ServicesPage({ services }) {
  const { id } = useParams();
  if (!services.data) return <PageShell title="Services" crumbs={[['Services']]}><Loading state={services} /></PageShell>;
  if (id) return <Detail services={services.data} id={id} />;
  return (
    <PageShell title="Our services" crumbs={[['Services']]} intro="One-stop logistics solutions for domestic and international needs: storage, transport, freight, customs and cold chain.">
      <section className="py-16">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.data.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <Link to={`/services/${s.id}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand"><Icon d={s.icon} /></span>
                <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-mute">{s.description}</p>
                <span className="mt-5 text-sm font-semibold text-navy group-hover:text-brand">Learn more &rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
