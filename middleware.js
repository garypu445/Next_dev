import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

// detect the user’s preferred language using the `accept-language` header
export function middleware(request) {
	return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
};
