import { UpdateIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center uppercase justify-center whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/80',
				danger: 'bg-danger text-danger-foreground shadow-sm hover:bg-danger/80',
				success: 'bg-success text-success-foreground shadow-sm hover:bg-success/80',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent-foreground dark:hover:text-accent',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-8 rounded px-3 text-xs',
				md: 'h-9 px-4 py-2',
				lg: 'h-10 rounded px-8',
				icon: 'p-1 rounded-3xl',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, isLoading, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{isLoading ? <UpdateIcon className="animate-spin" /> : props.children}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
