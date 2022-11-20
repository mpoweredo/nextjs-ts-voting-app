export interface IVote {
  answerId: string
  userId: string
  votingId: string
}

export interface IVotes extends Array<IVote> {}

export enum Vote {
  answerId = 'answerId',
  userId = 'userId',
  votingId = 'votingId',
}
