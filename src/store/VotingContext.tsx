import { createContext, PropsWithChildren, useContext } from 'react'
import { Collections } from 'types/firebase'
import { IVotingContext } from 'types/votingContext'
import { INewVoting } from 'types/votings'
import { db } from 'data/firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore'
import { UserAuth } from './AuthContext'
import { ICreatorInitialValues } from 'src/components/votings/VotingCreator/VotingCreator.type'

const VotingContext = createContext<IVotingContext | false>(false)

export const VotingContextProvider = ({ children }: PropsWithChildren) => {
  const { user } = UserAuth()

  const addVoting = async ({ title, answers }: ICreatorInitialValues) => {
    try {
      if (title.length <= 2 || answers.some(({ title }) => title.length < 1) || answers.length <= 1)
        throw new Error('Invalid data!')

      const voting: INewVoting = {
        title,
        answers,
        creatorId: user!.uid,
      }

      const docRef = await doc(collection(db, Collections.votings))
      await setDoc(docRef, voting)
      return 'Voting has been sucessfully created!'
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.message === 'Invalid data!') throw new Error(e.message)
        else throw new Error('Something went wrong!')
      }
    }
  }

  return <VotingContext.Provider value={{ addVoting }}>{children}</VotingContext.Provider>
}

export const Voting = () => {
  return useContext(VotingContext) as IVotingContext
}
