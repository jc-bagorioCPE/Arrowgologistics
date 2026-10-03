import * as React from 'react';
import { cn } from '@/lib/utils';

export const fieldClass =
  'w-full rounded-md border border-input bg-white px-3.5 text-base text-foreground placeholder:text-mute/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring aria-[invalid=true]:border-destructive';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input ref={ref} type={type} className={cn(fieldClass, 'h-12', className)} {...props} />
));
Input.displayName = 'Input';
export { Input };
