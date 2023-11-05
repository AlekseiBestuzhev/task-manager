import { TaskType } from 'features/tasks-management/api/tasks.api.types';
import { Button, TextField, Typography } from '@mui/material';
import { Modal } from 'shared/components';
import React, { FC } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';
import { TaskStatuses } from 'shared/enums';

type Props = {
   onClose: () => void;
   open: boolean;
   task: TaskType;
};

type TaskForm = {
   title: string;
   status: TaskStatuses;
};

export const TaskModal: FC<Props> = ({ onClose, open, task }) => {
   const { handleSubmit, getFieldProps } = useFormik<TaskForm>({
      initialValues: {
         title: task.title,
         status: task.status,
      },
      onSubmit: () => {},
   });

   return (
      <Modal onClose={onClose} open={open} title={task.title}>
         <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__created">
               <span>Creted:</span> <span>{new Date(task.addedDate).toLocaleString()}</span>
            </div>
            <TextField label="Task title" {...getFieldProps('title')} />
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
                  <Select labelId="priority-select-label" id="priority-select" value={task.priority}>
                     <MenuItem value={10}>Ten</MenuItem>
                     <MenuItem value={20}>Twenty</MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
               </FormControl>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <div className="task-form__dates dates">
                     <DatePicker label="Start date" value={task.startDate} className="dates__start" />
                     <DatePicker label="Deadline" value={task.deadline} className="dates__deadline" />
                  </div>
               </DemoContainer>
            </LocalizationProvider>
            <TextField value={task.description} label="Description" multiline />
            <div className="task-form__buttons">
               <Button variant="contained" color="inherit" onClick={onClose}>
                  Cancel
               </Button>
               <Button variant="contained">Apply</Button>
            </div>
         </form>
      </Modal>
   );
};
