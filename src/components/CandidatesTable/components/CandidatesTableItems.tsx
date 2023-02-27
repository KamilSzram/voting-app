import React from 'react';
import { TableCell, TableRow } from '@mui/material';

import { Candidate } from 'model';

type CandidatesTableItemsProps = {
  candidates: Candidate[];
};

const CandidatesTableItems: React.FC<CandidatesTableItemsProps> = ({ candidates }) => (
  <>
    {candidates.map(({ id, name, votes }) => (
      <TableRow key={id} sx={{ padding: 20 }}>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{votes}</TableCell>
      </TableRow>
    ))}
  </>
);

export default CandidatesTableItems;
