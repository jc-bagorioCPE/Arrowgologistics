import { Eye, Target, Award } from 'lucide-react';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { VISION, MISSION, IMPROVEMENT, CORE_VALUES, COMMITMENTS, SITE } from '@/data/site';

const CARDS = [
  { icon: Eye, title: 'Our vision', text: VISION },
  { icon: Target, title: 'Our mission', text: MISSION },
  { icon: Award, title: 'Continuous improvement', text: IMPROVEMENT },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About Arrowgo"
      crumbs={[['About']]}
      intro="Arrowgo Logistics Inc. provides third-party logistics for businesses of every size, from small local companies to large corporations."
    >
      <section className="py-16">
        <div className="wrap">
          <Reveal>
            <p className="max-w-[70ch] text-[18px] leading-relaxed text-mute">
              From transportation and warehousing to inventory management and distribution, our services are designed to streamline your supply chain and remove operational bottlenecks. By entrusting your logistics to us, your business can concentrate on growth, innovation and customer satisfaction. With over a decade of industry expertise, we deliver end-to-end solutions that combine efficiency, reliability and cost-effectiveness.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {CARDS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-white p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand"><Icon className="size-5" strokeWidth={1.75} /></span>
                  <h2 className="mt-5 text-xl font-semibold">{title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="h2">Core values</h2>
            <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
              {CORE_VALUES.map((v) => <li key={v} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-navy">{v}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h2">What we commit to</h2>
            <ul className="mt-6 grid list-none gap-3 p-0">
              {COMMITMENTS.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[16px] text-ink">
                  <span className="mt-2 size-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />{c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="h2">Head office</h2>
            <p className="lead">{SITE.hq}</p>
          </div>
          <Button size="lg" asChild><Link to="/contact">Talk to us</Link></Button>
        </div>
      </section>
    </PageShell>
  );
}
