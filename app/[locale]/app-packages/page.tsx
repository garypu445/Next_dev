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
import CreateAppDialog from '@/components/widgets/dialog-app';

const apps = [
	{ name: 'casino VR', version: '1.0.0.01', state: 'release' },
	{ name: 'chat VR', version: '1.0.0.01', state: 'unrelease' },
	{ name: 'App_01', version: '1.0.0.01', state: 'retired' },
	{ name: 'App_02', version: '1.0.0.02', state: 'retired' },
];

export default function AppPackages() {
	const { t } = useTranslation();

	return (
		<main className="flex h-full flex-col">
			<div className="mx-auto h-full space-y-6 pt-6 capitalize md:w-2/3">
				{/* <span className="text-xs">{`suotoo > ${t('app_admin')}`}</span> */}
				<div className="flex items-center justify-between">
					<p className="text-sm md:text-xl">{t('app_title')}</p>
					<CreateAppDialog />
				</div>
				<div className="relative h-[calc(100dvh-240px)] overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 bg-secondary uppercase">
							<TableRow>
								<TableHead>{t('app_name')}</TableHead>
								<TableHead>{t('app_version')}</TableHead>
								<TableHead>{t('app_state')}</TableHead>
								<TableHead>{t('app_actions')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{apps.map((col, index) => (
								<TableRow key={index} className="border-none">
									<TableCell>{col.name}</TableCell>
									<TableCell>{col.version}</TableCell>
									<TableCell>{t(`app_state_${col.state}`)}</TableCell>
									<TableCell className="w-96 space-x-1">
										<Button variant="link" className="text-success">
											<Link href={'/'}>{t('edit')}</Link>
										</Button>
										<span>|</span>
										<Button variant="link" className="text-success">
											{t('publush')}
										</Button>
										<span>|</span>
										<Button variant="link" className="text-primary">
											{t('retired')}
										</Button>
										<span>|</span>
										<Button variant="link" className="text-danger">
											{t('delete')}
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
