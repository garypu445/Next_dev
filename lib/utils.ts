import { clsx, type ClassValue } from 'clsx';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function transferFileToBase64(file: File, callback: (e: ProgressEvent<FileReader>) => void) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = (e) => {
		callback(e);
	};
}

export function UseformEmptyMessage(i18nParam: string) {
	const { t } = useTranslation();
	return t('error_form_empty', { field: t(i18nParam) });
}
