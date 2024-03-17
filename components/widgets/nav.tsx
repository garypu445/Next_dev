'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyleNoFn,
} from '@/components/ui/navigation-menu';
import LanguageChanger from '../language-changer';
import ThemeToggle from './theme-toggle';
import MemberInfo from '../member-info';
import Shopcart from '../shopcart';
import { color } from 'framer-motion';

const menu = [
	{
		title: 'nav_all_products',
		options: [
			{ name: 'nav_new', route: '/' },
			{ name: 'nav_gongmaru', route: '/' },
		],
	},
];

export function Navigation() {
	const { t } = useTranslation();
	const pathname = usePathname();
	return (
		<nav className="h-navHeight top-12 z-50 flex w-full items-center justify-center bg-secondary">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/about"
							className={`${navigationMenuTriggerStyleNoFn} ${
								pathname.includes('dashboard') && 'bg-primary'
							}`}>
							{t('nav_about')}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/news"
							className={`${navigationMenuTriggerStyleNoFn} ${
								pathname.includes('app') && 'bg-primary'
							}`}>
							{t('nav_news')}
						</NavigationMenuLink>
					</NavigationMenuItem>
					{menu.map((menu, index) => (
						<NavigationMenuItem className="relative" key={index}>
							<NavigationMenuLink
								href="/products"
								className={`${navigationMenuTriggerStyleNoFn} ${
									pathname.includes('app') && 'bg-primary'
								}`}>
								<NavigationMenuTrigger
									className={`${pathname.includes(menu.title) && 'bg-primary'}`}>
									{t(menu.title)}
								</NavigationMenuTrigger>
							</NavigationMenuLink>
							<NavigationMenuContent>
								<ul className="grid w-[150px] p-2">
									{menu.options.map((option, index) => (
										<li
											key={index}
											className="rounded p-2 hover:bg-accent-foreground/10">
											<Link className="hover:underline" href={option.route}>
												{t(option.name)}
											</Link>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					))}
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/contact"
							className={`${navigationMenuTriggerStyleNoFn} ${
								pathname.includes('app') && 'bg-primary'
							}`}>
							{t('nav_contact_us')}
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	);
}

export function Nav() {
	const { t } = useTranslation();
	return (
		<nav className="h-navHeight flex flex-row w-full items-center bg-accent">
			<div className='basis-1/3'></div>
			<div className="flex items-center basis-1/3 justify-center">
				<Link className="text-3xl font-light"href="/">
					<span className="font-black">{t('nav_suotoo')}</span>
				</Link>
			</div>
			<div className="flex ml-auto basis-1/3 justify-end">
				<MemberInfo />
				<Shopcart />
				<LanguageChanger />
				{/* <ThemeToggle /> */}
			</div>
		</nav>
	);
}
