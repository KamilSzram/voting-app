import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { FormInput } from 'model';
import { addItemSchema } from './validation.schema';

type FormDialogProps = {
  onClose: () => void;
  onSubmit: (data: FormInput) => void;
  title: string;
};

const FormDialog: React.FC<FormDialogProps> = ({ onClose, onSubmit, title }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormInput>({
    mode: 'onChange',
    resolver: yupResolver(addItemSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <Dialog aria-labelledby="modal-title" open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle id="modal-title">{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                error={!!error}
                id="name"
                variant="standard"
                helperText={error ? error.message : null}
                inputProps={{
                  'aria-errormessage': 'name-helper-text',
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!isValid} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog;
