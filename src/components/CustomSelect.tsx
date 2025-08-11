import { useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
	value: string;
	label: string;
}

interface CustomSelectProps {
	options: Array<Option>;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export default function CustomSelect({
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	className = '',
	disabled = false,
}: CustomSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Find the selected option directly from props
	const selectedOption =
		options.find((option) => option.value === value) || null;

	const handleSelect = (option: Option) => {
		onChange(option.value);
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	// Handle click outside using a simpler approach
	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	// Add event listener only when dropdown is open
	if (isOpen && typeof window !== 'undefined') {
		// Use setTimeout to avoid adding multiple listeners
		setTimeout(() => {
			document.addEventListener('mousedown', handleClickOutside, {
				once: true,
			});
		}, 0);
	}

	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			<button
				type='button'
				onClick={toggleDropdown}
				disabled={disabled}
				className={`w-full rounded-md border px-3 py-1 text-left focus:ring-1 focus:ring-black focus:outline-none ${
					disabled
						? 'cursor-not-allowed bg-gray-100 text-gray-500'
						: 'cursor-pointer bg-white hover:border-gray-400'
				} ${isOpen ? 'border-black ring-1 ring-black' : 'border-gray-300'} `}
			>
				<div className='flex items-center justify-between'>
					<span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<FaChevronDown
						className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</div>
			</button>

			{isOpen && (
				<div className='absolute z-50 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg'>
					<div className='max-h-60 overflow-auto'>
						{options.map((option) => (
							<button
								key={option.value}
								type='button'
								onClick={() => handleSelect(option)}
								className={`w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${option.value === value ? 'bg-gray-100 text-black' : 'text-gray-900'} `}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
