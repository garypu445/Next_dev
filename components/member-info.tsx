import i18nConfig from '@/i18nConfig';
import { PersonIcon  } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui';

export default function MemberInfo() {
	const { i18n, t } = useTranslation();
	const currentLocale = i18n.language;
	return (
		<div>
			<Link href="/account/sign-in">
				<Button aria-label='Member' variant="ghost">
					<PersonIcon className="h-icon w-icon transition-all" />
				</Button>
			</Link>
		</div>
	);
}
