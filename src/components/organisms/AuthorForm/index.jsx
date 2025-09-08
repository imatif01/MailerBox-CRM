import React, { useContext, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';
import blogService from 'services/blogAuthorService';
import { convertToFormData } from 'helpers/common';

function AuthorForm({ author, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);

  useEffect(() => {
    if (author) {
      form.setFieldsValue({
        name: author?.name,
        email: author?.email,
        details: author?.details,
        linkedin: author?.linkedin,
        instagram: author?.instagram,
        authorImg: author?.authorImg || '',
      });
    }
  }, [author]);

  const onSubmit = async data => {
    try {
      setLoading(true);
      let response;
      if (author) {
        response = await blogService.updateAuthor(author?.id, convertToFormData(data));
      } else {
        response = await blogService.createAuthor(convertToFormData(data));
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
          label="Name"
          name="name"
          placeholder="Author's Name"
          rules={[
            { required: true, message: 'Please enter name' },
            { max: 40, message: 'Name should be at max 40 characters!' },
          ]}>
          <Field />
        </Form.Item>
        <Form.Item
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
      </Grid>
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
          label="Linkedin Address"
          name="linkedin"
          placeholder="Linkedin Address"
          rules={[
            { required: true, message: 'Please enter email address' },
            { pattern: /^(https?|ftp|mailto|file):\/\/[^\s/$.?#].[^\s]*$/i, message: 'Please enter a valid URL' },
          ]}>
          <Field />
        </Form.Item>
        <Form.Item
          sm
          type="text"
          placeholder="Instagram Address"
          name="instagram"
          label="Instagram Address"
          rules={[
            { required: true, message: 'Please enter email address' },
            { pattern: /^(https?|ftp|mailto|file):\/\/[^\s/$.?#].[^\s]*$/i, message: 'Please enter a valid URL' },
          ]}>
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
      <Form.Item
        type="textarea"
        label="Author Details"
        name="details"
        placeholder="Share Important Details About Author"
        rules={[{ required: true, message: 'Please enter author details' }]}>
        <Field />
      </Form.Item>
      <Form.Item
        label="Author Image"
        name="authorImg"
        placeholder="Select Author Image"
        displayFile={author?.authorImg || null}
        type="chooseFile">
        <Field />
      </Form.Item>

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

export default AuthorForm;
