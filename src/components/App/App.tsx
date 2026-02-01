import css from "./App.module.css";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteNote, fetchNotes, postNote } from "../../services/noteService";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import type { CreateNote } from "../../types/note";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const queryClient = useQueryClient();

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const addMutation = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setPage(1);
    },
  });

  const handleSubmit = (note: CreateNote): void => {
    addMutation.mutate(note);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setPage(1);
    },
  });

  const handleDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };

  const handleClick = (): void => {
    setIsModal(true);
  };

  const handleClose = (): void => {
    setIsModal(false);
  };

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(e.target.value);
    },
    300,
  );

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox query={query} updateQuery={updateQuery}></SearchBox>
          {data && data.totalPages > 1 && (
            <Pagination data={data} page={page} setPage={setPage}></Pagination>
          )}
          {
            <button className={css.button} onClick={handleClick}>
              Create note +
            </button>
          }
        </header>
        {(isLoading || addMutation.isPending || deleteMutation.isPending) && (
          <Loader></Loader>
        )}
        {(isError || addMutation.isError || deleteMutation.isError) && (
          <ErrorMessage></ErrorMessage>
        )}
        {data && data.notes.length > 0 && (
          <NoteList onDelete={handleDelete} notes={data.notes}></NoteList>
        )}
        {isModal && (
          <Modal
            children={
              <NoteForm
                onSubmit={handleSubmit}
                onClose={handleClose}
              ></NoteForm>
            }
          ></Modal>
        )}
      </div>
    </>
  );
}

export default App;
