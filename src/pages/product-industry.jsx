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
import productIndustryService from 'services/ProductIndustryService';
import ProductIndustry from 'components/organisms/Product/ProductIndusry';

export default function ProductIndustryPage() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);

  const { product_industries_data, product_industries_loading } = productIndustryService.GetProductIndustries(
    searchQuery,
    refetch,
  );

  const onDeleteCategory = async id => {
    try {
      await productIndustryService.deleteIndustry(id);
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
      {hasPermission('product-industry.edit') && (
        <ModalContainer
          lg
          title="Edit Industry"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <ProductIndustry onClose={onClose} category={_} />}
        />
      )}
      {hasPermission('product-industry.delete') && (
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
      category_rows: product_industries_data?.industries?.map(_ => [
        format(new Date(_?.created_at), 'yyyy-MM-dd'),
        _.title,
        actionBtns(_),
      ]),
      totalCount: product_industries_data?.totalItems,
    }),
    [product_industries_data],
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
        loading={product_industries_loading}
        rowsData={category_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
