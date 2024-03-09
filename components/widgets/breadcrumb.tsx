'use client';

import exp from 'constants';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IoIosHome   } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';


interface BreadcrumbItem {
    text: string;
    link: string;
}

interface BreadcrumbMap {
    [key: string]: BreadcrumbItem[];
}


export function Breadcrumb() {
    const { i18n,t } = useTranslation();
    const currentLocale = i18n.language;
    const currentPathname = usePathname();

    const breadcrumbMap: BreadcrumbMap = {
        [`/${currentLocale}/`]: [
            { text: 'Home', link: '/' },
        ],
        [`/${currentLocale}/about`]:[
            { text: t('breadcrumb_home'), link: '/' },
            { text: t('breadcrumb_about'), link: '/about' },
        ],
        [`/${currentLocale}/products`]:[
            { text: t('breadcrumb_home'), link: '/' },
            { text: t('breadcrumb_product'), link: '/products' },
            { text: t('breadcrumb_new'), link: '/new' },
        ],
        [`/${currentLocale}/news`]:[
            { text: t('breadcrumb_home'), link: '/' },
            { text: t('breadcrumb_news'), link: '/news' },
        ],
        [`/${currentLocale}/contact`]:[
            { text: t('breadcrumb_home'), link: '/' },
            { text: t('breadcrumb_contact'), link: '/contact' },
        ]
    };

    const currentBreadcrumb = breadcrumbMap[currentPathname] || [];
    
    return (
        <nav className="flex container mx-auto lg:mx-auto 3xl:container-3xl mb-8 mt-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <span></span>
                {currentBreadcrumb.map((item, index) => (
                <li key={index} className="inline-flex items-center">
                    {index > 0 && <IoIosArrowForward className='text-black' />}
                    {index === currentBreadcrumb.length - 1 ? (
                    <span className="inline-flex items-center font-medium text-black font-semibold">
                        {index === 0 && <IoIosHome className="h-bc_icon w-bc_icon transition-all" />}
                        <span className="text-base">{item.text}</span>
                    </span>
                    ) : (
                    <a href={item.link} className="inline-flex items-center font-medium text-black">
                        {index === 0 && <IoIosHome className="h-bc_icon w-bc_icon transition-all" />}
                        <span className="text-base">{item.text}</span>
                    </a>
                    )}
                </li>
                ))}
            </ol>
        </nav>
    )
}