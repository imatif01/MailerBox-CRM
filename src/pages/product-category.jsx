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
import productCategoryService from 'services/productCategoryService';
import ProductCategory from 'components/organisms/Product/ProductCategory';

export default function ProductCategoryPage() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);

  const { product_categories_data, product_categories_loading } = productCategoryService.GetProductCategories(
    searchQuery,
    refetch,
  );
  console.log(product_categories_data);
  const onDeleteCategory = async id => {
    try {
      await productCategoryService.deleteCategory(id);
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
      {hasPermission('product-category.edit') && (
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
          content={({ onClose }) => <ProductCategory onClose={onClose} category={_} />}
        />
      )}
      {hasPermission('product-category.delete') && (
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
      category_rows: product_categories_data?.categories?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd'),
        _.title,
        actionBtns(_),
      ]),
      totalCount: product_categories_data?.totalItems,
    }),
    [product_categories_data],
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
        loading={product_categories_loading}
        rowsData={category_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
