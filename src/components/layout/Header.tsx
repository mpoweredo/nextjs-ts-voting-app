import { Button, Center, HStack, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import UserDropdown from '../user/UserDropdown'

const Header = () => {
  const { push, pathname } = useRouter()

  const isOnAddVotingPage = pathname === '/votings/add-voting'

  return (
    <Center zIndex={'999'} as="header" width="full" mt={[0, 3]} position="fixed">
      <HStack bg="gray.700" maxW={['full', 450, 700]} h="56px" w="full" rounded={[0, 'lg']} px={3}>
        <Button disabled={isOnAddVotingPage} colorScheme="teal" onClick={() => push('/votings/add-voting')}>
          Create voting
        </Button>
        <Spacer />
        <UserDropdown />
      </HStack>
    </Center>
  )
}

export default Header
