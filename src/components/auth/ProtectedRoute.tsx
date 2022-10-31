import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import { authRequired, blockedOnAuth } from 'data/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserAuth } from 'store/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = UserAuth()
  const { pathname, push } = useRouter()

  const isProtectedRoute = authRequired.includes(pathname)
  const isBlockedOnAuth = blockedOnAuth.includes(pathname)

  useEffect(() => {
    if (!(!!user) && !isLoading && isProtectedRoute) {
      push('/signin')
    } else if (!!user && !isLoading && !isProtectedRoute && isBlockedOnAuth) {
      push('/profile')
    }
  }, [pathname, user, isLoading, push, isProtectedRoute, isBlockedOnAuth])

  return (
    <>
      {isLoading ? (
        <Box w="100vw" h="100vh">
          <Center h="full">
            <Spinner />
          </Center>
        </Box>
      ) : (
        children
      )}
    </>
  )
}

export default ProtectedRoute
