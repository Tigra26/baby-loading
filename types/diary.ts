export interface DiaryProps {
  Task: [];
  totalCount: 23;
  totalPages: 3;
  page: 1;
}

export interface Task {
  _id: string;
  title: string;
  date: string;
  Emotion: [];
  description: string;
}

export interface Emotion {
  _id: string;
  title: string;
}
