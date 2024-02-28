import './globals.css';

import type { Metadata } from 'next';

import PageTransition from '@/components/page-transition';
import ThemeProvider from '@/components/theme-provider';
import TranslationsProvider from '@/components/translations-provider';
import { Toaster } from '@/components/ui/toaster';
import { Nav, Navigation } from '@/components/widgets/nav';
import initTranslations from '../i18n';

export const metadata: Metadata = {
	title: 'ZEUSVR dashboard',
	description: 'Zeus VR dashboard',
};

const i18nNamespaces = ['home', 'country-code'];

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { resources } = await initTranslations(locale, i18nNamespaces);
	const user = true;

	return (
		<html lang="en" suppressHydrationWarning>
			<body className="flex flex-col overflow-hidden">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange>
					<TranslationsProvider
						namespaces={i18nNamespaces}
						locale={locale}
						resources={resources}>
						<Nav />
						{user && <Navigation />}
						<PageTransition>
							<main className={`h-screen p-4 ${user ? 'pt-28' : 'pt-16'}`}>
								{children}
							</main>
							<Toaster />
						</PageTransition>
					</TranslationsProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
