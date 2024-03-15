"use server";
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

export default async function Home() {
	// const { t } = useTranslation();

	return (
		<main className="flex">
			<div>
				<span style={{ color: "black" }}>SUOTOO ECOMERCE HOME</span>
			</div>
    	</main>
	);
}
