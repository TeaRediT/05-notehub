import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type { NoteList } from "../../types/note";
import type { Dispatch, SetStateAction } from "react";

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
