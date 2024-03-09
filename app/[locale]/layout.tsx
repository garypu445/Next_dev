import './globals.css';

import type { Metadata } from 'next';
import PageTransition from '@/components/page-transition';
import ThemeProvider from '@/components/theme-provider';
import TranslationsProvider from '@/components/translations-provider';
import { Toaster } from '@/components/ui/toaster';
import { Nav, Navigation } from '@/components/widgets/nav';
import initTranslations from '../i18n';
import { Footer } from '@/components/widgets/footer';
import { Breadcrumb } from '@/components/widgets/breadcrumb';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default:"Suotoo 索圖食品 虱目魚丸",
		template: "%s - Suotoo 索圖食品 虱目魚丸"
	},
	description: 'Suotoo 索圖食品，冷凍食品、虱目魚貢丸、風味十足、香味、大人小孩都喜歡、營養',
	icons:{
		icon:'/favicon.ico'
	}
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
								<Breadcrumb />
								<PageTransition>
									<main className={`h-screen`}>
										<div className='container mx-auto lg:mx-auto 3xl:container-3xl'>
											{children}
										</div>
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
