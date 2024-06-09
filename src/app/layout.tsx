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

const shouldRenderComponents = (pathname: string): boolean => {
	return !pathname.startsWith('/dashboard')
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const isDashboardPage = shouldRenderComponents(pathname)

	return (
		<html lang='en' className={`font-sans`}>
			<head>{/* Add your head content here */}</head>
			<body>
				<ReduxProvider>
					{isDashboardPage && <Header />}
					{children}
					{isDashboardPage && <CallToAction />}
					{isDashboardPage && <SubFooter />}
					{isDashboardPage && <Footer />}
				</ReduxProvider>
				<ProgressBar
					height='4px'
					color='#1F9FDA'
					options={{ showSpinner: true }}
					shallowRouting
				/>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
