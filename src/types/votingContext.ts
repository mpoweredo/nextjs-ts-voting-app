import { ICreatorInitialValues } from 'src/components/votings/VotingCreator/VotingCreator.type'

interface IVotingContext {
  addVoting: (values: ICreatorInitialValues) => Promise<string | undefined>
}

export type { IVotingContext }
