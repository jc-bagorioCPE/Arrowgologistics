import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import PageShell from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { fieldClass } from '@/components/ui/input';
import { api } from '@/lib/api';
import { SITE } from '@/data/site';

const OFFICES = [
  ['Head office, Taguig', SITE.hq],
  ['Cebu', 'Brgy. Canduman, Mandaue City'],
  ['Mindanao regional office', 'Brgy. Angliongto Sr., Buhangin District, Davao City'],
];

export default function ContactPage({ categories }) {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', company: '', service: params.get('service') || '', message: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | failed
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState('sending'); setErrors({});
    try {
      await api('/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setState('done');
    } catch (err) {
      setErrors(err.body?.errors || {});
      setState('failed');
    }
  };

  const Err = ({ k }) => errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p> : null;
  const aria = (k) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined });

  return (
    <PageShell title="Contact us" crumbs={[['Contact']]} intro="Tell us what you need to move or store and we will get back to you.">
      <section className="py-16">
        <div className="wrap grid gap-12 md:grid-cols-[1.2fr_1fr]">
          {state === 'done' ? (
            <div role="status" className="rounded-2xl border border-line bg-soft p-8">
              <CheckCircle2 className="size-8 text-brand" />
              <h2 className="mt-4 text-2xl font-semibold">Thank you, we got your message.</h2>
              <p className="mt-2 text-mute">Our team will reply to {form.email} soon.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5">
              <div><Label htmlFor="name">Name</Label><Input id="name" className="mt-1.5" value={form.name} onChange={set('name')} autoComplete="name" {...aria('name')} /><Err k="name" /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" className="mt-1.5" value={form.email} onChange={set('email')} autoComplete="email" {...aria('email')} /><Err k="email" /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><Label htmlFor="company">Company (optional)</Label><Input id="company" className="mt-1.5" value={form.company} onChange={set('company')} autoComplete="organization" /></div>
                <div>
                  <Label htmlFor="service">Service (optional)</Label>
                  <select id="service" value={form.service} onChange={set('service')} className={`${fieldClass} mt-1.5 h-12`}>
                    <option value="">Not sure yet</option>
                    {(categories || []).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" className="mt-1.5" value={form.message} onChange={set('message')} {...aria('message')} /><Err k="message" /></div>
              {state === 'failed' && !Object.keys(errors).length && <p role="alert" className="m-0 text-sm text-destructive">Something went wrong sending your message. Please try again.</p>}
              <div><Button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : 'Send message'}</Button></div>
            </form>
          )}

          <aside className="grid content-start gap-6">
            <ul className="m-0 grid list-none gap-4 p-0 text-[16px]">
              <li className="flex gap-3"><Phone className="mt-1 size-5 flex-none text-brand" /><a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="hover:text-brand">{SITE.phone}</a></li>
              {SITE.email && <li className="flex gap-3"><Mail className="mt-1 size-5 flex-none text-brand" /><a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a></li>}
            </ul>
            {OFFICES.map(([name, addr]) => (
              <div key={name} className="flex gap-3">
                <MapPin className="mt-1 size-5 flex-none text-brand" />
                <div><p className="m-0 font-medium text-navy">{name}</p><address className="mt-0.5 not-italic text-mute">{addr}</address></div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
