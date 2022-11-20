import { Button } from '@chakra-ui/react'
import { db } from 'data/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'
import { UserAuth } from 'store/AuthContext'
import { Collections } from 'types/firebase'
import { IVoting, IVotingAnswer } from 'types/votings'

interface Props {
  answer: IVotingAnswer
  votingId: string
  hasVoted: undefined | IVotingAnswer
  voteHandler: (selectedAnswer: IVotingAnswer) => void
}

const VotingButton = ({ answer, votingId, hasVoted, voteHandler }: Props) => {
  const { user } = UserAuth()

  const submitVote = async () => {
    voteHandler(answer)

    console.log(user!.name, 'zaglosowal na id: ', answer.id, 'title: ', answer.title)

    const docRef = await doc(collection(db, Collections.votes))
    await setDoc(docRef, {
      votingId,
      answerId: answer.id,
      userId: user?.uid,
    })
  }

  return (
    <Button disabled={!!hasVoted} onClick={submitVote} colorScheme="teal" key={answer.id}>
      {answer.title}
    </Button>
  )
}

export default VotingButton
