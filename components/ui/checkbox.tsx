'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
// import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'relative mr-2.5 inline-block h-4 w-4 appearance-none border border-primary-foreground bg-transparent before:absolute before:left-2/4 before:top-2/4 before:block before:h-2.5 before:w-2.5 before:-translate-x-2/4 before:-translate-y-2/4 before:scale-0 before:bg-blue-400 before:transition-all before:duration-300 before:ease-in-out before:content-[""] before:data-[state=checked]:scale-100',
			// 'group relative inline-flex h-4 w-4 shrink-0 items-center justify-center border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground ',
			className,
		)}
		{...props}>
		{/* <CheckboxPrimitive.Indicator
			className={cn(
				'absolute flex h-2.5 w-2.5 scale-0 transform bg-primary transition-all duration-300 group-data-[state=checked]:scale-100',
			)}>
			<CheckIcon className="h-4 w-4" />
		</CheckboxPrimitive.Indicator> */}
	</CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
