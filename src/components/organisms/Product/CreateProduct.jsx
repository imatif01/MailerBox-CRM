import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import 'styled-components/macro';
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import Select from 'components/atoms/Select';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';
import blogService from 'services/blogService';
import { Error } from '../../molecules/Field/Field.styles';
import { Editor } from '@tinymce/tinymce-react';
import categoryService from 'services/blogCategoryService';
import authorService from 'services/blogAuthorService';
import { convertToFormData } from 'helpers/common';
import { StyledProduct } from './Product.styles';

function CreateProduct({ isEdit, blogData, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const galleryImages = [
    { name: 'gallery_img_one', label: 'First Gallery Image' },
    { name: 'gallery_img_two', label: 'Second Gallery Image' },
    { name: 'gallery_img_three', label: 'Third Gallery Image' },
  ];

  const [galleryFields, setGalleryFields] = useState(galleryImages);

  const { category_data, category_loading } = categoryService.GetCategories({ getAll: true }, refetch);
  const { authors_data } = authorService.GetAuthors({ getAll: true }, refetch);

  const categoryOpts = useMemo(() => {
    return category_data?.categories.map(category => ({
      label: category.title,
      value: category._id,
    }));
  }, [category_data]);

  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current && blogData?.description) {
      editorRef.current.blogData?.description;
    }
  }, [description]);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        title: blogData?.title,
        metaTitle: blogData?.metaTitle,
        metaDescription: blogData?.metaDescription,
        category: categoryOpts?.find(data => data.value === blogData?.category?._id),
        bannerImg: blogData?.bannerImg,
        keywords: blogData?.keywords?.map(item => item),
        slug: blogData?.slug,
      });
      setDescription(blogData?.description);
    }
  }, [blogData, categoryOpts]);

  const onSubmit = async data => {
    let desc = description || '';
    if (editorRef?.current) {
      desc = editorRef.current.getContent();
    }

    setError(null);
    setLoading(true);

    const postData = {
      category: data?.category?.value,
      bannerImg: data?.bannerImg,
      title: data?.title,
      description: desc,
      metaTitle: data?.metaTitle,
      metaDescription: data?.metaDescription,
      keywords: data?.keywords,
      slug: data?.slug,
    };

    try {
      let res;
      if (isEdit) {
        await blogService.updateBlog(blogData._id, convertToFormData(postData));
      } else {
        res = await blogService.createBlog(convertToFormData(postData));
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: res?.message || 'Post saved successfully',
      });
    } catch (ex) {
      setLoading(false);
      Toast({
        type: 'error',
        message: ex.message,
      });
    }
  };

  const addGalleryField = () => {
    const nextIndex = galleryFields.length + 1;
    setGalleryFields(prev => [...prev, { name: `gallery_img_${nextIndex}`, label: `Gallery Image ${nextIndex}` }]);
  };

  const handleImageSizeLimit = (e, items, editor) => {
    for (const element of items) {
      if (element.type.indexOf('image') !== -1) {
        let imageSize = element.getAsFile().size;

        if (imageSize > 200 * 1024) {
          e.preventDefault();

          editor.notificationManager.open({
            text: 'Image size exceeds 200 KB limit',
            type: 'error',
          });

          return false;
        }
      }
    }

    return true;
  };

