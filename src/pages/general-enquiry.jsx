import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from 'context/authContext';
import Toast from 'components/molecules/Toast';
import { ActionBtnHolder } from 'styles/helpers.styles';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import { format } from 'date-fns';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';
import adminService from 'services/adminService';

export default function GeneralEnquiries() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);
  const { general_enquiries_data, general_enquiries_loading } = adminService.GetGeneralEnquiries(searchQuery, refetch);
  const onDeleteGeneralEnquiry = async id => {
    try {
      await adminService.deleteGeneralEnquiry(id);
      refetch();
      Toast({
        message: 'General Enquiry deleted successfully',
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
      {hasPermission('general-enquiry.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteGeneralEnquiry(_.id)}
          btnComponent={({ onClick }) => (
            <Tooltip title="Delete" type="dark">
              <Button
                unStyled
                size={20}
                className="delete-btn"
                onClick={onClick}
                css={`
                  margin: 0 auto;
                `}>
                <i className="material-icons-outlined">delete_forever</i>
              </Button>
            </Tooltip>
          )}
        />
      )}
    </ActionBtnHolder>
  );
  const { totalCount, general_enquiries_rows } = useMemo(
    () => ({
      general_enquiries_rows: general_enquiries_data?.generalEnquiries?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.fullName,
        // _.lastName,
        _.email,
        _.phone,
        _.companyName,
        _.message,
        actionBtns(_),
      ]),
      totalCount: general_enquiries_data.totalItems,
    }),
    [general_enquiries_data],
  );
  const columnNames = [`Created at`, `Full Name`, `Email`, `Phone`, `Company Name`, `Message`, ``];

  return (
    <TableLayout
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
        loading={general_enquiries_loading}
        rowsData={general_enquiries_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
