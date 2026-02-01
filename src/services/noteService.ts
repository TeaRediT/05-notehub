import axios from "axios";
import type { CreateNote, Note } from "../types/note";
import type { NoteList } from "../components/Pagination/Pagination";

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
};

export const fetchNotes = async (
  query: string,
  page: number,
): Promise<NoteList> => {
  const { data } = await axios.get<NoteList>(
    `https://notehub-public.goit.study/api/notes?${query === "" ? "" : `search=${query}&`}page=${page}&perPage=12&sortBy=created`,
    options,
  );
  console.log(data);

  return data;
};

export const postNote = async (note: CreateNote): Promise<CreateNote> => {
  await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    options,
  );

  return note;
};

export const deleteNote = async (note: Note): Promise<Note> => {
  await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${note.id}`,
    options,
  );

  return note;
};
