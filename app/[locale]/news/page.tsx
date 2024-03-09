import { Metadata } from "next";
import { useTranslation } from 'react-i18next';


export const metadata: Metadata = {
	
	title: {
		absolute: "News"
	},
	description: "News. 索圖食品最新的消息"
}

export default function NewsPage() {
	return (
		<div>
            <span style={{color:"black"}}>SUOTOO News</span>
        </div>
	);
}
