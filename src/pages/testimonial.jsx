import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from 'context/authContext';
import testimonialService from 'services/testimonialService';
import Toast from 'components/molecules/Toast';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import TestimonialForm from 'components/organisms/TestimonialForm';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import { format } from 'date-fns';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';

export default function Testimonials() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);
  const { testimonials_data, testimonials_loading } = testimonialService.GetTestimonials(searchQuery, refetch);
  const onDeleteTestimonial = async id => {
    try {
      await testimonialService.deleteTestimonial(id);
      refetch();
      Toast({
        message: 'Testimonial deleted successfully',
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
      {hasPermission('testimonial.edit') && (
        <ModalContainer
          lg
          title="Edit Testimonial"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button
                unStyled
                className="edit-btn"
                onClick={onClick}
                css={`
                  margin: 0 auto;
                `}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <TestimonialForm onClose={onClose} testimonial={_} />}
        />
      )}
      {hasPermission('testimonial.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteTestimonial(_.id)}
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
  const { totalCount, testimonials_rows } = useMemo(
    () => ({
      testimonials_rows: testimonials_data.testimonials.map(_ => [
        format(new Date(_.createdAt), 'yyyy-MM-dd'),
        _.author,
        _.text,
        actionBtns(_),
      ]),
      totalCount: testimonials_data.totalItems,
    }),
    [testimonials_data],
  );
  const columnNames = [`Created at`, `Author`, `Text`, ``];

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
        loading={testimonials_loading}
        rowsData={testimonials_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
