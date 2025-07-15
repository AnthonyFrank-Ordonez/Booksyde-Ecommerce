import { motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

interface ScrollFadeSectionProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
	style?: {
		clipPath: string;
	};
}

export function ScrollFadeSection({
	children,
	delay = 0,
	className = '',
	style = { clipPath: '' },
}: ScrollFadeSectionProps) {
	const controls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	useEffect(() => {
		if (isInView) {
			controls.start('visible');
		}
	}, [controls, isInView]);

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			animate={controls}
			variants={{
				hidden: { opacity: 0, y: 75 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.6, delay, ease: 'easeOut' }}
			className={className}
			style={style}
		>
			{children}
		</motion.div>
	);
}
