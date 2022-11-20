import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../chakra/chakra'
import { AuthContextProvider } from 'src/store/AuthContext'
import ProtectedRoute from 'auth/ProtectedRoute'
import { authRequired, blockedOnAuth } from 'data/auth'
import { useRouter } from 'next/router'
import Header from 'layout/Header'
import AppLayout from 'layout/AppLayout'
import '../styles.css'
import { VotingContextProvider } from 'store/VotingContext'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const isProtectedRoute = authRequired.some(item => pathname.includes(item))
  const isBlockedOnAuth = blockedOnAuth.includes(pathname)

  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        {isBlockedOnAuth || isProtectedRoute ? (
          <ProtectedRoute>
            {isProtectedRoute && <Header />}
            {isBlockedOnAuth ? (
              <Component {...pageProps} />
            ) : (
              <AppLayout>
                <VotingContextProvider>
                  <Component {...pageProps} />
                </VotingContextProvider>
              </AppLayout>
            )}
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </AuthContextProvider>
  )
}

export default MyApp
