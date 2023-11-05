import { TaskResponseType, TaskType, UpdateDomainTaskModelType } from 'features/tasks-management/api/tasks.api.types';
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
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import { useActions } from 'shared/hooks';
import { tasksThunks } from 'features/tasks-management/model/tasks.slice';
import dayjs from 'dayjs';

type Props = {
   onClose: () => void;
   open: boolean;
   task: TaskType;
};

type TaskForm = Pick<TaskResponseType, 'title' | 'status' | 'priority' | 'description'> & {
   startDate: any;
   deadline: any;
};

export const TaskModal: FC<Props> = ({ onClose, open, task }) => {
   const { updateTask } = useActions(tasksThunks);

   const { handleSubmit, getFieldProps, setFieldValue } = useFormik<TaskForm>({
      initialValues: {
         title: task.title,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate ? dayjs(new Date(task.startDate)) : null,
         deadline: task.deadline ? dayjs(new Date(task.deadline)) : null,
         description: task.description ?? '',
      },
      onSubmit: (values) => {
         const toUpdate: UpdateDomainTaskModelType = {
            title: values.title,
            status: values.status,
            priority: values.priority,
            startDate: values.startDate?.toISOString(),
            deadline: values.deadline?.toISOString(),
            description: values.description,
         };
         console.log(toUpdate);

         updateTask({ taskId: task.id, domainModel: toUpdate, todolistId: task.todoListId });
      },
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
