interface ErrorMessageProps {
	message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return (
		<div className="min-h-[calc(100vh-25vh)] flex flex-col items-center justify-center text-center px-4 py-8">
			<p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-3 sm:mt-4">
				{message}
			</p>
		</div>
	)
}

export default ErrorMessage
