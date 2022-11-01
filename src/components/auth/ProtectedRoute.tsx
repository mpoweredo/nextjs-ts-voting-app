import { Box, Center, Spinner } from '@chakra-ui/react'
import { authRequired, blockedOnAuth } from 'data/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserAuth } from 'store/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = UserAuth()
  const { push, pathname } = useRouter()

  const isProtectedRoute = authRequired.some(item => pathname.includes(item))

  const isBlockedOnAuth = blockedOnAuth.includes(pathname)

  useEffect(() => {
    // check if user is logged in
    if (!user && !isLoading && isProtectedRoute && !isBlockedOnAuth) {
      push('/signin')
      // check if user is logged in and tries to go on /signin or /signup page
    } else if (user && !isLoading && !isProtectedRoute && isBlockedOnAuth) {
      push('/profile')
    }
  }, [user, isLoading, isBlockedOnAuth, isProtectedRoute, push])

  if (isLoading) {
    return (
      <Box w="100vw" h="100vh">
        <Center h="full">
          <Spinner />
        </Center>
      </Box>
    )
  }

  if (user && !isLoading && isProtectedRoute && !isBlockedOnAuth) {
    return <>{children}</>
  } else if (!user && !isLoading && !isProtectedRoute && isBlockedOnAuth) return <>{children}</>
  else
    return (
      <Box w="100vw" h="100vh">
        <Center h="full">
          <Spinner />
        </Center>
      </Box>
    )
}

export default ProtectedRoute
