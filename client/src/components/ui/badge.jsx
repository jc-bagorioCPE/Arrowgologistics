import { cn } from '@/lib/utils';

export function Badge({ className, ...props }) {
  return (
    <span className={cn('inline-flex items-center rounded-full bg-mist px-2.5 py-[3px] text-[13px] text-brand-dark', className)} {...props} />
  );
}
