import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { db } from 'data/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import VotingButton from 'src/components/votings/VotingButton'
import { Collections } from 'types/firebase'
import { IVoting, IVotingAnswer } from 'types/votings'
import { getVoteData, getVotesList } from 'src/utils/firestore'
import { IVotes } from 'types/votes'
import { UserAuth } from 'store/AuthContext'

interface Props {
  votingData?: IVoting
  votesList: IVotes
}

const VotingPage = ({ votingData, votesList = [] }: Props) => {
  const { user } = UserAuth()
  const [vote, setVote] = useState<undefined | IVotingAnswer>(getVoteData(votingData, votesList, user!))

  const voteHandler = (selectedAnswer: IVotingAnswer) => {
    setVote(selectedAnswer)
  }

  if (!!!votingData?.id)
    return (
      <Center h="full" flex={1}>
        <Heading as="h6" fontSize={'xl'} color="red.300">
          Voting doesn&apos;t exists!
        </Heading>
      </Center>
    )

  return (
    <VStack flex={1} h="full">
      <Heading as="h6" fontSize={'3xl'} fontWeight="medium">
        {votingData.title}
      </Heading>
      <Center flex={1} h="full" w="full" gap={5} flexDir={'column'}>
        {!!vote && (
          <Text fontSize={'2xl'} fontWeight={'medium'}>
            Selected answer{' '}
            <Text as="span" color="teal.300">
              {vote?.title}
            </Text>
          </Text>
        )}
        <Flex gap={5}>
          <>
            {votingData.answers.map(answer => (
              <VotingButton
                voteHandler={voteHandler}
                hasVoted={vote}
                key={answer.id}
                votingId={votingData.id}
                answer={answer}
              />
            ))}
          </>
        </Flex>
      </Center>
    </VStack>
  )
}

export default VotingPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context

  const votingRef = doc(db, Collections.votings, query.votingId as string)
  const votingSnap = await getDoc(votingRef)

  if (votingSnap.exists()) {
    const votingData = { id: query.votingId, ...votingSnap.data() } as IVoting

    const votesList = await getVotesList(votingData.id)

    return {
      props: { votingData, votesList },
    }
  } else {
    return {
      props: {},
    }
  }
}
