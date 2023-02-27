export interface Voter {
  id: number;
  name: string;
  hasVoted: boolean;
}

export interface Candidate {
  id: number;
  name: string;
  votes: number;
}

export interface FormInput {
  name: string;
}

export interface VoteInput {
  candidateId: number | string;
  voterId: number | string;
}
