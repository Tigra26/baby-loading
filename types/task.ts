export interface Tasks {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}
