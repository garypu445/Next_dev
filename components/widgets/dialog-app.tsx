'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Cross2Icon, ImageIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui';
import { UseformEmptyMessage, transferFileToBase64 } from '@/lib/utils';
import { SUPPORTED_LOCALES } from '@/types/enum';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 5000000; // 5MB
const appTypes = ['game', 'tool'];
const languages = [
	SUPPORTED_LOCALES.ENGLISH,
	SUPPORTED_LOCALES.CHINESE_TRADITIONAL,
	SUPPORTED_LOCALES.CHINESE_SIMPLIFIED,
	SUPPORTED_LOCALES.JAPANESE,
];

const CreateAppDialog = () => {
	const { t } = useTranslation();
	const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const FormSchema = z.object({
		name: z.string().min(1, {
			message: UseformEmptyMessage('app_project_name'),
		}),
		type: z.string(),
		abbreviation: z.string().min(1, {
			message: UseformEmptyMessage('app_project_abbreviation'),
		}),
		localizedVersions: z
			.array(
				z.object({
					name: z.string().min(1, {
						message: UseformEmptyMessage('app_localized_name'),
					}),
					languages: z.string(),
					base64: z.union([z.string(), z.instanceof(ArrayBuffer)]).optional(),
					file: z.union([z.string(), z.instanceof(File)]),
				}),
			)
			.refine(
				(localizedVersions) =>
					localizedVersions.some((version) => version.file instanceof File),
				{
					message: t('error_no_file'),
				},
			),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			type: 'game',
			abbreviation: '',
			localizedVersions: [
				{
					name: '',
					languages: 'en',
					file: '',
					base64: '',
				},
			],
		},
	});
	const { control, setValue, setError, clearErrors, reset, handleSubmit, getValues } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'localizedVersions',
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
		reset();
	};

	const handleFile = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const file = e.target.files;
		if (file && file.length > 0) {
			const imageFile = file[0];
			if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type)) {
				setError(`localizedVersions.${index}.file`, {
					message: t('error_invalid_file_type'),
				});
				return;
			}
			if (imageFile.size >= MAX_FILE_SIZE) {
				setError(`localizedVersions.${index}.file`, {
					message: t('error_file_too_large'),
				});
				return;
			}
			clearErrors(`localizedVersions.${index}.file`);

			const handleBase64 = (e: ProgressEvent<FileReader>) => {
				const newValues = [...getValues('localizedVersions')];
				newValues[index].file = imageFile;
				if (e.target?.result) {
					newValues[index].base64 = e.target.result;
				}
				setValue('localizedVersions', newValues);
			};
			transferFileToBase64(imageFile, handleBase64);
		}
	};

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				setIsDialogOpen(open);
				reset();
			}}>
			<DialogTrigger asChild>
				<Button variant="success">{t('app_project_create')}</Button>
			</DialogTrigger>
			<DialogContent>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
						<div className="space-y-4 px-4">
							<DialogTitle className="mb-2 text-primary">
								{t('app_project_new')}
							</DialogTitle>
							<div className="grid grid-cols-3 gap-4">
								<FormField
									control={control}
									name="name"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel required>{t('app_project_name')}</FormLabel>
											<FormControl>
												<Input {...field} autoComplete="name" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel required>{t('app_type')}</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													value={field.value}
													name="type">
													<FormControl>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{appTypes.map((type, index) => (
															<SelectItem key={index} value={type}>
																{t(type)}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="abbreviation"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel required>
												{t('app_project_abbreviation')}
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="space-y-4">
							<DialogTitle className="flex items-center justify-between px-4 text-primary">
								{t('app_localized_name_icon')}
								<Button
									type="button"
									variant="primary"
									onClick={() =>
										append({
											name: '',
											languages: 'en',
											file: '',
											base64: '',
										})
									}>
									{t('app_project_add')}
								</Button>
							</DialogTitle>
							<ScrollArea className="flex max-h-60 flex-col">
								<div className="flex flex-col gap-2 px-4 py-1">
									{fields.map((version, index) => (
										<div
											key={version.id} // refresh component after deleting rows
											className="relative flex gap-4">
											<FormField
												control={control}
												name={`localizedVersions.${index}.name`}
												render={({ field }) => (
													<FormItem className="w-full">
														<FormControl>
															<Input
																{...field}
																placeholder={t(
																	'app_localized_name',
																)}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name={`localizedVersions.${index}.languages`}
												render={({ field }) => (
													<FormItem className="w-full">
														<Select
															name={`localizedVersions.${index}.languages`}
															defaultValue={version.languages}
															onValueChange={field.onChange}>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																{languages.map((locale, index) => (
																	<SelectItem
																		key={index}
																		value={locale}>
																		{t(`locale_${locale}`)}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name={`localizedVersions.${index}.file`}
												render={({ formState: { errors } }) => {
													const error_no_file =
														errors.localizedVersions?.root?.message;
													return (
														<FormItem className="flex w-9 flex-col items-center whitespace-nowrap">
															<FormControl>
																<div>
																	<Input
																		type="file"
																		className="hidden"
																		ref={(el) =>
																			(fileRefs.current[
																				index
																			] = el)
																		}
																		onChange={(e) =>
																			handleFile(e, index)
																		}
																	/>
																	<Button
																		type="button"
																		variant="outline"
																		size="icon"
																		className={`${
																			version.file &&
																			'bg-secondary/80'
																		}`}
																		onClick={() =>
																			fileRefs.current[
																				index
																			]?.click()
																		}>
																		{version.file instanceof
																		Blob ? (
																			<Image
																				width={24}
																				height={24}
																				src={URL.createObjectURL(
																					version.file,
																				)}
																				alt="file preview"
																			/>
																		) : (
																			<ImageIcon />
																		)}
																	</Button>
																</div>
															</FormControl>
															<FormMessage />
															{error_no_file && (
																<FormMessage>
																	{t(error_no_file)}
																</FormMessage>
															)}
														</FormItem>
													);
												}}
											/>
											<FormItem>
												<Button
													type="button"
													variant="danger"
													size="icon"
													onClick={() => remove(index)}>
													<Cross2Icon />
												</Button>
											</FormItem>
										</div>
									))}
								</div>
							</ScrollArea>
						</div>
						<div className="px-4">
							<Button
								className="w-full"
								variant="success"
								type="submit"
								disabled={getValues('localizedVersions').length === 0}>
								{t('create')}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateAppDialog;
