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

export default function Roles() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
  });
  const { fetch, refetch, hasPermission } = useContext(AuthContext);
  const { roles_data, roles_loading } = roleService.GetRoles(searchQuery, fetch);

  const onDeleteRole = async id => {
    try {
      await roleService.deleteRole(id);
      refetch();
      Toast({
        message: 'Role deleted successfully',
        type: 'success',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: 'Error deleting role',
      });
    }
  };

  const actionBtns = _ => (
    <ActionBtnHolder numOfBtns={2}>
      {hasPermission('roles.edit') && (
        <ModalContainer
          lg
          title="Edit Role"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <RolesForm onClose={onClose} role={_} />}
        />
      )}
      {hasPermission('roles.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteRole(_.id)}
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
  const { totalCount, roles_rows } = useMemo(
    () => ({
      roles_rows: roles_data.roles.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.type,
        _.description,
        actionBtns(_),
      ]),
      totalCount: roles_data.totalItems,
    }),
    [roles_data],
  );
  const columnNames = [`Created at`, `Type`, `Description`, ``];
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
      <Table width={1200} loading={roles_loading} rowsData={roles_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
