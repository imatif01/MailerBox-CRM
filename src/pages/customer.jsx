import React, { useState, useMemo, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { format } from 'date-fns';
import Table from 'components/molecules/Table';
import TableLayout from 'components/atoms/TableLayout';

import { AuthContext } from 'context/authContext';
import customerService from 'services/customerService';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import ModalContainer from 'components/molecules/ModalContainer';
import CustomerDetailModal from 'components/organisms/CustomerDetailModal';
import Toast from 'components/molecules/Toast';
import Modal from 'components/molecules/Modal';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const [customerDetailModal, setCustomerDetailModal] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const { refetch, hasPermission } = useContext(AuthContext);
  const { customers_data, customers_loading } = customerService.GetCustomers(searchQuery, refetch);

  const onDeleteCustomer = async id => {
    try {
      await customerService.deleteCustomer(id);
      refetch();
      Toast({
        message: 'Customer deleted successfully',
        type: 'success',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex?.message,
      });
    }
  };

  const actionBtns = _ => (
    <ActionBtnHolder numOfBtns={4}>
      {hasPermission('customer.detail') && (
        <ModalContainer
          xl
          title="Customer Detail"
          btnComponent={({ onClick }) => (
            <Tooltip title="Details" type="dark">
              <Button unStyled css="color: var(--primary);" onClick={onClick}>
                <i className="material-icons-outlined">description</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <CustomerDetailModal onClose={onClose} customer={_} />}
        />
      )}

      {hasPermission('customer.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteCustomer(_.id)}
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

  const { totalCount, customer_rows, original_data } = useMemo(() => {
    const structuredData = customers_data?.customers ?? [];

    return {
      customer_rows: structuredData.map(_ => [
        _?.fullName ?? '------------',
        _?.email ?? '------------',
        _?.subscriptionDetail
          ? _?.subscriptionDetail?.status.toLowerCase() === 'canceled'
            ? `${_?.subscriptionDetail?.currentPlan} Cancelled`
            : _?.subscriptionDetail?.currentPlan
          : 'Free',
        format(new Date(_?.created_at), 'yyyy-MM-dd'),
        _?.lastLoginDate ? format(new Date(_?.lastLoginDate), 'yyyy-MM-dd') : '------------',
        _?.remainingCredits ?? '0',
      ]),
      totalCount: customers_data?.totalItems,
      original_data: structuredData,
    };
  }, [customers_data]);

  const columnNames = ['Customer Name', 'Email', 'Subscription Type', 'Signup Date', 'Last Login', 'Remaining Credits'];

  return (
    <>
      <Modal title="Customer Detail" width={650} isOpen={customerDetailModal} setIsOpen={setCustomerDetailModal}>
        <CustomerDetailModal customer={customerData} onFinishedSuccess={() => refetch()} />
      </Modal>
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
        <Table
          width={1200}
          loading={customers_loading}
          rowsData={customer_rows}
          columnNames={columnNames}
          noPadding
          onClick={(data, rowIndex) => {
            setCustomerDetailModal(true);
            setCustomerData(original_data[rowIndex]);
          }}
        />
      </TableLayout>
    </>
  );
}
