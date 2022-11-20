import useFetch from 'hooks/useFetch'
import { useEffect, useCallback } from 'react'
import { db } from 'data/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IVoting, Voting } from 'types/votings'
import { UserAuth } from 'store/AuthContext'
import { Collections } from 'types/firebase'

const useVotingList = () => {
  const { user } = UserAuth()
  const { fetchData, isLoading, data, error } = useFetch<IVoting[]>()

  const fetchVotingData = useCallback(async () => {
    const votings: IVoting[] = []

    const votingsRef = collection(db, Collections.votings)
    const query_ = query(votingsRef, where(Voting.creatorId, '==', user?.uid))
    const querySnapshot = await getDocs(query_)

    querySnapshot.forEach(doc => votings.push({ id: doc.id, ...doc.data() } as IVoting))

    return votings
  }, [user])

  useEffect(() => {
    fetchData(fetchVotingData)
  }, [fetchData, fetchVotingData])

  return { isLoading, data, error }
}

export default useVotingList