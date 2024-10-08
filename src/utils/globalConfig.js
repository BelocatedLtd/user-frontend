export const BACKEND_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL
		== 'production'
		? 'https://dolphin-app-esx2u.ondigitalocean.app'
		: 'http://localhost:7001'
