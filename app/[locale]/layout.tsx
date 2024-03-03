import './globals.css';

import type { Metadata } from 'next';

import PageTransition from '@/components/page-transition';
import ThemeProvider from '@/components/theme-provider';
import TranslationsProvider from '@/components/translations-provider';
import { Toaster } from '@/components/ui/toaster';
import { Nav, Navigation } from '@/components/widgets/nav';
import initTranslations from '../i18n';
import { Footer } from '@/components/widgets/footer';

export const metadata: Metadata = {
	title: 'Suotoo',
	description: 'Suotoo',
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
			<body className="flex flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange>
					<TranslationsProvider
						namespaces={i18nNamespaces}
						locale={locale}
						resources={resources}>
							<div>
								<Nav />
								<Navigation />
							</div>
							<div>
								<PageTransition>
									<main className={`h-screen p-4`}>
										{children}
									</main>
									<Toaster />
								</PageTransition>
							</div>
							<div>
								<Footer />
							</div>
					</TranslationsProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
