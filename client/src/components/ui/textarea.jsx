import * as React from 'react';
import { cn } from '@/lib/utils';
import { fieldClass } from './input';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldClass, 'min-h-[120px] py-3', className)} {...props} />
));
Textarea.displayName = 'Textarea';
export { Textarea };
