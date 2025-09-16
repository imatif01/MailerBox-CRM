import React, { useState, useMemo, useContext, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { format } from 'date-fns';

import Table from 'components/molecules/Table';
import TableLayout from 'components/atoms/TableLayout';
import Button from 'components/atoms/Button';
import Tooltip from 'components/atoms/Tooltip';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import MenuButton, { MenuItem } from 'components/molecules/Menu/index';
import AdminForm from 'components/organisms/AdminForm';
import Toast from 'components/molecules/Toast';
import { AuthContext } from 'context/authContext';
import adminService from 'services/adminService';

export default function Admins() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterRoles: '',
  });
  const { fetch, refetch, hasPermission } = useContext(AuthContext);
  const { admin_data, admin_loading } = adminService.GetAdmins(searchQuery, fetch);

  const onDeleteAdmin = async id => {
    try {
      await adminService.deleteAdmin(id);
      refetch();
      Toast({
        message: 'Admin deleted successfully',
        type: 'success',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex?.message,
      });
    }
  };

  const actionBtns = _ => (
    <ActionBtnHolder numOfBtns={4}>
      {hasPermission('admin.edit') && (
        <ModalContainer
          lg
          title="Edit Admin "
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <AdminForm onClose={onClose} user={_} />}
        />
      )}

      {hasPermission('admin.menu') && (
        <Tooltip title="More" type="dark">
          <MenuButton icon={<span className="material-icons-outlined">more_vert</span>}>
            {hasPermission('admin.update-password') && (
              <ModalContainer
                lg
                title="Update Password"
                btnComponent={({ onClick }) => (
                  <MenuItem onClick={onClick} icon={<span className="material-icons-outlined">password</span>}>
                    Update Password
                  </MenuItem>
                )}
                content={({ onClose }) => <AdminForm onClose={onClose} user={_} passwordOnly />}
              />
            )}
          </MenuButton>
        </Tooltip>
      )}

      {hasPermission('admin.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteAdmin(_.id)}
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

  const { totalCount, admin_rows } = useMemo(
    () => ({
      admin_rows: admin_data.admins.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _.fullName ?? '------------',
        _.email ?? '------------',
        _.roles?.length > 0 ? _.roles.map(__ => __.type).join(', ') : '------------',
        actionBtns(_),
      ]),
      totalCount: admin_data.totalItems,
    }),
    [admin_data],
  );
  const columnNames = [`Created at`, `Full Name`, `Email`, `Roles`, ``];

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
      <Table width={1200} loading={admin_loading} rowsData={admin_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
