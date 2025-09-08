import React, { useState, useMemo, useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from 'context/authContext';
import { Container } from './FutureCheckInBookingsTable.styles';
import TableComponent from '../../molecules/TableComponent';
import TableLayout from 'components/atoms/TableLayout';
import dashboardService from 'services/dashboardService';

function FutureCheckInBookingsTable() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    getAll: false,
  });
  const { refetch } = useContext(AuthContext);
  const { bookings_data, bookings_loading } = dashboardService.GetTodayCheckInBookings(searchQuery, refetch);

  const { totalCount, booking_rows } = useMemo(
    () => ({
      booking_rows: bookings_data?.bookings?.map(booking => [
        format(new Date(booking.createdAt), 'yyyy-MM-dd'),
        booking.contactInfo.name || 'N/A',
        booking.contactInfo.email || 'N/A',
        format(new Date(booking.startDate), 'yyyy-MM-dd'),
        format(new Date(booking.endDate), 'yyyy-MM-dd'),
        booking.totalPrice || 'N/A',
        booking.paymentStatus || 'N/A',
        booking.status || 'N/A',
      ]),
      totalCount: bookings_data.totalItems,
    }),
    [bookings_data],
  );

  const columnNames = [
    'Date',
    'Name',
    'Email',
    'Check-in Date',
    'Check-out Date',
    'Total Price',
    'Payment Status',
    'Booking Status',
  ];

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
          loading={bookings_loading}
          rowsData={booking_rows}
          columnNames={columnNames}
          noPadding
        />
      </TableLayout>
    </Container>
  );
}

export default FutureCheckInBookingsTable;
