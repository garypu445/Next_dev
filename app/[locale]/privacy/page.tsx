import { Metadata } from "next";
import { useTranslation } from 'react-i18next';


export const metadata: Metadata = {
	
	title: {
		absolute: "Privacy"
	},
	description: "Suotoo Privacy. 索圖食品隱私權政策"
}

export default function PrivacyPage() {
	return (
		<div>
            <span style={{color:"black"}}>SUOTOO Privacy</span>
        </div>
	);
}
