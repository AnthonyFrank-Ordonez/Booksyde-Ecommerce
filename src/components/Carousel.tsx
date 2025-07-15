import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
	images: Array<string>;
	className: string;
}

export default function Carousel({ images, className }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);
	const [direction, setDirection] = useState('right');
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	const moveToNextSlide = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setDirection('right');
		setCurrentIndex((prev) => (prev + 1) % images.length);

		timeoutRef.current = setTimeout(() => {
			moveToNextSlide();
		}, 25000);
	};

	useEffect(() => {
		if (!timeoutRef.current) {
			timeoutRef.current = setTimeout(() => {
				moveToNextSlide();
			}, 25000);
		}
	}, []);

	const handleDotClick = (index: number) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setCurrentIndex(index);

		if (index > currentIndex) setDirection('right');
		if (index < currentIndex) setDirection('left');

		timeoutRef.current = setTimeout(() => {
			moveToNextSlide();
		}, 25000);
	};

	const handleNext = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setDirection('right');
		setCurrentIndex((prev) => (prev + 1) % images.length);

		timeoutRef.current = setTimeout(() => {
			moveToNextSlide();
		}, 25000);
	};

	const handlePrev = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setDirection('left');
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

		timeoutRef.current = setTimeout(() => {
			moveToNextSlide();
		}, 25000);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 75) handleNext();
		if (touchStart - touchEnd < -75) handlePrev();

		setTouchEnd(0);
		setTouchStart(0);
	};

	return (
		<div className={className}>
			<div
				className='relative h-64 w-full overflow-hidden rounded-lg shadow-lg shadow-gray-500 md:h-86 2xl:h-[30rem]'
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<AnimatePresence mode='wait'>
					<motion.img
						key={currentIndex}
						src={images[currentIndex]}
						alt={`Slide ${images[currentIndex] + 1}`}
						className='object-fit absolute h-full w-full'
						initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
						transition={{ duration: 0.5 }}
						crossOrigin='anonymous'
						loading='lazy'
					/>
				</AnimatePresence>

				{isHovering && (
					<>
						<button
							onClick={handlePrev}
							className='absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/50 p-2 transition-all hover:bg-white/80'
						>
							<FaChevronLeft />
						</button>

						<button
							onClick={handleNext}
							className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/50 p-2 transition-all hover:bg-white/80'
						>
							<FaChevronRight />
						</button>
					</>
				)}

				<div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-3'>
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => handleDotClick(index)}
							aria-label={`Go to Slide ${index}`}
							className={`h-3 w-3 cursor-pointer rounded-full transition-all ${index === currentIndex ? 'w-6 bg-blue-500' : 'bg-gray-400'}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
