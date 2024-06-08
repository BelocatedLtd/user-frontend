export const BACKEND_URL =
	process.env.NEXT_PUBLIC_DEV_ENV == 'production'
		? 'https://belocated-app-api.onrender.com'
		: 'http://localhost:6001'
