"use client";
import { Metadata } from "next";
import Link from 'next/link';
import { ChangeEvent, useState } from "react";
import { useTranslation } from 'react-i18next';
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

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


export default async function RegisterPage() {
    const { t } = useTranslation();
    const session = await getServerSession(options)

    const [formData, setFormData] = useState({
		account: '',
		password: '',
		rememberMe: false,
	});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
            <span style={{color:"black"}}>SUOTOO Login</span>
            <Card className="flex w-full flex-col gap-6 md:max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl tracking-wide">{t('login_title')}</CardTitle>
                </CardHeader>
                <CardContent className="text-md flex flex-col gap-3">
                    <Input
                        name="account"
                        placeholder={t('login_account')}
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="password"
                        placeholder={t('login_password')}
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <div className="flex items-center space-x-1">
                        <Checkbox
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked: boolean) => {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    rememberMe: checked,
                                }));
                            }}
                        />
                        <Label
                            htmlFor="rememberMe"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {t('login_rememberMe')}
                        </Label>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-end gap-2">
                    <Link href={`/`} className="text-xs text-primary hover:underline">
                        {t('login_forgotPassword')}
                    </Link>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                        {t('login')}
                    </Button>
                    <Link href="/signup" className="w-full">
                        <Button variant="outline" className="w-full">
                            {t('login_signup')}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
	);
}
