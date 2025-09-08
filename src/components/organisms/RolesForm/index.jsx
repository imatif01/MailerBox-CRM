import React, { useContext, useEffect, useState, useMemo } from 'react';
import 'styled-components/macro';
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import roleService from 'services/roleService';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';
import PermissionSelector from '../PermissionSelector';

function RolesForm({ role, onClose = () => {} }) {
  const [form] = useForm();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);
  const permissions = useMemo(() => role?.permissions?.map(({ id }) => id) ?? [], []);
  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        type: role?.type,
        description: role?.description,
      });
      setState({
        type: role?.type,
        description: role?.description,
        permissions,
      });
    }
  }, []);

  const toggleBodyScroll = shouldHide => {
    if (shouldHide) {
      document.body.style.overflow = shouldHide && 'hidden';
    } else {
      document.body.style.overflow = shouldHide && 'auto';
    }
  };

  useEffect(() => {
    toggleBodyScroll(true);
  }, []);

  const onSubmit = async data => {
    try {
      setLoading(true);
      if (role) {
        await roleService.updateRole(role.id, {
          type: data.type,
          description: data.description,
          permissions: state.permissions,
        });
      } else {
        await roleService.createRole({
          type: data.type,
          description: data.description,
          permissions: state.permissions,
        });
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Role saved successfully',
      });
    } catch (ex) {
      setLoading(false);
      Toast({
        type: 'error',
        message: ex.message,
      });
    }
  };
  return (
    <Form form={form} onSubmit={onSubmit} onTouched={_ => setState(__ => ({ ...__, ..._ }))}>
      <Grid
        xs={1}
        lg={2}
        colGap={20}
        css={`
          align-items: center;
          margin-bottom: 20px;
        `}>
        <Form.Item
          sm
          type="text"
          label="Type"
          name="type"
          placeholder="Role Type"
          rules={[
            { required: true, message: 'Please enter role' },
            {
              pattern: /^[A-Z_]+$/,
              message: 'Role type must be uppercase and only alphabets and _ are allowed',
            },
          ]}>
          <Field />
        </Form.Item>

        <Form.Item
          type="text"
          label="Description"
          name="description"
          placeholder="Description"
          rules={[
            {
              required: true,
            },
          ]}>
          <Field />
        </Form.Item>
        <div />
        <PermissionSelector
          permissions={permissions}
          onDone={__ => setState(_ => ({ ..._, permissions: __ }))}
          forRoles
        />
      </Grid>
      <Button
        disabled={!state?.permissions?.length}
        loading={loading}
        type="primary"
        htmlType="submit"
        style={{ margin: '0 auto' }}>
        Save
      </Button>
    </Form>
  );
}

export default RolesForm;
