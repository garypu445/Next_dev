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

import { API_GET_USERID } from '@/services/api';

export default function Home() {
	// const { t } = useTranslation();
	const test = "123456"
	const form = "343434"
	const { data, isLoading, error } = API_GET_USERID();

	if (isLoading) {
		return <div>載入中...</div>;
	}

	if (error) {
		return <div>錯誤: {error.message}</div>;
	}

	return (
		<main className="flex">
			<div style={{ color: "black" }}>
				<span>SUOTOO ECOMERCE HOME </span>
				<span>CSR API取得資料:{data?.id}</span>
			</div>
    	</main>
	);
}
