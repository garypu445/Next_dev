'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui';

const apps = [
	{ name: 'casino VR', id: '00001', type: 'game', state: 'release' },
	{ name: 'chat VR', id: '00002', type: 'game', state: 'release' },
	{ name: 'pico lobby', id: '00003', type: 'tool', state: 'retired' },
];

export default function Dashboard() {
	const { t } = useTranslation();

	return (
		<main className="flex h-full flex-col">
			<div className="mx-auto space-y-6 py-6 md:w-2/3">
				<p className="text-sm text-primary md:text-xl">Apps：</p>
				<div className="relative h-[calc(100dvh-176px)] overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 bg-secondary uppercase">
							<TableRow>
								<TableHead>{t('app_name')}</TableHead>
								<TableHead>{t('app_id')}</TableHead>
								<TableHead>{t('app_type')}</TableHead>
								<TableHead>{t('app_state')}</TableHead>
								<TableHead>{t('app_actions')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{apps.map((col, index) => (
								<TableRow key={index} className="border-none">
									<TableCell>{col.name}</TableCell>
									<TableCell>{col.id}</TableCell>
									<TableCell>{col.type}</TableCell>
									<TableCell>{t(`app_state_${col.state}`)}</TableCell>
									<TableCell className="w-80 space-x-2">
										<Button variant="link" className="text-success">
											<Link href="/app-packages">{t('app_admin')}</Link>
										</Button>
										<span>／</span>
										<Button variant="link" className="text-success">
											<Link href="/app-packages">{t('store_admin')}</Link>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</main>
	);
}
