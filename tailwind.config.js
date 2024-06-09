/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#fdfdfd', // White
				secondary: '#1F9FDA', //Blue
				tertiary: '#BC0000', // Red
				'primary-border': '#A2D9F3', //border
				'primary-light': '#EBF4FF',
				running: 'rgba(0, 128, 0, 0.05)', // Running
			},
		},
	},
	plugins: [],
}
