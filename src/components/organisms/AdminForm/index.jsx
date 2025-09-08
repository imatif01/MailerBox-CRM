import React, { useContext, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import Select from 'components/atoms/Select';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';
import adminService from 'services/adminService';
import roleService from 'services/roleService';

function AdminForm({ user, passwordOnly, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);
  const { roles_data } = roleService.GetRoles({ getAll: true });
  const roles = useMemo(() => roles_data.roles.map(({ id, type }) => ({ value: id, label: type })), [roles_data]);

  useEffect(() => {
    if (user && !passwordOnly) {
      form.setFieldsValue({
        fullName: user?.fullName,
        email: user?.email,
        roles: roles?.filter(({ value }) => user?.roles?.find(({ id }) => id === value)),
        meetingPriorityLevel: { value: user?.meetingPriorityLevel, label: user?.meetingPriorityLevel },
        canDoMeeting: user?.canDoMeeting,
      });
    }
  }, [roles_data, user, passwordOnly, roles]);

  const onSubmit = async data => {
    try {
      setLoading(true);
      if (user && !passwordOnly) {
        await adminService.updateAdmin(user.id, {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: data.roles.map(({ value }) => value),
        });
      } else if (user && passwordOnly) {
        await adminService.updateAdmin(user.id, {
          password: data.password,
        });
      } else {
        await adminService.addAdmin({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: data.roles.map(({ label }) => label),
        });
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Admin saved successfully',
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
    <Form form={form} onSubmit={onSubmit}>
      <Grid
        xs={1}
        lg={2}
        colGap={20}
        css={`
          align-items: center;
        `}>
        {!passwordOnly && (
          <Form.Item
            disabled={passwordOnly}
            sm
            type="text"
            label="Full Name"
            name="fullName"
            placeholder="Full Name"
            rules={[
              { required: true, message: 'Please enter full name' },
              {
                pattern: /^[a-zA-Z_ ]*$/,
                message: 'Full name should be alphabet',
              },
              {
                pattern: /^[a-zA-Z_ ]{2,}$/,
                message: 'Full name must be minimum 2 characters.',
              },
              {
                pattern: /^[a-zA-Z_ ]{2,25}$/,
                message: 'Full name should be maximum 25 characters',
              },
            ]}>
            <Field />
          </Form.Item>
        )}
        {!passwordOnly && (
          <Form.Item
            disabled={passwordOnly}
            sm
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
            rules={[
              { required: true, message: 'Please enter email address' },
              { email: true, message: 'Please enter a valid email' },
              { max: 40, message: 'Email should be at max 40 characters!' },
            ]}>
            <Field />
          </Form.Item>
        )}
        {(passwordOnly || !user) && (
          <Form.Item
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
            rules={[
              {
                required: true,
                message: 'Please enter password',
              },
              { password: true },
              {
                pattern: /^.{8,64}$/,
                message: 'Minimum Character Length is 8 and Maximum Character Length is 64',
              },
            ]}>
            <Field />
          </Form.Item>
        )}
        {(passwordOnly || !user) && (
          <Form.Item
            type="password"
            label="Confirm Password"
            name="confirm_password"
            placeholder="Confirm Password"
            rules={[
              {
                required: true,
                message: 'Please enter confirm password',
              },
              {
                password: true,
              },
              {
                transform: value => value !== form.getFieldValue('password'),
                message: 'The two passwords that you entered do not match!',
              },
            ]}>
            <Field />
          </Form.Item>
        )}
        {!passwordOnly && (
          <Form.Item
            sm
            options={roles}
            isSearchable
            isMulti
            name="roles"
            label="Role"
            placeholder="Role"
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            rules={[
              { required: true, message: 'Select atleast one role' },
              {
                transform: value => !value?.length,
                message: 'Select at least one role',
              },
            ]}>
            <Select />
          </Form.Item>
        )}
        {/* {!passwordOnly && (
          <Form.Item
            sm
            name="meetingPriorityLevel"
            label="Meeting Priority Level"
            placeholder="Meeting Priority Level"
            rules={[{ required: true, message: 'Please select meeting priority level' }]}>
            <Select
              options={[
                { value: '0', label: '0' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' },
                { value: '9', label: '9' },
                { value: '10', label: '10' },
              ]}
            />
          </Form.Item>
        )}
        {!passwordOnly && (
          <Form.Item sm name="canDoMeeting" label="Can Do Meeting" placeholder="Can Do Meeting" type="checkbox">
            <Field />
          </Form.Item>
        )} */}
      </Grid>
      <Button loading={loading} type="primary" htmlType="submit" style={{ margin: '0 auto' }}>
        Save
      </Button>
    </Form>
  );
}

export default AdminForm;
