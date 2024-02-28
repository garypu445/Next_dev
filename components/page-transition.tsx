'use client';

import { motion } from 'framer-motion';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
	const variants = {
		pageInitial: {
			opacity: 0,
		},
		pageAnimate: {
			opacity: 1,
		},
	};

	return (
		<motion.div initial="pageInitial" animate="pageAnimate" variants={variants}>
			{children}
		</motion.div>
	);
};

export default PageTransition;
