import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type { Note } from "../../types/note";
import type { Dispatch, SetStateAction } from "react";

export interface NoteList {
  notes: Note[];
  totalPages: number;
}

interface PagintaionProps {
  data: NoteList;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ data, page, setPage }: PagintaionProps) => {
  return (
    <ReactPaginate
      pageCount={data.totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
