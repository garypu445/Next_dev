'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui';
import { UseformEmptyMessage } from '@/lib/utils';
import countryCode from '@/public/country-code.json';

type Continent = 'america' | 'europe' | 'asia';
const published_countries: Record<Continent, string[]> = {
	america: ['all', 'CA', 'MX', 'US'],
	europe: ['all', 'FR', 'AT', 'DE', 'ES', 'IS', 'IT', 'GB'],
	asia: ['all', 'JP', 'KR', 'TW', 'HK', 'SG', 'MY', 'PH'],
};

export default function Home() {
	const { t } = useTranslation(['signup', 'country-code']);
	const router = useRouter();

	const FormSchema = z
		.object({
			company: z.string().min(1, {
				message: UseformEmptyMessage('signup_company'),
			}),
			location: z.string().min(1, {
				message: UseformEmptyMessage('signup_country'),
			}),
			principle: z.string().min(1, {
				message: UseformEmptyMessage('principle'),
			}),
			account: z.string().min(1, {
				message: UseformEmptyMessage('account'),
			}),
			password: z
				.string()
				.min(8, {
					message: t('error_form_password_empty'),
				})
				.refine((value) => !value.includes(' '), {
					message: t('error_form_password_spaces'),
				}),
			confirmPassword: z.string().min(1, {
				message: t('error_form_password_check'),
			}),
			email: z.string().email(),
			published: z.record(z.array(z.string())),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t('error_form_password_check'),
			path: ['confirmPassword'],
		});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			company: '',
			location: '',
			principle: '',
			account: '',
			password: '',
			confirmPassword: '',
			email: '',
			published: {
				america: [],
				europe: [],
				asia: [],
			},
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
		form.reset();

		router.push(`/dashboard`);
	};

	return (
		<Form {...form}>
			<main className="flex h-full flex-col overflow-auto overflow-x-hidden text-sm">
				<div className="mb-8">
					<h1 className="text-2xl">{t('signup_company_info')}</h1>
					<p>{t('signup_company_privacy')}</p>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="w-full space-y-4  md:w-1/2 lg:w-1/3">
						<FormField
							control={form.control}
							name="company"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('signup_company_name')}</FormLabel>
									<FormControl>
										<Input {...field} name="company" autoComplete="company" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('signup_location')}</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										name="location">
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(countryCode).map(([code]) => (
												<SelectItem key={code} value={code}>
													{t(code, { ns: 'country-code' })}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="principle"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('signup_principle')}</FormLabel>
									<FormControl>
										<Input {...field} name="principle" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="account"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('signup_account')}</FormLabel>
									<FormControl>
										<Input {...field} name="account" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('signup_password')}</FormLabel>
									<FormControl>
										<Input {...field} type="password" name="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('signup_confirm_password')}</FormLabel>
									<FormControl>
										<Input {...field} type="password" name="confirm_password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>{t('email')}</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="email"
											name="email"
											autoComplete="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="published"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<>
										<p>{t('signup_published_location')}</p>
										{Object.entries(published_countries).map(
											([continent, countries], index) => (
												<div
													key={index}
													className="w-full flex-col flex-wrap p-4 lg:w-1/2">
													<div className="font-extrabold text-primary">
														{t(continent, { ns: 'country-code' })}
													</div>
													<div className="mt-2 flex flex-wrap gap-4">
														{countries.map((country, index) => (
															<span
																className="flex w-32 items-center"
																key={index}>
																<Checkbox
																	id={
																		country === 'all'
																			? `all_${continent}`
																			: country
																	}
																	name={country}
																	checked={
																		country === 'all'
																			? field.value[continent]
																					?.length ===
																				countries.length - 1
																			: field.value[
																					continent
																				]?.includes(country)
																	}
																	onClick={(e) => {
																		const target =
																			e.target as HTMLButtonElement;
																		const newValue = {
																			...field.value,
																		};
																		if (
																			target.id.includes(
																				'all',
																			)
																		) {
																			if (
																				newValue[continent]
																					?.length ===
																				countries.length - 1
																			) {
																				newValue[
																					continent
																				] = [];
																			} else {
																				newValue[
																					continent
																				] =
																					countries.filter(
																						(c) =>
																							c !==
																							'all',
																					);
																			}
																		} else if (
																			newValue[
																				continent
																			]?.includes(target.id)
																		) {
																			newValue[continent] =
																				newValue[
																					continent
																				].filter(
																					(c) =>
																						c !==
																						target.id,
																				);
																		} else {
																			newValue[continent] = [
																				...(newValue[
																					continent
																				] || []),
																				target.id,
																			];
																		}
																		field.onChange(newValue);
																	}}
																/>
																<Label
																	htmlFor={
																		country === 'all'
																			? `all_${continent}`
																			: country
																	}>
																	{t(country, {
																		ns: 'country-code',
																	})}
																</Label>
															</span>
														))}
													</div>
												</div>
											),
										)}
									</>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="space-x-4">
						<Button variant="success" className="w-20">
							{t('submit')}
						</Button>
						<Link href={`/`}>
							<Button variant="secondary" className="w-20">
								{t('cancel')}
							</Button>
						</Link>
					</div>
				</form>
			</main>
		</Form>
	);
}
