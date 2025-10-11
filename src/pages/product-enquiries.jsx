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
import enquiryService from 'services/enquiryService';

export default function ProductEnquiry() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);
  const { enquiries_data, enquiries_loading } = enquiryService.GetEnquiries(searchQuery, refetch);
  const onDeleteGeneralEnquiry = async id => {
    try {
      await enquiryService.deleteEnquiry(id);
      refetch();
      Toast({
        message: 'Enquiry deleted successfully',
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
  const { totalCount, enquiries_rows } = useMemo(
    () => ({
      enquiries_rows: enquiries_data?.enquiries?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.fullName,
        _.email,
        _.phone,
        _.companyName,
        _.country,
        _.companySize,
        _.howYouHeardAboutUs,
        actionBtns(_),
      ]),
      totalCount: enquiries_data?.totalItems,
    }),
    [enquiries_data],
  );
  const columnNames = [
    `Created at`,
    `Full Name`,
    `Email`,
    `Phone`,
    `Company Name`,
    `Country`,
    `Company Size`,
    `Hear About Us`,
    ``,
  ];

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
      <Table width={1200} loading={enquiries_loading} rowsData={enquiries_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
