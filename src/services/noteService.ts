import axios from "axios";
import type { Note } from "../types/note";
import type { NoteList } from "../components/Pagination/Pagination";

type CreateNote = Omit<Note, "id" | "updatedAt">;

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
  const { data } = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    options,
  );

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    options,
  );

  return data;
};
