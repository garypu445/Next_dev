"use server";
import { useTranslation } from 'react-i18next';

import { fetcher } from '@/services/fetcher';

export default async function AboutPage() {

	const data = await fetcher({
		url: '/v1/next_dynamic_routes',
		method: 'POST',
		arg: {},  // 傳遞的參數（如果需要）
	});

	return (
		<div>
            <span style={{color:"black"}}>SUOTOO ECOMERCE</span>
			<p style={{color:"black"}}>{data?.id}</p> {/* 顯示從 API 獲取的資料 */}
        </div>
	);
}
