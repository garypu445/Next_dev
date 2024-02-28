'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TrashIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
	useToast,
} from '@/components/ui';
import { UseformEmptyMessage } from '@/lib/utils';
import {
	IErrorResponse,
	useCreateAppConfig,
	useDeleteAppConfig,
	useGetAppsConfig,
	useUpdateAppConfig,
} from '@/services/api';
import { IConfig } from '@/services/api-payload';

export default function Page() {
	const { t } = useTranslation();
	const { toast } = useToast();
	const actionRef = useRef<'create' | 'update'>('create');
	const { data, error, isLoading, mutate } = useGetAppsConfig();
	const [filteredData, setFilteredData] = useState(data);
	const [selectedConfig, setSelectedConfig] = useState('');
	const { trigger: createConfig, isMutating: isCreating } = useCreateAppConfig();
	const { trigger: updateConfig, isMutating: isUpdating } = useUpdateAppConfig();
	const { trigger: deleteConfig } = useDeleteAppConfig();

	const FormSchema = z.object({
		keystr: z.string().min(1, {
			message: UseformEmptyMessage('config_keystr'),
		}),
		category: z.string().min(1, {
			message: UseformEmptyMessage('config_category'),
		}),
		description: z.string().min(1, {
			message: UseformEmptyMessage('config_description'),
		}),
		jsonvalue: z.string().min(1, {
			message: UseformEmptyMessage('config_config'),
		}),
	});
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			keystr: '',
			category: '',
			description: '',
			jsonvalue: '',
		},
	});
	const { control, handleSubmit, setValue, reset } = form;

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		let toastMsg;
		try {
			switch (actionRef.current) {
				case 'create':
					await createConfig(data);
					toastMsg = 'config_create_success';
					break;

				case 'update':
					await updateConfig(data);
					toastMsg = 'config_update_success';
					break;
			}
			toast({
				variant: actionRef.current === 'create' ? 'primary' : 'success',
				title: t(toastMsg),
			});
			mutate();
		} catch (error) {
			const typedError = error as IErrorResponse;
			let toastMsg = '';
			if (typedError.response?.status === 404) toastMsg = 'config_update_fail';
			if (typedError.response?.status === 400) toastMsg = 'config_create_fail';
			toast({
				variant: 'danger',
				title: t(toastMsg),
			});
		}
	};
	const handleEdit = (data: IConfig, category: string) => {
		setValue('category', category);
		setValue('keystr', data.keystr);
		setValue('description', data.description);
		setValue('jsonvalue', data.jsonvalue);
		setSelectedConfig(data.keystr);
	};
	const handleDelete = async (keystr: string) => {
		try {
			await deleteConfig({ keystr });
			toast({
				variant: 'success',
				title: 'config is deleted!',
			});
			mutate();
		} catch (error) {
			const typedError = error as IErrorResponse;
			toast({
				variant: 'danger',
				title: typedError.response?.data.error,
			});
		}
	};
	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		const newFilteredData = data
			?.map((categoryConfig) => ({
				...categoryConfig,
				configs: categoryConfig.configs.filter((config) =>
					config.description.toLowerCase().includes(query.toLowerCase()),
				),
			}))
			.filter((categoryConfig) => categoryConfig.configs.length > 0);
		setFilteredData(newFilteredData);
	};

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	return (
		<main className="flex h-full items-center justify-center lg:justify-end">
			<div className="grid h-full flex-grow grid-cols-3 gap-2">
				<div className="flex flex-col gap-4 border p-4">
					<p>{t('config_app_lists')}</p>
					<Input placeholder={t('config_app_keyword')} onChange={handleFilter} />
					{!isLoading && error && <div>failed to load config</div>}
					{isLoading && (
						<div className="flex flex-grow items-center justify-center">
							<p>Loading...</p>
						</div>
					)}
					{Array.isArray(filteredData) && filteredData.length === 0 && (
						<div className="flex w-full items-center justify-center">
							<p>No data</p>
						</div>
					)}
					{Array.isArray(filteredData) && filteredData.length !== 0 && (
						<Accordion type="multiple">
							{filteredData?.map((item) => (
								<AccordionItem value={item.category} key={item.category}>
									<AccordionTrigger>{item.category}</AccordionTrigger>
									{item.configs.map((subItem) => (
										<AccordionContent
											key={subItem.keystr}
											className={`flex cursor-pointer items-center justify-between rounded pl-6 pr-1 hover:bg-accent ${
												subItem.keystr === selectedConfig && 'bg-primary'
											}`}
											onClick={() => handleEdit(subItem, item.category)}>
											{subItem.description}
											<div className="flex gap-2">
												<Dialog>
													<DialogTrigger>
														<Button size="icon" variant="danger">
															<TrashIcon />
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogTitle className="text-danger">
															Warning!
														</DialogTitle>
														<DialogDescription>
															{`Are you absolutely sure to delete ${subItem.description}?`}
														</DialogDescription>
														<DialogFooter>
															<Button
																variant="danger"
																type="button"
																onClick={() =>
																	handleDelete(subItem.keystr)
																}>
																{t('confirm')}
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
											</div>
										</AccordionContent>
									))}
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="col-span-2 flex flex-col gap-4 border p-4">
						<div className="flex items-center justify-between">
							<p>{t('config_app')}</p>
							<div className="flex gap-4">
								<Button
									disabled={isCreating}
									isLoading={isCreating}
									onClick={() => (actionRef.current = 'create')}>
									{t('create')}
								</Button>
								<Button
									variant="success"
									disabled={isUpdating}
									isLoading={isUpdating}
									onClick={() => (actionRef.current = 'update')}>
									{t('save')}
								</Button>
								<Button
									variant="danger"
									type="button"
									onClick={() => {
										reset();
										setSelectedConfig('');
										actionRef.current = 'create';
									}}>
									{t('clear')}
								</Button>
							</div>
						</div>
						<div className="flex gap-4">
							<FormField
								control={control}
								name="keystr"
								render={({ field }) => (
									<FormItem className="w-1/2">
										<FormLabel required>{t('config_keystr')}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="category"
								render={({ field }) => (
									<FormItem className="w-1/2">
										<FormLabel required>{t('config_category')}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('config_description')}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="jsonvalue"
							render={({ field }) => (
								<FormItem className="flex flex-grow flex-col">
									<FormLabel required>{t('config_config')}</FormLabel>
									<FormControl>
										<Textarea {...field} className="flex-grow" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</main>
	);
}
