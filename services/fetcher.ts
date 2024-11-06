// services/fetcher.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_HTTP_DOMAIN;  // API 基本域名

// 使用 axios 創建 API 實例
export const API = axios.create({
  baseURL,  // 設置 baseURL
  headers: {
    'Content-Type': 'application/json',  // 設置請求頭部
  },
});

// fetcher 函數，這是實際發送 API 請求的地方
export const fetcher = async ({
  url,        // 請求的 URL
  method = 'POST',  // 默認方法是 POST
  arg = {},    // 默認請求數據
}: {
  url: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';  // 請求方法
  arg?: Record<string, unknown>;  // 請求參數
}) => {
  try {
    const response = await API.request({
      url,       // 請求地址
      method,    // 請求方法
      data: arg, // 請求數據
    });
    return response.data;  // 返回 API 響應的數據
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error('Failed to fetch data');
  }
};
