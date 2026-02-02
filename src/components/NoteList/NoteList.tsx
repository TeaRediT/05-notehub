import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import toast, { Toaster } from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast("Something went wrong");
    },
  });

  const handleDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                onClick={() => handleDelete(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Toaster></Toaster>
    </>
  );
};

export default NoteList;
