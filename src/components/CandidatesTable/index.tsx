import React, { useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';

import { EmptyTableRow, FormDialog, TableHeading } from 'components';
import { Candidate, FormInput } from 'model';
import { CandidatesTableItems } from './components';

const columns = ['Name', 'Votes'];

type CandidatesTableProps = {
  candidates: Candidate[];
  onAddItem: (candidate: FormInput) => void;
};

const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, onAddItem }) => {
  const [open, setOpen] = React.useState(false);

  const handleAddCandidate = useCallback(
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
          <TableHeading title="Candidates" columns={columns} onAddItemClicked={() => setOpen(true)} />
          <TableBody data-testid="candidatesTableBody">
            {candidates.length === 0 ? <EmptyTableRow /> : <CandidatesTableItems candidates={candidates} />}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <FormDialog onClose={() => setOpen(false)} title="Add Candidate" onSubmit={handleAddCandidate} />}
    </>
  );
};

export default CandidatesTable;
