import { Metadata } from "next";
import { useTranslation } from 'react-i18next';


export const metadata: Metadata = {
	
	title: {
		absolute: "Contact"
	},
	description: "Contact us.Give us reviews. 聯絡索圖食品，可以把你的心得給我們，讓我們能夠改善"
}

export default function ContactPage() {
	return (
		<div>
            <span style={{color:"black"}}>SUOTOO Contact</span>
        </div>
	);
}
