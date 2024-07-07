import '@/app/index.css'
import ReduxProvider from '@/redux/provider'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
			<ReduxProvider>
				<Component {...pageProps} />
			</ReduxProvider>
		)
        
}

export default MyApp
