'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

const LocalizedLink = ({
	href,
	className,
	children,
}: {
	href: string;
	className?: string;
	children: React.ReactNode;
}) => {
	const { i18n } = useTranslation();
	const currentLocale = i18n.language;

	return (
		<Link href={`/${currentLocale}${href}`} className={cn('w-full', className)}>
			{children}
		</Link>
	);
};

export default LocalizedLink;
