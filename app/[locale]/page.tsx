"use client";
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

import { GetNextTest } from '@/services/api';

export default function Home() {
	// const { t } = useTranslation();
	const test = "123456"
	const form = "343434"
	const { data, isLoading, error, mutate } = GetNextTest({test, form})
	return (
		<main className="flex">
			<div>
				<span style={{ color: "black" }}>SUOTOO ECOMERCE HOME</span>
			</div>
    	</main>
	);
}
