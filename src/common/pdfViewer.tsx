import { Document, Page, pdfjs } from 'react-pdf'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import ErrorMessage from '../components/common/ErrorMessage'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
	url: string
	displayText: string
}

const PDFViewer = ({ url, displayText }: PDFViewerProps) => {
	const [numPages, setNumPages] = useState<number | null>(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false)
		}
		if (isOpen) {
			document.addEventListener('keydown', handleEsc)
			document.body.style.overflow = 'hidden'
		}
		return () => {
			document.removeEventListener('keydown', handleEsc)
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	const modal = (
		<div className="fixed inset-0 z-50 flex flex-col w-full h-full">
			<div className="bg-white w-full h-full flex flex-col relative">
				<div className="absolute top-2 right-2 z-10">
					<button
						onClick={() => setIsOpen(false)}
						className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
						aria-label="Close PDF"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="bg-gray-100 p-4 border-b">
					<h3 className="font-medium text-lg">{displayText}</h3>
				</div>
				<div
					ref={containerRef}
					className="flex-1 overflow-auto flex justify-center items-center"
					style={{ height: '100vh' }}
				>
					<Document
						file={url}
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						loading={
							<div className="flex items-center justify-center h-full">
								<p>Loading PDF...</p>
							</div>
						}
						error={<ErrorMessage message="Error loading PDF. Please try again." />}
					>
						<Page pageNumber={pageNumber} scale={0.75} />
					</Document>
				</div>
				<div className="p-4 border-t flex items-center justify-between bg-white">
					<button
						onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
						disabled={pageNumber <= 1}
						className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Previous
					</button>
					<span>
						Page {pageNumber} of {numPages || '...'}
					</span>
					<button
						onClick={() =>
							numPages && setPageNumber(Math.min(numPages, pageNumber + 1))
						}
						disabled={!numPages || pageNumber >= (numPages || 1)}
						className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center font-medium transition-colors duration-200"
			>
				<svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
					<path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
				</svg>
				{displayText}
			</button>
			{isOpen && createPortal(modal, document.body)}
		</>
	)
}

export default PDFViewer
