export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export interface NoteList {
  notes: Note[];
  totalPages: number;
}

export type CreateNote = Omit<Note, "id">;
