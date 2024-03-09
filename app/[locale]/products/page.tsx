import { Metadata } from "next";
import { useTranslation } from 'react-i18next';


export const metadata: Metadata = {
	
	title: {
		absolute: "Products"
	},
	description: "Suotoo Products. 索圖食品的產品"
}

export default function ProductsPage() {
	return (
		<div>
            <span style={{color:"black"}}>SUOTOO Products</span>
        </div>
	);
}
