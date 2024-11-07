'use server'
import Profile from './@profile';  // Import Profile component
import Posts from './@posts';

import { fetcher } from '@/services/fetcher';

export default async function UserPage() {
    const data = await fetcher({
		url: '/v1/next_dynamic_routes',
		method: 'POST',
		arg: {},  // 傳遞的參數（如果需要）
	});
    return (
        <div style={{color:"black"}}>
            <h2>用戶資料與文章列表</h2>
            <span>API取得資料:{data?.id}</span>
            <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <div style={{ borderRight: '1px solid #ddd' }}>
                    <Profile />
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <Posts />
            </div>
            </div>
        </div>
    );
  }
  