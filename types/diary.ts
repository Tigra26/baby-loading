export interface DiaryProps {
  diaryNotes: Note[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface Note {
  _id: string;
  title: string;
  date: string;
  emotions: Emotion[];
  description: string;
}

export interface Emotion {
  _id: string;
  title: string;
}
