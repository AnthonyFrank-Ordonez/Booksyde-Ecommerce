import { motion, type TargetAndTransition } from 'motion/react';

interface HoverContainerProps {
	children: React.ReactNode;
	hover?: TargetAndTransition;
	className?: string;
}

export default function HoverContainer({
	children,
	hover = { scale: 1.03 },
	className = '',
}: HoverContainerProps) {
	return (
		<motion.div className={className} whileHover={hover}>
			{children}
		</motion.div>
	);
}
