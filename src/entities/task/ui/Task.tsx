import { selectTodolistRemoving } from 'features/todolists-management/model/todolists.selectors';
import { tasksThunks } from 'features/tasks-management/model/tasks.slice';
import { TaskType, UpdateDomainTaskModelType } from 'features/tasks-management/api/tasks.api.types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import React, { ChangeEvent, FC, memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { TaskStatuses } from 'shared/enums';
import { useActions, useAppDispatch } from 'shared/hooks';
import { useSelector } from 'react-redux';
import { TaskModal } from 'widgets/task-modal';
import { handleServerNetworkError } from 'shared/utils';

type Props = {
   task: TaskType;
   todolistId: string;
};

export const Task: FC<Props> = memo(({ task, todolistId }) => {
   const dispatch = useAppDispatch();

   const loadingList = useSelector(selectTodolistRemoving(todolistId));

   const { removeTask, updateTask } = useActions(tasksThunks);

   const [open, setOpen] = useState(false);

   const removeTaskHandler = () => {
      removeTask({ taskId: task.id, todolistId });
   };

   const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
      updateTask({ taskId: task.id, domainModel: { status }, todolistId });
   };

   const disabledTerms = loadingList || task.loading;

   const taskDone = task.status === TaskStatuses.Completed;

   const onSubmit = async (values: UpdateDomainTaskModelType) => {
      try {
         await updateTask({ taskId: task.id, domainModel: values, todolistId }).unwrap();
         setOpen(false);
      } catch (error) {
         handleServerNetworkError(error, dispatch);
      }
   };

   return (
      <div className="task">
         <TaskModal open={open} onClose={() => setOpen(false)} task={task} onSubmit={onSubmit} />
         <Checkbox checked={taskDone} color="primary" onChange={changeStatusHandler} disabled={disabledTerms} />
         <div className="task-with-icon">
            <p className="editable-span" onClick={() => setOpen(true)}>
               {task.title}
            </p>
            <IconButton onClick={removeTaskHandler} disabled={disabledTerms}>
               <RemoveCircleIcon style={{ opacity: '0.4' }} />
            </IconButton>
         </div>
      </div>
   );
});
