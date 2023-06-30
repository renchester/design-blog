'use client';

import './PaginatePosts.scss';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

type PaginateProps = {
  currentPage: number;
  pageCount: number;
};

function PaginatePosts(props: PaginateProps) {
  const { currentPage, pageCount } = props;
  const router = useRouter();

  const handlePageClick = (e: any) => {
    router.push(`/latest/${+e.selected + 1}`);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< prev"
      onPageChange={handlePageClick}
      renderOnZeroPageCount={null}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName="pgnt"
      pageClassName="pgnt__li"
      pageLinkClassName="pgnt__link"
      previousClassName="pgnt__btn pgnt__btn--prev"
      previousLinkClassName="pgnt__btn-link"
      nextClassName="pgnt__btn pgnt__btn--next"
      nextLinkClassName="pgnt__btn-link"
      activeClassName="active"
      activeLinkClassName="active"
      disabledClassName="disabled"
      disabledLinkClassName="disabled"
    />
  );
}
export default PaginatePosts;
