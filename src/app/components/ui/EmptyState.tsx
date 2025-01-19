const EmptyState: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center p-6 text-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-16 w-16 text-gray-400 mb-4'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={2}
			>
				<path strokeLinecap='round' strokeLinejoin='round' d='M9 17v-5m6 5V7m-7 7h8' />
			</svg>
			<p className='text-gray-600 text-lg mb-2'>Oops, no data found!</p>
		</div>
	)
}

export default EmptyState