const optionss =[
    {
        label:"A",
        value:"A"
    },
    {
        label:"B",
        value:"B"
    },
    {
        label:"C",
        value:"C"
    },
]

  return (
    <StyledProduct>
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
            label="Title"
            name="title"
            placeholder="Post Title"
            rules={[
              { required: true, message: 'Please enter post title' },
              {
                pattern: /^[A-Z]/,
                message: 'First character should be capital',
              },
              {
                pattern: /^.{5,200}$/,
                message: 'Character Length should be between 5 and 200',
              },
            ]}>
            <Field />
          </Form.Item>
            <Form.Item
            type="text"
            label="SKU"
            maxLength={10}
            name="sku"
            placeholder="sku"
            sm
            rules={[{ required: true, message: 'Please enter sku' }]}>
            <Field />
          </Form.Item>
          <Form.Item
            sm
            isMulti
            // options={categoryOpts}
            options={optionss}
            isSearchable
            name="category"
            label="Category"
            placeholder="Select Category"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[
              { required: true, message: 'Select atleast one cateogry' },
              // {
              //   transform: value => !value?.length,
              //   message: 'Select at least one cateogry',
              // },
            ]}>
            <Select />
          </Form.Item>
          <Form.Item
            sm
            isMulti
            // options={categoryOpts}
            options={optionss}
            isSearchable
            name="material"
            label="Material"
            placeholder="Select material"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[
              { required: true, message: 'Select atleast one cateogry' },
              // {
              //   transform: value => !value?.length,
              //   message: 'Select at least one cateogry',
              // },
            ]}>
            <Select />
          </Form.Item>
          <Form.Item
            sm
            isMulti
            // options={categoryOpts}
            options={optionss}
            isSearchable
            name="Style"
            label="style"
            placeholder="Select style"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[
              { required: true, message: 'Select atleast one cateogry' },
              // {
              //   transform: value => !value?.length,
              //   message: 'Select at least one cateogry',
              // },
            ]}>
            <Select />
          </Form.Item>
          
          <Form.Item
            sm
            type="text"
            label="Metatitle"
            name="metaTitle"
            placeholder="Metatitle"
            rules={[
              { required: true, message: 'Please enter meta title' },
              {
                pattern: /^[A-Z]/,
                message: 'First character should be capital',
              },
              {
                pattern: /^.{5,}$/,
                message: 'Length should be atleast 5',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            sm
            type="text"
            label="Metadescription"
            name="metaDescription"
            placeholder="Metadescription"
            rules={[
              { required: true, message: 'Please enter post meta description' },
              {
                pattern: /^[A-Z]/,
                message: 'First character should be capital',
              },
              {
                pattern: /^.{5,}$/,
                message: 'Length should be atleast 5',
              },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            sm
            type="text"
            label="keywords"
            name="keywords"
            placeholder="Keywords"
            rules={[{ required: true, message: 'Please enter post keywords' }]}>
            <Field />
          </Form.Item>
        
        </Grid>
          <div className='product-description'>
          <Form.Item
            sm
            type="textarea"
            label="Short Description"
            name="descrption"
            placeholder="Short Descrption"
            rules={[{ required: true, message: 'Please enter sku' }]}>
            <Field />
          </Form.Item>
                </div>
        <Form.Item
          label="Feature Image"
          name="featureImg"
          placeholder="Select Banner Image"
          displayFile={blogData?.bannerImg || null}
          type="chooseFile"
          rules={[{ required: true, message: 'Select Banner Image' }]}>
          <Field />
        </Form.Item>

        <div className="product-gallery-images">
          <div className="head">
            <span className="label">Gallery Images</span>
            <button className="add-more" type='button' onClick={addGalleryField}>
              Add more <i className="material-icons-outlined">add</i>
            </button>
          </div>
          <Grid xs={1} lg={3} colGap={10}>
            {galleryFields.map((field, index) => (
              <Form.Item
                key={field.name}
                name={field.name}
                type="chooseFile"
                small
                rules={[{ required: index < 3, message: `Select ${field.label}` }]} // only first 3 required
              >
                <Field />
              </Form.Item>
            ))}
          </Grid>
        </div>

        {isEdit && (
          <Form.Item
            sm
            type="text"
            label="Slug"
            name="slug"
            placeholder="the-future-of-technology-how-innovations-are-shaping-our-lives"
            rules={[
              { required: true, message: 'Slug is required.' },
              { min: 3, message: 'Slug must be at least 3 characters long' },
              { max: 100, message: 'Slug cannot be longer than 100 characters.' },
              {
                pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message:
                  'Slug can only contain lowercase letters, numbers, and hyphens, and must not start or end with a hyphen.',
              },
            ]}>
            <Field />
          </Form.Item>
        )}
        <Button loading={loading} type="primary" htmlType="submit" style={{ margin: '0 auto' }}>
          Save
        </Button>
      </Form>
    </StyledProduct>
  );
}

export default CreateProduct;
