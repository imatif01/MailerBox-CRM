import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from 'context/authContext';
import { ActionBtnHolder } from 'styles/helpers.styles';
import MenuButton, { MenuItem } from 'components/molecules/Menu/index';
import Tooltip from 'components/atoms/Tooltip';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';
import { format } from 'date-fns';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import Toast from 'components/molecules/Toast';
import Button from 'components/atoms/Button';
import adminService from 'services/adminService';

export default function Subscriber() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
  });

  const { refetch } = useContext(AuthContext);
  const { subscribers_data, subscribers_loading } = adminService.GetSubscribers(searchQuery, refetch);

  const { totalCount, subscribers_rows } = useMemo(
    () => ({
      subscribers_rows: subscribers_data?.subscribers?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.email,
        _.status,
      ]),
      totalCount: subscribers_data.totalItems,
    }),
    [subscribers_data],
  );

  const columnNames = [`Date`, `Email`, `Status`];

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
        // loading={subscribers_loading}
        rowsData={subscribers_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
