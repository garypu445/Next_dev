import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Checkbox,
	Input,
	Label,
} from '@/components/ui';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
  } from "@/components/ui/drawer"

import { useState } from 'react';
import CartButton from './components/cartButton';
import { fetcher } from '@/services/fetcher';

export default async function Home() {
	// const { t } = useTranslation();
	const data = await fetcher({ url: '/v1/next_dynamic_routes' });

	return (
		<main className="flex">
			<div style={{ color: "black" }}>
				<span>SUOTOO ECOMERCE HOME </span>
				<span>API取得資料:{data?.id}</span>
				<CartButton serverData={data} />
			</div>
    	</main>
	);
}
