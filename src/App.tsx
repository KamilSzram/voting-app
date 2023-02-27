import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CandidatesTable, VotersTable } from './components';
import VoteForm from './components/VoteForm';
import { useVote } from './hooks';

function App() {
  const { voters, candidates, addVoter, addCandidate, vote } = useVote();

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" mt={2}>
        Voting App
      </Typography>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} padding={2}>
        <VotersTable voters={voters} onAddItem={addVoter} />
        <CandidatesTable candidates={candidates} onAddItem={addCandidate} />
      </Stack>
      <Box>
        <Typography variant="h4" m={2}>
          Vote
        </Typography>
        <VoteForm candidates={candidates} voters={voters.filter(voter => !voter.hasVoted)} onVote={vote} />
      </Box>
    </Box>
  );
}

export default App;
