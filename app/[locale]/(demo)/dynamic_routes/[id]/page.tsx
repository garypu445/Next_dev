// (test)/dynamic_routes/[id]/page.tsx
"use client"; // 將此檔案標記為客戶端組件

// 動態路由頁面組件
export default function DynamicRoutePage({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>動態 ID: {id}</h1>
      <p>這是動態路由頁面，用於顯示 {id} 的內容。</p>
    </div>
  );
}
