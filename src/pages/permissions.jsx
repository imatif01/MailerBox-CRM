import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from 'context/authContext';
import permissionService from 'services/permissionService';
import Toast from 'components/molecules/Toast';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import PermissionsForm from 'components/organisms/PermissionsForm';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import { format } from 'date-fns';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';

export default function Permissions() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
    filterPermission: '',
  });
  const { refetch, hasPermission } = useContext(AuthContext);
  const { permissions_data, permissions_loading } = permissionService.GetPermissions(searchQuery, refetch);
  const onDeletePermission = async id => {
    try {
      await permissionService.deletePermission(id);
      refetch();
      Toast({
        message: 'Permission deleted successfully',
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
      {hasPermission('permissions.edit') && (
        <ModalContainer
          lg
          title="Edit Permission"
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
          content={({ onClose }) => <PermissionsForm onClose={onClose} permission={_} />}
        />
      )}
      {hasPermission('permissions.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeletePermission(_._id)}
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
  // const { totalCount, permissions_rows } = useMemo(
  //   () => ({
  //     permissions_rows: permissions_data.permissions.map(_ => [
  //       format(new Date(_.createdAt), 'yyyy-MM-dd'),
  //       _.can,
  //       _.description,
  //       actionBtns(_),
  //     ]),
  //     totalCount: permissions_data.totalItems,
  //   }),
  //   [permissions_data],
  // );

  // const permissions_data = [
  //   {
  //     createdAt: format(new Date('2022-01-01'), 'yyyy-MM-dd'),
  //     can: 'dashboard.nav',
  //     description: 'Can View the dashboard page in side nav',
  //   },
  //   {
  //     createdAt: format(new Date('2022-01-01'), 'yyyy-MM-dd'),
  //     can: 'user.nav',
  //     description: 'Can View the user page in side nav',
  //   },
  //   {
  //     createdAt: format(new Date('2022-01-01'), 'yyyy-MM-dd'),
  //     can: 'user.create',
  //     description: 'Can add new user',
  //   },
  //   {
  //     createdAt: format(new Date('2022-01-01'), 'yyyy-MM-dd'),
  //     can: 'user.update-password',
  //     description: 'Can Update user password',
  //   },
  //   {
  //     createdAt: format(new Date('2022-01-01'), 'yyyy-MM-dd'),
  //     can: 'user.logs',
  //     description: 'Can view user logs',
  //   },
  // ];

  const { totalCount, permissions_rows } = useMemo(
    () => ({
      permissions_rows: permissions_data?.permissions?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.can,
        _.description,
        actionBtns(_),
      ]),
      totalCount: permissions_data.totalItems,
    }),
    [permissions_data],
  );
  const columnNames = [`Created at`, `Can`, `description`, ``];

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
        loading={permissions_loading}
        rowsData={permissions_rows}
        columnNames={columnNames}
        noPadding
      />
    </TableLayout>
  );
}
