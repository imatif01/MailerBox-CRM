import React, { useState } from 'react';
import Pagination from '../../molecules/Pagination';
import TableHeader from '../TableHeader';
import Filters from '../../../common/filters';
import { StyledTableLayout } from './TableLayout.styles';

function TableLayout({
  children,
  currentPage = 1,
  pageSize = 10,
  totalCount = 0,
  onChangeFilters,
  customFilterKey = '',
  exportBtn,
  createBtn,
  extraFilters,
  filters = true,
  nonegativemargin,
  onOptionClick,
  title,
}) {
  const [filterState, setFilterState] = useState('');
  return (
    <>
      {filters && (
        <Filters
          onChangeFilters={_ => {
            onChangeFilters({ ..._, page: 1 });
            setFilterState(_);
          }}
          customFilterKey={customFilterKey}
          extraFilters={extraFilters}
          onOptionClick={onOptionClick}
        />
      )}
      <StyledTableLayout nonegativemargin={nonegativemargin}>
        {title && <h2 className="table-title">{title}</h2>}

        <TableHeader
          title={title}
          total={totalCount}
          page={currentPage}
          resultPerPage={pageSize}
          setPageSize={_ => onChangeFilters({ pageSize: _, page: 1 })}
          exportBtn={exportBtn}
          createBtn={createBtn}
        />
        {children}
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={_ => onChangeFilters({ filter: filterState.filter, page: _ })}
        />
      </StyledTableLayout>
    </>
  );
}

export default TableLayout;
