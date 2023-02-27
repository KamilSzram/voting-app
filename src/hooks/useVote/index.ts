import { useCallback } from 'react';

import { Candidate, FormInput, VoteInput, Voter } from 'model';
import useLocalStorage from '../useLocalStorage';

const useVote = () => {
  const [voters, setVoters] = useLocalStorage<Voter[]>('voters', []);
  const [candidates, setCandidates] = useLocalStorage<Candidate[]>('candidates', []);

  const addVoter = useCallback(
    (voter: FormInput) => {
      setVoters([...voters, { id: voters.length + 1, name: voter.name, hasVoted: false }]);
    },
    [voters, setVoters],
  );

  const addCandidate = useCallback(
    (candidate: FormInput) => {
      setCandidates([...candidates, { id: candidates.length + 1, name: candidate.name, votes: 0 }]);
    },
    [candidates, setCandidates],
  );

  const vote = useCallback(
    (data: VoteInput) => {
      const updatedCandidates = candidates.map(x => (x.id === Number(data.candidateId) ? { ...x, votes: x.votes + 1 } : x));
      const updatedVoters = voters.map(x => (x.id === Number(data.voterId) ? { ...x, hasVoted: true } : x));

      setCandidates(updatedCandidates);
      setVoters(updatedVoters);
    },
    [voters, candidates, setCandidates, setVoters],
  );

  return {
    voters,
    candidates,
    addVoter,
    addCandidate,
    vote,
  };
};

export default useVote;
