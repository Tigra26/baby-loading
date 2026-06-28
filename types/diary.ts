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

export interface EmotionsProps {
  emotions: Emotion[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface Emotion {
  _id: string;
  title: string;
}

export interface DiaryFormValues {
  title: string;
  description: string;
  emotions: string[];
}

export interface DeleteDiaryResponse {
  _id: string;
}
