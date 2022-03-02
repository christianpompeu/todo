export interface HeaderProps {
  tasksCounter: number;
}

export type EditTaskArgs = {
  taskId: number;
  newTaskTitle: string;
};

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, newTaskTitle }: EditTaskArgs) => void;
}

export interface TaskItemProps{
  task: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, newTaskTitle }: EditTaskArgs) => void;
}