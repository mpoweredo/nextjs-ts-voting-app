import { Center, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import UserDropdown from '../user/UserDropdown'

const Header = () => {
  return (
    <Center as="header" width="full" mt={[0, 3]}>
      <HStack bg="gray.700" maxW={['full', 450, 700]} h="56px" w="full" rounded={[0, 'lg']} px={3}>
        <Text fontWeight="bold">Let&lsquo;s vote</Text>
        <Spacer />
        <UserDropdown />
      </HStack>
    </Center>
  )
}

export default Header
