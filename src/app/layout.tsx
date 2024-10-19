'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import CallToAction from '@/components/home/CallToAction'
import Footer from '@/components/home/Footer'
import SubFooter from '@/components/home/SubFooter'
import ReduxProvider from '@/redux/provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import './index.css'

// Extend the global Window object
declare global {
  interface Window {
    Tawk_API: {
      hideWidget: () => void;
      toggle: () => void;
    };
  }
}

const shouldRenderComponents = (
  pathname: string,
  exclusions: string[],
): boolean => {
  return !exclusions.some((exclusion) => pathname.startsWith(exclusion))
}

const exclusions = ['/dashboard', '/kyc', '/admin']

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const shouldRender = shouldRenderComponents(pathname!, exclusions)

  const [tawkLoaded, setTawkLoaded] = useState(false)

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle(); // Open or close the chat widget
    }
  }

  useEffect(() => {
    const waitForTawk = setInterval(() => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget(); // Hide the widget initially
        clearInterval(waitForTawk)
        setTawkLoaded(true) // Mark widget as ready
      }
    }, 500)

    return () => clearInterval(waitForTawk)
  }, [])

  return (
    <html lang='en' className={`font-sans`}>
      <head>{/* Add your head content here */}</head>

      <body>
        <Suspense>
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

          {tawkLoaded && (
            <button
              onClick={openChat}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 20px',
                backgroundColor: '#1F9FDA',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Chat with us
            </button>
          )}

          <Script
            id="tawk-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                Tawk_API.customStyle = {
        visibility: {
          desktop: {
            position: 'br', // bottom-right
            xOffset: '60px', // Horizontal shift
            yOffset: 80 // Vertical shift (increase this to raise it up)
          },
          mobile: {
            position: 'br', // bottom-right
            xOffset: '10px', 
            yOffset: 60 // Raise it up on mobile as well
          },
          bubble: {
            rotate: '0deg',
            xOffset: -20,
            yOffset: 0
          }
        }
      };

                (function() {
                  var s1=document.createElement("script"),
                      s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/66a3aa1fbecc2fed692b83e6/1i3nl12va';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />

          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
