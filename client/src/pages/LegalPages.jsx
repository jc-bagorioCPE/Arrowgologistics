import PageShell from '@/components/PageShell';
import { PRIVACY, TERMS } from '@/data/site';

function Legal({ title, items }) {
  return (
    <PageShell title={title} crumbs={[[title]]}>
      <section className="py-12">
        <div className="wrap grid max-w-[760px] gap-8">
          {items.map(([h, p]) => (
            <div key={h}><h2 className="text-xl font-semibold">{h}</h2><p className="mt-2 text-[16px] leading-relaxed text-mute">{p}</p></div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
export const Privacy = () => <Legal title="Privacy policy" items={PRIVACY} />;
export const Terms = () => <Legal title="Terms of use" items={TERMS} />;
