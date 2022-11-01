import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import useAuth from 'hooks/useAuth'
import { MdLogout, MdSettings, MdMenu } from 'react-icons/md'

const itemStyles = {
  _hover: { bg: 'gray.500' },
  _focus: { bg: 'gray.500' },
}

const UserDropdown = () => {
  const { signOut } = useAuth()

  return (
    <Menu>
      <MenuButton
        bg="gray.600"
        _active={{ bg: 'gray.500', border: '1px solid #A0AEC0' }}
        _hover={{ bg: 'gray.500' }}
        as={IconButton}
        aria-label="Options"
        icon={<MdMenu size="21" color="#E2E8F0" />}
      />
      <MenuList fontSize={['lg', '1.125rem']} bg="gray.600" borderColor="gray.500">
        <MenuItem {...itemStyles} icon={<MdSettings />}>
          Settings
        </MenuItem>
        <MenuItem onClick={signOut} {...itemStyles} icon={<MdLogout />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserDropdown
