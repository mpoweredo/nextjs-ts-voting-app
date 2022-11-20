import { db } from 'data/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IUser } from 'types/auth'
import { Collections } from 'types/firebase'
import { IVote, IVotes, Vote } from 'types/votes'
import { IVoting, IVotingAnswer } from 'types/votings'

export const getVotesList = async (votingId: string) => {
	const votes: IVotes = []

	const votesRef = collection(db, Collections.votes)
	const query_ = query(votesRef, where(Vote.votingId, '==', votingId))
	const votesSnapshot = await getDocs(query_)

	votesSnapshot.forEach(doc => votes.push({ ...doc.data() } as IVote))

	return votes
}

export const getVoteData = (votingData: IVoting | undefined, votes: IVotes, user: IUser): IVotingAnswer | undefined => {
	return votingData?.answers.find(item => item.id === votes.find(vote => vote.userId === user?.uid)?.answerId)
}