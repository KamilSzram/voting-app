import React, { useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { EmptyTableRow, FormDialog, TableHeading } from '..';
import { FormInput, Voter } from '../../model';
import { VotersTableItems } from './components';

const columns = ['Name', 'Has Voted'];

type VotersTableProps = {
  voters: Voter[];
  onAddItem: (data: FormInput) => void;
};

const VotersTable: React.FC<VotersTableProps> = ({ voters, onAddItem }) => {
  const [open, setOpen] = React.useState(false);

  const handleAddVoter = useCallback(
    (data: FormInput) => {
      onAddItem(data);
      setOpen(false);
    },
    [onAddItem],
  );

  return (
    <>
      <TableContainer sx={{ maxHeight: 440, overflowY: 'scroll' }} component={Paper}>
        <Table>
          <TableHeading title="Voters" columns={columns} onAddItemClicked={() => setOpen(true)} />
          <TableBody data-testid="votersTableBody">
            {voters.length === 0 ? <EmptyTableRow /> : <VotersTableItems voters={voters} />}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <FormDialog onClose={() => setOpen(false)} title="Add Voter" onSubmit={handleAddVoter} />}
    </>
  );
};

export default VotersTable;
