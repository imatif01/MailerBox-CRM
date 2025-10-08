import React from 'react';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';
import blogService from 'services/blogService';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import BlogForm from 'components/organisms/BlogForm';
import Toast from 'components/molecules/Toast';
import BlogDetailModal from 'components/organisms/BlogDetailModal';
import AddNewLanguageBlogForm from 'components/organisms/addNewBlogLanguage';
import productService from 'services/ProductService';
import CreateProduct from 'components/organisms/Product/CreateProduct';

export default function Product() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
    filterCategory: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);

  const { products_data, products_loading } = productService.GetAllProducts(searchQuery, refetch);

  const onDeleteProduct = async id => {
    try {
      await productService.deleteProduct(id);
      refetch();
      Toast({
        message: 'Post deleted successfully',
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
    <ActionBtnHolder numOfBtns={4}>
      {hasPermission('blogs.update') && (
        <ModalContainer
          lg
          title="Edit Post"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <CreateProduct onClose={onClose} isEdit={true} productData={_} />}
        />
      )}
      {hasPermission('blogs.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteProduct(_._id)}
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
  const { totalCount, products_rows } = useMemo(
    () => ({
      products_rows: products_data?.products?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _?.title,
        _?.sku,
        _.categories?.map(i => i?.title).join(', '),
        _.industries?.map(i => i?.title).join(', '),
        ,
        actionBtns(_),
      ]),
      totalCount: products_data.totalItems,
    }),
    [products_data],
  );
  const columnNames = [`Created at`, `Title`, `SKU`, `Category`, `Industry`, ``];

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
      pageSize={searchQuery.pageSize}>
      <Table width={1200} loading={products_loading} rowsData={products_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
