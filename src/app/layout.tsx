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
import Script from 'next/script'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

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
				<Script
					dangerouslySetInnerHTML={{
						__html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/66706a619a809f19fb3eb4bb/1i0jhv3q8';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
					}}
				/>
				<Toaster />
			</body>
		</html>
	)
}
