import { TaskResponseType, TaskType, UpdateDomainTaskModelType } from 'features/tasks-management/api/tasks.api.types';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';

type TaskForm = Pick<TaskResponseType, 'title' | 'status' | 'priority' | 'description'> & {
   startDate: Dayjs | null;
   deadline: Dayjs | null;
};

type FormikErrorType = Partial<Pick<TaskForm, 'title'>>;

export const useTask = (task: TaskType, onSubmit: (values: UpdateDomainTaskModelType) => void) => {
   return useFormik<TaskForm>({
      initialValues: {
         title: task.title,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate ? dayjs(new Date(task.startDate)) : null,
         deadline: task.deadline ? dayjs(new Date(task.deadline)) : null,
         description: task.description ?? '',
      },
      validate: (values) => {
         const errors: FormikErrorType = {};
         if (!values.title.length) {
            errors.title = 'Field is required';
         }
         return errors;
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

         onSubmit(toUpdate);
      },
   });
};
