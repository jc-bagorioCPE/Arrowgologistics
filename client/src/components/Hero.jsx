import Globe from './Globe';
import { Button } from '@/components/ui/button';

const QUICK = ['Warehousing', 'Cold chain', 'Freight', 'Trucking'];
const rise = (i) => ({ animationDelay: `${0.2 + i * 0.12}s` });

export default function Hero({ locations, onQuick }) {
  return (
    <section aria-label="Introduction" className="overflow-hidden bg-gradient-to-br from-mist via-white to-[#F3F8EE]">
      <div className="grid w-full items-center gap-8 px-4 py-10 sm:px-8 sm:py-14 lg:min-h-[min(760px,calc(100svh-72px))] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-4 lg:px-10 lg:pt-12 lg:pb-0 lg:-mb-[calc(min(16.8vw,184px)-5px)] 2xl:px-14">
        <div className="mx-auto w-full max-w-[680px] lg:mx-0 lg:-translate-y-[50%]">
          <h1 className="animate-up text-[clamp(42px,6.2vw,82px)] leading-[0.98]" style={rise(0)}>Your supply chain. Connected.</h1>
          <p className="my-5 mb-7 max-w-[38ch] animate-up text-[clamp(17px,1.6vw,20px)] text-mute" style={rise(1)}>
            One-stop logistics for warehousing, trucking, freight and customs, from Luzon to Mindanao.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 animate-up" style={rise(2)}>
            <Button asChild><a href="#solutions">Explore Solutions</a></Button>
            <a href="#locations" className="inline-flex min-h-12 items-center border-b border-navy text-navy transition-colors hover:text-brand">Explore Locations</a>
          </div>
          <div className="mt-[30px] animate-up" style={rise(3)}>
            <span className="mb-2 block text-sm text-mute">Looking for a specific service?</span>
            <div className="flex flex-wrap gap-2">
              {QUICK.map((s) => (
                <Button key={s} variant="pill" size="sm" onClick={() => onQuick(s)}>{s}</Button>
              ))}
            </div>
          </div>
        </div>
        <div className="min-w-0 lg:w-screen lg:max-w-none lg:-mr-[50vw] lg:-translate-x-[25vw] lg:-translate-y-[20%] xl:-translate-x-[276px]">
          <Globe locations={locations} />
        </div>
      </div>
    </section>
  );
}
