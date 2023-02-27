import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { Voter } from 'model';

type VotersTableItemsProps = {
  voters: Voter[];
};
const VotersTableItems: React.FC<VotersTableItemsProps> = ({ voters }) => (
  <>
    {voters.map(({ id, name, hasVoted }) => (
      <TableRow key={id} sx={{ padding: 20 }}>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">
          {hasVoted ? <CheckIcon titleAccess="yes" color="success" /> : <CloseIcon titleAccess="no" color="error" />}
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default VotersTableItems;
