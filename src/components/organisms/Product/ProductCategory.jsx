import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';
import categoryService from 'services/blogCategoryService';
import productCategoryService from 'services/productCategoryService';

function ProductCategory({ category, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        title: category?.title,
      });
    }
  }, [category]);
  const onSubmit = async data => {
    try {
      setLoading(true);
      let res;
      if (category) {
        res = await productCategoryService.updateCategory({
          id: category._id,
          title: data?.title,
        });
      } else {
        res = await productCategoryService.createCategory({
          title: data?.title,
        });
      }
      refetch();
      onClose();
      setLoading(false);
      if (res?.success) {
        Toast({
          type: 'success',
          message: 'Category saved successfully',
        });
      }
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
        lg={1}
        colGap={20}
        css={`
          align-items: center;
        `}>
        <Form.Item
          sm
          type="text"
          label="Title"
          name="title"
          placeholder="Category Title"
          rules={[
            { required: true, message: 'Please enter category title' },
            {
              pattern: /^[A-Z]/,
              message: 'First character should be capital',
            },
          ]}>
          <Field />
        </Form.Item>
      </Grid>
      <Button loading={loading} type="primary" htmlType="submit" style={{ margin: '0 auto' }}>
        Save
      </Button>
    </Form>
  );
}

export default ProductCategory;
