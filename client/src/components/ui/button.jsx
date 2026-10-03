import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-[#122772]',
        secondary: 'bg-white text-brand-dark hover:bg-mist',
        outline: 'border border-input bg-white text-navy hover:bg-muted',
        ghost: 'text-mute hover:text-navy',
        // Rounded filter chips used across the page; aria-pressed drives the selected look
        pill: 'rounded-full border border-line bg-white font-normal text-navy hover:border-brand-dark hover:text-brand-dark aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white',
      },
      size: {
        default: 'min-h-12 px-6 text-base',
        sm: 'min-h-11 px-4 text-[15px]',
        icon: 'h-11 w-11 rounded-full',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
