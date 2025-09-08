import React, { useContext, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';

import toasterService from 'services/toasterService';

function ToasterForm({ toaster, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);

  useEffect(() => {
    if (toaster) {
      form.setFieldsValue({
        title: toaster?.title,
        description: toaster?.description,
        type: toaster?.type,
        status: toaster?.status,
      });
    }
  }, [toaster]);

  const onSubmit = async data => {
    try {
      setLoading(true);
      let response;
      const payload = {
        title: data?.title,
        description: data?.description,
        status: data?.status,
        type: 'header',
      };
      if (toaster) {
        response = await toasterService.updateToaster(toaster?.id, payload);
      } else {
        response = await toasterService.createToaster(payload);
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: response.message,
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
        <Form.Item
          sm
          type="text"
          label="Toaster Title"
          name="title"
          placeholder="Title"
          rules={[{ required: true, message: 'Please enter title' }]}>
          <Field />
        </Form.Item>
        <Form.Item
          sm
          type="text"
          label="Toaster Description"
          name="description"
          placeholder="Description"
          rules={[{ required: true, message: 'Please enter description' }]}>
          <Field />
        </Form.Item>
      </Grid>
      <Grid
        xs={1}
        lg={2}
        colGap={20}
        css={`
          align-items: center;
        `}>
        <Form.Item sm type="checkbox" label="Enable/Disable Toasters" name="status">
          <Field />
        </Form.Item>
        <div />
      </Grid>
      <Grid
        xs={1}
        lg={2}
        colGap={20}
        css={`
          align-items: center;
        `}></Grid>

      <Button
        loading={loading}
        type="primary"
        htmlType="submit"
        style={{ marginTop: '20px' }}
        style={{ margin: '0 auto' }}>
        Save
      </Button>
    </Form>
  );
}

export default ToasterForm;
