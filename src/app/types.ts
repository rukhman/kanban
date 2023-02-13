export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
}

export interface TaskLists {
  new: Task[];
  process: Task[];
  done: Task[];
}

export type Status = 'new' | 'process' | 'done';
export type Mode = 'create' | 'edit' | 'watch';

export interface TransferFormData {
  mode: Mode;
  task: Task;
}

export interface WorkerMessage {
  method: 'get' | 'post';
  data?: TaskLists;
}
