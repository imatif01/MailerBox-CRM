import React, { useState, useContext, useMemo } from 'react';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';
import { AuthContext } from 'context/authContext';
import { format } from 'date-fns';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import Toast from 'components/molecules/Toast';
import authorService from 'services/blogAuthorService';
import AuthorForm from 'components/organisms/AuthorForm';

export default function AuthorPage() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    getAll: false,
  });
  const { refetch, hasPermission } = useContext(AuthContext);

  const { authors_data, author_loading } = authorService.GetAuthors(searchQuery, refetch);

  const onDeleteAuthor = async id => {
    try {
      await authorService.deleteAuthor(id);
      refetch();
      Toast({
        message: 'Author deleted successfully',
        type: 'success',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex.message,
      });
    }
  };
  const actionBtns = _ => (
    <ActionBtnHolder numOfBtns={2}>
      {hasPermission('post.create') && (
        <ModalContainer
          lg
          title="Edit Author"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <AuthorForm onClose={onClose} author={_} />}
        />
      )}
      {hasPermission('post.create') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteAuthor(_.id)}
          btnComponent={({ onClick }) => (
            <Tooltip title="Delete" type="dark">
              <Button unStyled size={20} className="delete-btn" onClick={onClick}>
                <i className="material-icons-outlined">delete_forever</i>
              </Button>
            </Tooltip>
          )}
        />
      )}
    </ActionBtnHolder>
  );
  const { totalCount, authors_rows } = useMemo(
    () => ({
      authors_rows: authors_data?.authors?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.name,
        _.email,
        actionBtns(_),
      ]),
      totalCount: authors_data.totalItems,
    }),
    [authors_data],
  );
  const columnNames = [`Created at`, `Title`, `Email`, ``];

  return (
    <TableLayout
      exportBtn={undefined}
      onChangeFilters={filters => {
        setSearchQuery(_ => ({
          ..._,
          ...filters,
        }));
      }}
      currentPage={searchQuery.page}
      totalCount={totalCount}
      itemsPerPage={searchQuery.itemsPerPage}>
      <Table width={1200} loading={author_loading} rowsData={authors_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
