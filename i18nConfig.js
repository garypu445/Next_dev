import { SUPPORTED_LOCALES } from './types/enum';

const i18nConfig = {
	locales: [
		SUPPORTED_LOCALES.ENGLISH,
		SUPPORTED_LOCALES.CHINESE_SIMPLIFIED,
		SUPPORTED_LOCALES.CHINESE_TRADITIONAL,
	],
	defaultLocale: SUPPORTED_LOCALES.ENGLISH,
	prefixDefault: true,
};

export default i18nConfig;
