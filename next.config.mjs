import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: './dist',
	webpack: (config, { isServer }) => {
		config.resolve.alias['@'] = path.resolve('src')
		return config
	},
}

export default nextConfig
