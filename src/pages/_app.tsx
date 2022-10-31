import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../chakra/chakra'
import '../styles.css'
import { AuthContextProvider } from 'src/store/AuthContext'
import ProtectedRoute from 'auth/ProtectedRoute'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </ChakraProvider>
    </AuthContextProvider>
  )
}

export default MyApp
