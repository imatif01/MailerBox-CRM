import React, { useState, useMemo, useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from 'context/authContext';
import { Container } from './TodayCheckInBookingsTable.styles';
import TableComponent from '../../molecules/TableComponent';
import TableLayout from 'components/atoms/TableLayout';
import dashboardService from 'services/dashboardService';

function TodayCheckInBookingsTable() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 4,
    getAll: false,
  });
  const { refetch } = useContext(AuthContext);
  const { bookings_data, bookings_loading } = dashboardService.GetTodayCheckInBookings(searchQuery, refetch);

  const { totalCount, booking_rows } = useMemo(
    () => ({
      booking_rows: bookings_data?.bookings?.map(booking => [
        format(new Date(booking.createdAt), 'yyyy-MM-dd'),
        booking?.contactInfo?.name || 'N/A',
        booking?.contactInfo?.email || 'N/A',
        booking?.listingId?.name || 'N/A',
        booking?.status || 'N/A',
      ]),
      totalCount: bookings_data.totalItems,
    }),
    [bookings_data],
  );

  const columnNames = ['Date', 'Name', 'Email', 'Property', 'Booking Status'];

  return (
    <Container>
      <TableLayout
        title="Today Bookings"
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
          minHeight="290px"
          loading={bookings_loading}
          rowsData={booking_rows}
          columnNames={columnNames}
          noPadding
        />
      </TableLayout>
    </Container>
  );
}

export default TodayCheckInBookingsTable;
