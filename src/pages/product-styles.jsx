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
import CategoryForm from 'components/organisms/CategoryForm';
import categoryService from 'services/blogCategoryService';
import productStyleService from 'services/ProductStylesService';
import ProductStyles from 'components/organisms/Product/ProductStyles';

export default function ProductStylesPage() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);

  const { product_styles_data, product_styles_loading } = productStyleService.GetProductStyles(searchQuery, refetch);

  const onDeleteCategory = async id => {
    try {
      await productStyleService.deleteStyle(id);
      refetch();
      Toast({
        message: 'Style deleted successfully',
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
      {hasPermission('product-style.edit') && (
        <ModalContainer
          lg
          title="Edit Style"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <ProductStyles onClose={onClose} category={_} />}
        />
      )}
      {hasPermission('product-style.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteCategory(_._id)}
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
      category_rows: product_styles_data?.styles?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd'),
        _.title,
        actionBtns(_),
      ]),
      totalCount: product_styles_data?.totalItems,
    }),
    [product_styles_data],
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
      <Table
        width={1200}
        loading={product_styles_loading}
        rowsData={category_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
