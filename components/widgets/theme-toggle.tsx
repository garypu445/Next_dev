'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button variant="ghost" onClick={() => setTheme(theme === 'custom' ? 'custom' : 'custom')}>
			<SunIcon className="h-icon w-icon rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<MoonIcon className="absolute h-icon w-icon rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
