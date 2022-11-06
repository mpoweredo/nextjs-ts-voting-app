import { db } from 'data/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Collections } from 'types/firebase'
import { IVote, IVotes, Vote } from 'types/votes'

export const getVotesList = async (votingId: string) => {
	const votes: IVotes = []

	const votesRef = collection(db, Collections.votes)
	const query_ = query(votesRef, where(Vote.votingId, '==', votingId))
	const votesSnapshot = await getDocs(query_)

	votesSnapshot.forEach(doc => votes.push({ ...doc.data() } as IVote))

	return votes
}
