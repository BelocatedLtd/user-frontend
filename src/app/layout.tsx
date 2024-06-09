'use client'

import './index.css'
import { Header } from '@/components/Header'
import SubFooter from '@/components/home/SubFooter'
import Footer from '@/components/home/Footer'
import CallToAction from '@/components/home/CallToAction'
import { usePathname } from 'next/navigation'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ReduxProvider from '@/redux/provider'
import { Toaster } from 'react-hot-toast'

const shouldRenderComponents = (
	pathname: string,
	exclusions: string[],
): boolean => {
	return !exclusions.some((exclusion) => pathname.startsWith(exclusion))
}

const exclusions = ['/dashboard', '/kyc']

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const shouldRender = shouldRenderComponents(pathname, exclusions)

	return (
		<html lang='en' className={`font-sans`}>
			<head>{/* Add your head content here */}</head>
			<body>
				<ReduxProvider>
					{shouldRender && <Header />}
					{children}
					{shouldRender && <CallToAction />}
					{shouldRender && <SubFooter />}
					{shouldRender && <Footer />}
				</ReduxProvider>
				<ProgressBar
					height='4px'
					color='#1F9FDA'
					options={{ showSpinner: true }}
					shallowRouting
				/>
				<Analytics />
				<SpeedInsights />
				<Toaster />
			</body>
		</html>
	)
}
