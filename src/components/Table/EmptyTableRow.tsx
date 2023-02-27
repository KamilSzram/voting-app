import React from 'react';
import { TableCell, TableRow } from '@mui/material';

import { NO_DATA_MESSAGE } from 'const';

const EmptyTableRow: React.FC = () => (
  <TableRow>
    <TableCell colSpan={2} align="center">
      {NO_DATA_MESSAGE}
    </TableCell>
  </TableRow>
);

export default EmptyTableRow;
