import * as React from 'react';
import { cn } from '@/lib/utils';

const make = (name, base) => {
  const C = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn(base, className)} {...props} />);
  C.displayName = name;
  return C;
};
export const Card = make('Card', 'overflow-hidden rounded-[14px] border border-line bg-card text-foreground');
export const CardHeader = make('CardHeader', 'flex flex-col gap-1 p-6 pb-2');
export const CardTitle = make('CardTitle', 'text-2xl font-normal leading-tight text-navy');
export const CardContent = make('CardContent', 'p-6');
