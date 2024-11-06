// app/user/layout.tsx

export default function UserLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div style={{color:"black"}}>
        <h1>用戶頁面</h1>
          {children}
      </div>
    );
  }
  