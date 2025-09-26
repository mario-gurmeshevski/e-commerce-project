const Loader = () => {
	return (
		<div className="flex items-center justify-center h-[70vh]" role="status" aria-label="Loading">
			<div 
				className="w-20 h-20 border-4 border-dashed rounded-full border-black animate-spinSlow"
				aria-hidden="true"
			></div>
			<span className="sr-only">Loading...</span>
		</div>
	)
}

export default Loader
