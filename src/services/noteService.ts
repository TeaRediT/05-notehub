import axios from "axios";
import type { NoteList } from "../types/note";

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
    `https://notehub-public.goit.study/api/notes?search=${query}&page=${page}&perPage=12&sortBy=created`,
    options,
  );
  console.log(data);

  return data;
};
