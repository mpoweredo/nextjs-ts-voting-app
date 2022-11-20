import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { IVoting } from 'types/votings'

interface Props {
  voting: IVoting
}

const VotingItem = ({ voting }: Props) => {
  return (
    <Link href={`/votings/${voting.id}`}>
      <Box
        p={4}
        rounded={'md'}
        h={190}
        minWidth={175}
        width={'full'}
        bg="gray.600"
        _hover={{ bg: 'gray.500' }}
        cursor={'pointer'}
      >
        {voting.title}
      </Box>
    </Link>
  )
}

export default VotingItem
