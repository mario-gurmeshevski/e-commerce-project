// API endpoints for different data types
// These endpoints are used when API is enabled (useApi: true in config)
export const API_ENDPOINTS = {
	HONEY: '/api/honey',
	BLOG: '/api/blog',
	HEALTH: '/api/health',
	ORDER: '/api/order',
} as const

// Fallback data files used when API is disabled
// These JSON files contain local data that serves as backup when API is unavailable
export const FALLBACK_FILES = {
	HONEY: 'honey.json',
	BLOG: 'blog.json',
	HEALTH: 'health.json',
	ORDER: 'order.json',
} as const

// Application route paths
// All route definitions used throughout the application
export const ROUTES = {
	HOME: '/' as const,
	SHOP: '/shop' as const,
	CONTACT: '/contact' as const,
	ABOUT: '/about' as const,
	CHECKOUT: '/checkout' as const,
	TERMS: '/terms' as const,
	PRIVACY: '/privacy' as const,
	BLOG: '/blog' as const,
	HEALTH: '/health' as const,
	POLLEN_PROPOLIS: '/pollen_propolis' as const,
} as const

// Category labels in Macedonian for product categorization
// Used for displaying product categories in the UI
export const CATEGORY_LABELS_MK = {
	ALL: 'Сите',
	HONEY: 'Мед',
	POLLEN: 'Полен',
	HONEYCOMB: 'Саќе',
	ROYAL_JELLY: 'Матичен Млеч',
	PROPOLIS_SPRAY: 'Прополис Спреј',
} as const

// Sort options available for product listings
// Provides users with different ways to sort products in the shop
export const SORT_OPTIONS = [
	{ value: 'name_asc', label: 'Име (A-Ш)' },
	{ value: 'name_desc', label: 'Име (Ш-А)' },
	{ value: 'price_asc', label: 'Цена (најниска)' },
	{ value: 'price_desc', label: 'Цена (највисока)' },
] as const

// Page titles for SEO and browser tab display
// Defines the title text shown in browser tabs for each page
export const PAGE_TITLES = {
	HOME: 'Home - E Commerce',
	SHOP: 'Shop - E Commerce',
	CONTACT: 'Contact - E Commerce',
	ABOUT: 'About Us - E Commerce',
	CHECKOUT: 'Checkout - E Commerce',
	TERMS: 'Terms - E Commerce',
	PRIVACY: 'Privacy - E Commerce',
	BLOG: 'Blog - E Commerce',
	HEALTH: 'Health - E Commerce',
	POLLEN_PROPOLIS: 'Pollen & Propolis - E Commerce',
} as const

// Error messages displayed to users
// Standardized error messages for consistent user experience
export const ERROR_MESSAGES = {
	PRODUCTS_LOAD_FAILED: 'Не успеавме да ги вчитаме производите.',
	PAGE_NOT_FOUND: 'Страницата не е пронајдена',
} as const

// Timeout settings for various operations
// Configurable timeout values to prevent hanging requests
export const TIMEOUTS = {
	API_REQUEST: 5000, // 5 seconds timeout for API requests
} as const
