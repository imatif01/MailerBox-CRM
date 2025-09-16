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
import categoryService from 'services/blogCategoryService';
import CategoryForm from 'components/organisms/CategoryForm';

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);

  const { category_data, category_loading } = categoryService.GetCategories(searchQuery, refetch);

  const onDeleteCategory = async id => {
    try {
      await categoryService.deleteCategory(id);
      refetch();
      Toast({
        message: 'Category deleted successfully',
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
          title="Edit Category"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <CategoryForm onClose={onClose} category={_} />}
        />
      )}
      {hasPermission('post.create') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteCategory(_.id)}
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
  const { totalCount, category_rows } = useMemo(
    () => ({
      category_rows: category_data?.categories?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd'),
        _.categoryTitle,
        actionBtns(_),
      ]),
      totalCount: category_data?.totalItems,
    }),
    [category_data],
  );
  const columnNames = [`Created at`, `Title`, ``];

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
      <Table width={1200} loading={category_loading} rowsData={category_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
