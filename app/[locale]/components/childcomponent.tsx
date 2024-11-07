"use client";

import { useState } from 'react';

interface ChildComponentProps {
  value: string;              // 從父元件傳遞過來的值
  onValueChange: (newValue: string) => void; // 回調函數，用於將新值傳回父元件
}

export default function ChildComponent({ value, onValueChange }: ChildComponentProps) {
  // 子元件的狀態，默認從父元件傳來的值初始化
  const [inputValue, setInputValue] = useState(value);

  // 當 `input` 改變時，更新子元件的狀態並通知父元件
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);          // 更新子元件的狀態
    onValueChange(newValue);          // 通知父元件狀態改變
  };

  return (
    <div>
      <h2>子元件</h2>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} // 當用戶改變 `input` 時觸發
      />
      <p>子元件顯示的值：{inputValue}</p>
    </div>
  );
}
