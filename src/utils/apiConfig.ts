export const API_CONFIG = {
	// Toggle to enable/disable API usage
	// When true: Application attempts to fetch from backend API first, with fallback to local JSON
	// When false: Application uses only local JSON fallback data
	useApi: false,

	// Base URL for API requests; only used when useApi is true
	baseUrl: 'http://localhost:3000',

	// API endpoints configuration
	endpoints: {
		honey: '/api/honey',
		blog: '/api/blog',
		health: '/api/health',
		order: '/api/order', // Base endpoint for order operations
		mail: '/api/mail',
		createOrder: '/api/order/create', // Added for checkout functionality
	} as const,

	// Request timeout in milliseconds
	timeout: 5000,
} as const
