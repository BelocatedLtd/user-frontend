/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
    	extend: {
    		colors: {
    			primary: '#fdfdfd',
    			secondary: '#1F9FDA',
    			tertiary: '#BC0000',
    			'primary-border': '#A2D9F3',
    			'primary-light': '#EBF4FF',
    			running: 'rgba(0, 128, 0, 0.05)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
}
