import React from 'react';
import { IconButton, Stack, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';

type TableHeadingProps = {
  title: string;
  columns: string[];
  onAddItemClicked: () => void;
};

const TableHeading: React.FC<TableHeadingProps> = ({ title, columns, onAddItemClicked }) => (
  <TableHead>
    <TableRow>
      <TableCell align="center" colSpan={2}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="body1" sx={{ flex: 2 }}>
            {title}
          </Typography>
          <IconButton aria-label="add" onClick={onAddItemClicked} size="small" color="success">
            <AddCircleOutlineRounded />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
    <TableRow>
      {columns.map(column => (
        <TableCell key={column} align="center">
          {column}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeading;
