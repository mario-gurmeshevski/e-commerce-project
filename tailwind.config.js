export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
			},
			transitionProperty: {
				all: 'all',
				width: 'width',
			},
			keyframes: {
				spinSlow: {
					to: { transform: 'rotate(360deg)' },
				},
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				'pulse-scale': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 rgba(0,0,0,0)',
					},
					'50%': {
						transform: 'scale(1.02)',
						boxShadow: '0 0 15px rgba(0,0,0,0.1)',
					},
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'overlay-fade': {
					'0%': { opacity: 0 },
					'100%': { opacity: 0.3 },
				},
			},
			animation: {
				'fade-in': 'fadeIn 1.5s ease-in-out forwards',
				'pulse-scale': 'pulse-scale 0.5s cubic-bezier(0.4, 0, 0.6, 1)',
				spinSlow: 'spinSlow 3s linear infinite',
				'sidebar-enter': 'slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'overlay-enter': 'overlay-fade 0.2s ease-out',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],

	darkMode: 'class',
}
