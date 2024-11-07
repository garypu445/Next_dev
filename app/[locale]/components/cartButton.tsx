"use client";

import { useState, useEffect } from 'react';
import { API_GET_USERID, API_UPDATE } from '@/services/api';
import { fetcher } from '@/services/fetcher';
import { Button } from '@/components/ui';

interface CartButtonProps {
  serverData: {
    id: string;
  };
}

export default function CartButton({ serverData }: CartButtonProps) {
    const [cartCount, setCartCount] = useState(0);
    const [updateData, setUpdateData] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    // 调用 API_GET_USERID 获取数据
    const { data, isLoading, error, mutate } = API_GET_USERID();

    // 处理更新按钮的点击事件
    const handleUpdateClick = async () => {
        // 调用 API_UPDATE 获取更新结果
        const result = await fetcher({ url: '/v1/update' });
        // 这里可以触发 API_UPDATE
        console.log("触发更新 API");

        // 你也可以根据 `updateData` 来执行一些其他的逻辑
        if (result && result.code === 1) {
            console.log("更新成功: ", result.msg);
            setUpdateData(result.msg);

            setShouldRefetch(true);
        }
    };

    useEffect(() => {
    if (shouldRefetch) {
        // Trigger the refetch using the mutate function from API_GET_USERID
        mutate(); // mutate will re-fetch the data
        setShouldRefetch(false); // Reset refetch flag
    }
    }, [shouldRefetch, mutate]); // Run effect when shouldRefetch changes

    // 显示加载状态或错误
    if (isLoading) {
        return <div>載入中...</div>;
    }

    if (error) {
        return <div>錯誤: {error.message}</div>;
    }

    return (
        <div>
            <div>
                <button onClick={() => setCartCount(cartCount + 1)}>
                    Add to Cart ({cartCount})
                </button>
            </div>
            <div>
                <span>SWR API取得資料: {data?.id}</span>
            </div>
            <div>
                <span>Server端傳遞資料: {serverData?.id}</span> {/* 顯示從 Server Component 傳來的資料 */}
            </div>
            <div>
                {/* 触发更新操作 */}
                <Button onClick={handleUpdateClick}>
                    更新資料
                </Button>
                <p>更新成功: {updateData}</p>
            </div>

        </div>
    );
}
