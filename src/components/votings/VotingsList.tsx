import { Center, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import useVotingList from './useVotingList'
import VotingItem from './VotingItem'

const VotingsList = () => {
  const { data: votings, isLoading, error } = useVotingList()

  console.log(votings)

  if (error)
    return (
      <Center h="full" flex={1}>
        <Text fontSize={'xl'} color="red.300">
          Something went wrong while getting votings data!
        </Text>
      </Center>
    )

  if (votings?.length === 0)
    return (
      <Center h="full" flex={1}>
        <Text fontSize={'xl'} color="gray.300">
          There is any votings yet
        </Text>
      </Center>
    )

  return (
    <>
      {isLoading && !!!error ? (
        <Center flex={1}>
          <Spinner />
        </Center>
      ) : (
        <SimpleGrid spacing={5} columns={[1, 2, 3, 4]}>
          {votings?.map(voting => (
            <VotingItem voting={voting} key={voting.id} />
          ))}
        </SimpleGrid>
      )}
    </>
  )
}

export default VotingsList
