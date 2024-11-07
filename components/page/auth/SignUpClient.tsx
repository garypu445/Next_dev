"use client";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState, ChangeEvent } from "react";
import { signIn } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast/headless';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { BiLogoGoogle, BiLogoFacebook } from 'react-icons/bi';
import { z } from 'zod';

import Input from '@/components/input/Input';
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Label,
} from '@/components/ui';

import logo from '@/public/images/logo.svg';

const signUpSchema = z.object({
  username: z
    .string({ required_error: 'Username 為必填欄位' })
    .regex(
      /^[a-zA-Z0-9_]*$/,
      '只能包含英文、數字及底線，不可包含空白及特殊符號'
    ),
  email: z
    .string({ required_error: 'Email 為必填欄位' })
    .email('請輸入正確的 Email'),
  password: z
    .string({ required_error: 'Password 為必填欄位' })
    .min(8, '密碼長度不可小於 8 個字元')
});
const genericFieldsSchema = z.record(z.string(), z.string().nullable());
const unionSchema = z.union([signUpSchema, genericFieldsSchema]);

type FieldValues = z.infer<typeof unionSchema>;

export default function RegisterPage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        account: '',
        password: '',
        rememberMe: false,
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
        username: '',
        email: '',
        password: ''
        },
        resolver: zodResolver(signUpSchema)
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
        await axios.post('/api/register', data);
        toast.success('註冊成功');
        router.push('/portal/basic');
        } catch (error) {
        toast.error('註冊失敗');
        } finally {
        setIsLoading(false);
        }
    };

    const handleSocialSignUp = (socialType: string) => {
        signIn(socialType, {
        callbackUrl: "/"
        }).then((callback) => {
        callback?.ok ? toast.success('註冊成功') : toast.error('註冊失敗');
        });
    };

    return (
        <div>
            <Card className="flex w-full max-w-lg flex-col gap-6 md:max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl tracking-wide">{t('login_title')}</CardTitle>
                </CardHeader>
                <CardContent className="text-md flex flex-col gap-3">
                    <form className="contents" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            register={register}
                            id="username"
                            errors={errors}
                            label="Username"
                            className=""
                        />
                        <Input
                            register={register}
                            id="email"
                            errors={errors}
                            label="Email"
                            className=""
                        />
                        <Input
                            register={register}
                            errors={errors}
                            id="password"
                            label="Password"
                            type="password"
                            className=""
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
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Link href={`/`} className="text-xs text-primary hover:underline">
                    {t('login_forgotPassword')}
                    </Link>
                    <Button className="w-full">
                        {t('login')}
                    </Button>
                    <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                        {t('login_signup')}
                    </Button>
                    </Link>
                    <div className="text-md text-center text-gray-300 font-light">
                        Connect With
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-center">
                        <Button variant="primary" size="md" className="w-full">
                            <BiLogoGoogle className="mr-2" />
                        </Button>
                        <Button variant="primary" size="md" className="w-full">
                            <BiLogoFacebook className="mr-2" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
