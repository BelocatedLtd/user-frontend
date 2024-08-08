import '@/app/index.css'
import RootLayout from '@/app/layout'
import DashboardLayout from '@/components/Layouts/dashboard'
import ReduxProvider from '@/redux/provider'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const isDashboard = router?.pathname?.startsWith('/dashboard')

	return (
		<ReduxProvider>
			{isDashboard ? (
				<DashboardLayout>
					<Component {...pageProps} />
				</DashboardLayout>
			) : (
				<RootLayout>
					<Component {...pageProps} />
				</RootLayout>
			)}
		</ReduxProvider>
	)
}

export default MyApp
