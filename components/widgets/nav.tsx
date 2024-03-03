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
			{ name: 'nav_management_community', route: '/community' },
			{ name: 'nav_management_ads', route: '/ads' },
		],
	},
	// {
	// 	title: 'nav_permission',
	// 	options: [
	// 		{ name: 'nav_management_user', route: '/permission/user' },
	// 		{ name: 'nav_management_group', route: '/permission/group' },
	// 	],
	// },
	// {
	// 	title: 'nav_tools',
	// 	options: [
	// 		{ name: 'nav_sales_device', route: '/tools/device-sales' },
	// 		{ name: 'nav_sales_ow', route: '/tools/ow-sales' },
	// 		{ name: 'nav_sales_game', route: '/tools/game-sales' },
	// 		{ name: 'nav_management_member', route: '/tools/member-management' },
	// 		{ name: 'nav_management_company', route: '/tools/company-info' },
	// 		{ name: 'nav_management_device', route: '/tools/device-management' },
	// 	],
	// },
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
							href="/"
							className={`${navigationMenuTriggerStyleNoFn} ${
								pathname.includes('app') && 'bg-primary'
							}`}>
							{t('nav_news')}
						</NavigationMenuLink>
					</NavigationMenuItem>
					{menu.map((menu, index) => (
						<NavigationMenuItem className="relative" key={index}>
							<NavigationMenuTrigger
								className={`${pathname.includes(menu.title) && 'bg-primary'}`}>
								{t(menu.title)}
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[300px] p-2">
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
							href="/"
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
				<Link className="text-2xl font-light"href="/">
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
