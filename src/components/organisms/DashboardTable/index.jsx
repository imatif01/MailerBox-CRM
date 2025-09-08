import React, { useState, useMemo, useContext } from 'react';
import dashboardService from 'services/dashboardService';
import { format } from 'date-fns';
import { AuthContext } from 'context/authContext';
import { Container } from './DashboardTable.styles';
import TableComponent from '../../molecules/TableComponent';
import TableLayout from 'components/atoms/TableLayout';

function DashboardTable() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    getAl: '',
  });
  const { refetch } = useContext(AuthContext);
  const { customers_data, customers_loading } = dashboardService.GetRecentCustomers(searchQuery, refetch);

  const { totalCount, customer_rows } = useMemo(() => {
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
    <Container>
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
        <TableComponent
          width={1200}
          loading={customers_loading}
          rowsData={customer_rows}
          columnNames={columnNames}
          noPadding
        />
      </TableLayout>
    </Container>
  );
}

export default DashboardTable;
