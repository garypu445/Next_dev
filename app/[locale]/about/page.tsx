import { Metadata } from "next";
import { useTranslation } from 'react-i18next';


export const metadata: Metadata = {
	
	title: {
		absolute: "About"
	},
	description: "About Suotoo inc. We made good food in the world. 關於索圖食品，我們做了世界上最好吃的虱目魚貢丸"
}

export default function AboutPage() {
	return (
		<div>
            <span style={{color:"black"}}>SUOTOO ECOMERCE</span>
        </div>
	);
}
