import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from 'context/authContext';
import roleService from 'services/roleService';
import Toast from 'components/molecules/Toast';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import RolesForm from 'components/organisms/RolesForm';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import { format } from 'date-fns';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';
import toasterService from 'services/toasterService';
import ToasterForm from 'components/organisms/ToasterForm';

export default function Settings() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
  });
  const { fetch, refetch, hasPermission } = useContext(AuthContext);
  const { toasters_data, toasters_loading } = toasterService.GetToasters(searchQuery, fetch);

  const onDeleteToaster = async id => {
    try {
      await toasterService.deleteToaster(id);
      refetch();
      Toast({
        message: 'Toaster deleted successfully',
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
      {hasPermission('settings.edit') && (
        <ModalContainer
          lg
          title="Edit Toaster"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <ToasterForm onClose={onClose} toaster={_} />}
        />
      )}
      {hasPermission('settings.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteToaster(_.id)}
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

  const { totalCount, toasters_rows } = useMemo(
    () => ({
      toasters_rows: toasters_data.toasters.map(_ => [
        // _.description,
        _.title,
        _.status ? 'ACTIVE' : 'DE-ACTIVE',
        actionBtns(_),
      ]),
      totalCount: toasters_data.totalItems,
    }),
    [toasters_data],
  );
  const columnNames = [`Title`, `Status`, ``];
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
      <Table width={1200} loading={toasters_loading} rowsData={toasters_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
