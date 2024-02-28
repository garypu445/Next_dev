'use client';

import { zodResolver } from '@hookform/resolvers/zod';
// import { TrashIcon } from '@radix-ui/react-icons';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
	Button,
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
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
	useCreateServerConfig,
	// useDeleteServerConfig,
	useGetServerConfig,
	useUpdateServerConfig,
} from '@/services/api';
import { IServerConfig } from '@/services/api-payload';

export default function Page() {
	const { t } = useTranslation();
	const { toast } = useToast();
	const actionRef = useRef<'create' | 'update'>('create');
	const [selectedConfig, setSelectedConfig] = useState<null | number>(null);
	const { data, error, isLoading, mutate } = useGetServerConfig();
	const { trigger: createConfig, isMutating: isCreating } = useCreateServerConfig();
	const { trigger: updateConfig, isMutating: isUpdating } = useUpdateServerConfig();
	// const { trigger: deleteConfig } = useDeleteServerConfig();

	const FormSchema = z.object({
		keystr: z.string().min(1, {
			message: UseformEmptyMessage('config_keystr'),
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
	const handleEdit = (data: IServerConfig) => {
		setValue('keystr', data.keystr);
		setValue('description', data.description);
		setValue('jsonvalue', data.jsonvalue);
	};
	// const handleDelete = async (keystr: string) => {
	// 	try {
	// 		await deleteConfig({ keystr });
	// 		toast({
	// 			variant: 'success',
	// 			title: 'config is deleted!',
	// 		});
	// 		mutate();
	// 		setSelectedConfig(null);
	// 		reset();
	// 	} catch (error) {
	// 		const typedError = error as IErrorResponse;
	// 		toast({
	// 			variant: 'danger',
	// 			title: typedError.response?.data.error,
	// 		});
	// 	}
	// };

	return (
		<main className="flex h-full items-center justify-center lg:justify-end">
			<div className="grid h-full flex-grow grid-cols-3 gap-2">
				<div className="flex flex-col gap-2 border p-4">
					<div className="flex items-center justify-between">
						<p>{t('config_server_lists')}</p>
					</div>
					<Command>
						<CommandInput placeholder="search..." />
						{isLoading && (
							<div className="flex flex-grow items-center justify-center">
								<p>Loading...</p>
							</div>
						)}
						{!isLoading && error && <div>failed to load config</div>}
						<CommandList>
							{!isLoading && <CommandEmpty>No Data.</CommandEmpty>}
							{data?.map((item, index) => (
								<CommandItem
									key={index}
									onSelect={() => {
										setSelectedConfig(index);
										handleEdit(item);
									}}
									className={`flex cursor-pointer items-center justify-between ${
										index === selectedConfig && 'bg-primary'
									}`}>
									{item.description + item.keystr}
									{/* <Button
										size="icon"
										variant="danger"
										onClick={() => handleDelete(item.keystr)}>
										<TrashIcon />
									</Button> */}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</div>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="col-span-2 flex flex-col gap-4 border p-4">
						<div className="flex items-center justify-between">
							<p>{t('config_server')}</p>
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
										setSelectedConfig(null);
										reset();
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
								name="description"
								render={({ field }) => (
									<FormItem className="w-1/2">
										<FormLabel required>{t('config_description')}</FormLabel>
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
