import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve('src')
		return config
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
}

export default nextConfig
