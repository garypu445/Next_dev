// services/api.ts
import useSWR, { SWRResponse } from 'swr';  // 引入 SWR
import { fetcher } from './fetcher';        // 引入 fetcher

// 定義 API 響應數據結構
export interface IApiResponse {
  id: string;
}

// 使用 SWR 的 hook 來發送 POST 請求並處理數據
export const API_GET_USERID = () => {
  const { data, error, isLoading }: SWRResponse<IApiResponse> = useSWR(
    '/v1/next_dynamic_routes',  // API 路徑
    (url: string) => fetcher({ url }),  // 使用 fetcher 發送 POST 請求，且不需要額外的參數
  );

  return {
    data,       // 返回數據
    isLoading,  // 加載狀態
    error,      // 錯誤狀態
  };
};