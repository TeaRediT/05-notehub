import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

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
        {isLoading && <Loader></Loader>}
        {isError && <ErrorMessage></ErrorMessage>}
        {data && data.notes.length > 0 && (
          <NoteList notes={data.notes}></NoteList>
        )}
        {isModal && (
          <Modal children={<NoteForm onClose={handleClose}></NoteForm>}></Modal>
        )}
      </div>
    </>
  );
}

export default App;
