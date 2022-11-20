export enum Voting {
  answers = 'answers',
  title = 'title',
  creatorId = 'creatorId',
}

export interface IVotingAnswer {
  id: string
  title: string
}

export interface IVoting {
  answers: IVotingAnswer[]
  creatorId: string
  title: string
  id: string
}

export interface INewVoting {
  answers: IVotingAnswer[]
  creatorId: string
  title: string
}