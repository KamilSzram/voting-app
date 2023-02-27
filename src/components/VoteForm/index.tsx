import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import { Candidate, VoteInput, Voter } from 'model';
import { voteValidationSchema } from './validation.shema';

type VoteFormProps = {
  voters: Voter[];
  candidates: Candidate[];
  onVote: (data: VoteInput) => void;
};

const VoteForm: React.FC<VoteFormProps> = ({ voters, candidates, onVote }) => {
  const { handleSubmit, control, reset, formState } = useForm<VoteInput>({
    resolver: yupResolver(voteValidationSchema),
    mode: 'onChange',
    defaultValues: {
      voterId: '',
      candidateId: '',
    },
  });

  const vote = useCallback(
    (data: VoteInput) => {
      onVote(data);
      reset();
    },
    [onVote, reset],
  );

  return (
    <form onSubmit={handleSubmit(vote)}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} m={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="voter-select-label">I am</InputLabel>
          <Controller
            name="voterId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="voter-select-label"
                label="I am"
                inputProps={{
                  'data-testid': 'voters-select',
                }}
              >
                <MenuItem value={''} sx={{ height: 36 }}></MenuItem>
                {voters.map(voter => (
                  <MenuItem key={voter.id} value={voter.id}>
                    {voter.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="candidate-select-label">I vote for</InputLabel>
          <Controller
            name="candidateId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="I vote for"
                inputProps={{
                  'data-testid': 'candidates-select',
                }}
                labelId="candidate-select-label"
              >
                <MenuItem value={''} sx={{ height: 36 }}></MenuItem>
                {candidates.map(candidate => (
                  <MenuItem key={candidate.id} value={candidate.id}>
                    {candidate.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" disabled={!formState.isValid}>
          Vote!
        </Button>
      </Stack>
    </form>
  );
};

export default VoteForm;
