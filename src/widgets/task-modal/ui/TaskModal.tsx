import { TaskType, UpdateDomainTaskModelType } from 'features/tasks-management/api/tasks.api.types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Modal } from 'shared/components';
import { useTask } from '../lib/useTask';
import React, { FC } from 'react';
import dayjs from 'dayjs';

type Props = {
   onClose: () => void;
   open: boolean;
   task: TaskType;
   onSubmit: (values: UpdateDomainTaskModelType) => void;
};

export const TaskModal: FC<Props> = ({ onClose, open, task, onSubmit }) => {
   const { handleSubmit, getFieldProps, setFieldValue, touched, errors } = useTask(task, onSubmit);

   const titleError = !!(touched.title && errors.title);
   const titleLabel = titleError ? errors.title : 'Task title';

   return (
      <Modal onClose={onClose} open={open} title={task.title}>
         <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__created">
               <span>Creted:</span> <span>{new Date(task.addedDate).toLocaleString()}</span>
            </div>
            <TextField label={titleLabel} error={titleError} {...getFieldProps('title')} />
            <div className="task-form__select-group select-group">
               <FormControl className="select-group__select select">
                  <InputLabel id="demo-simple-select-label" className="select__label">
                     Status
                  </InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" {...getFieldProps('status')}>
                     <MenuItem value={0}>New</MenuItem>
                     <MenuItem value={1}>In Progress</MenuItem>
                     <MenuItem value={2}>Completed</MenuItem>
                     <MenuItem value={3}>Draft</MenuItem>
                  </Select>
               </FormControl>
               <FormControl className="select-group__select select">
                  <InputLabel id="priority-select-label" className="select__label">
                     Priority
                  </InputLabel>
                  <Select labelId="priority-select-label" id="priority-select" {...getFieldProps('priority')}>
                     <MenuItem value={0}>Low</MenuItem>
                     <MenuItem value={1}>Middle</MenuItem>
                     <MenuItem value={2}>Hight</MenuItem>
                     <MenuItem value={3}>Urgently</MenuItem>
                     <MenuItem value={4}>Later</MenuItem>
                  </Select>
               </FormControl>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <div className="task-form__dates dates">
                     <DatePicker
                        label="Start date"
                        className="dates__start"
                        {...getFieldProps('startDate')}
                        onChange={(value) => {
                           setFieldValue('startDate', dayjs(new Date(value)));
                        }}
                     />
                     <DatePicker
                        label="Deadline"
                        className="dates__deadline"
                        {...getFieldProps('deadline')}
                        onChange={(value) => {
                           setFieldValue('deadline', dayjs(new Date(value)));
                        }}
                     />
                  </div>
               </DemoContainer>
            </LocalizationProvider>
            <TextField label="Description" multiline {...getFieldProps('description')} />
            <div className="task-form__buttons">
               <Button variant="contained" color="inherit" onClick={onClose}>
                  Cancel
               </Button>
               <Button variant="contained" type="submit">
                  Apply
               </Button>
            </div>
         </form>
      </Modal>
   );
};
