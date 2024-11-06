'use client';
//  Use user selected locale and set it as a cookie named "NEXT_LOCALE" that next-i18n-router uses to override the automatic locale detection.

import i18nConfig from '@/i18nConfig';
import { GlobeIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui';

import { SUPPORTED_LOCALES } from '@/types/enum';

const localesOptions = [
	SUPPORTED_LOCALES.ENGLISH,
	SUPPORTED_LOCALES.CHINESE_SIMPLIFIED,
	SUPPORTED_LOCALES.CHINESE_TRADITIONAL,
];

export default function LanguageChanger() {
	const { i18n, t } = useTranslation();
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	const handleChange = (locale: string) => {
		// set cookie for next-i18n-router
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = '; expires=' + date.toUTCString();
		document.cookie = `NEXT_LOCALE=${locale};expires=${expires};path=/`;

		// redirect to the new locale path
		if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
			router.push('/' + locale + currentPathname);
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${locale}`));
		}

		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-label='Language' variant="ghost">
					<GlobeIcon className="h-icon w-icon transition-all" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{localesOptions.map((locale, index) => (
					<DropdownMenuItem
						key={index}
						disabled={currentLocale === locale}
						onSelect={() => handleChange(locale)}>
						{t(`locale_${locale}`)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
