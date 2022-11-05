import { Container, Stack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxW={'container.lg'} minHeight="100vh" pt={88} display="flex" flexDir="column">
      <Stack bg="blackAlpha.300" p={4} w="full" flex={1} mb={3} rounded="md">
        {children}
      </Stack>
    </Container>
  )
}

export default AppLayout
