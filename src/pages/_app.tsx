import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../chakra/chakra'
import '../styles.css'
import { AuthContextProvider } from 'src/store/AuthContext'
import ProtectedRoute from 'auth/ProtectedRoute'
import { authRequired, blockedOnAuth } from 'data/auth'
import { useRouter } from 'next/router'
import Header from 'layout/Header'

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
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </AuthContextProvider>
  )
}

export default MyApp
