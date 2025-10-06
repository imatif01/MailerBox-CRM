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
import productCategoryService from 'services/productCategoryService';
import productIndustryService from 'services/ProductIndustryService';
import productStyleService from 'services/ProductStylesService';
import productService from 'services/ProductService';

function CreateProduct({ isEdit, productData, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const galleryImages = [
    { id: 1, name: 'gallery_img_1', label: 'Gallery Image 1', file: null, path: '', alt: '' },
    { id: 2, name: 'gallery_img_2', label: 'Gallery Image 2', file: null, path: '', alt: '' },
    { id: 3, name: 'gallery_img_3', label: 'Gallery Image 3', file: null, path: '', alt: '' },
  ];

  const [galleryFields, setGalleryFields] = useState(galleryImages);
  const { product_categories_data } = productCategoryService.GetProductCategories({ getAll: true }, refetch);
  const { product_industries_data } = productIndustryService.GetProductIndustries({ getAll: true }, refetch);
  const { product_styles_data } = productStyleService.GetProductStyles({ getAll: true }, refetch);

  const categoryOpts = useMemo(() => {
    return product_categories_data?.categories.map(category => ({
      label: category?.title,
      value: category?._id,
    }));
  }, [product_categories_data]);

  const industryOpts = useMemo(() => {
    return product_industries_data?.industries?.map(industry => ({
      label: industry?.title,
      value: industry?._id,
    }));
  }, [product_industries_data]);

  const styleOpts = useMemo(() => {
    return product_styles_data?.styles?.map(style => ({
      label: style?.title,
      value: style?._id,
    }));
  }, [product_styles_data]);

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        title: productData?.title,
        metaTitle: productData?.metaTitle,
        metaDescription: productData?.metaDescription,
        category: categoryOpts?.find(data => data.value === productData?.category?._id),
        bannerImg: productData?.bannerImg,
        keywords: productData?.keywords?.map(item => item),
        slug: productData?.slug,
      });
      setDescription(productData?.description);
    }
  }, [productData, categoryOpts]);

  const onSubmit = async data => {
    let desc = description || '';

    setError(null);
    setLoading(true);
    console.log(data?.featureImg);
    const productData = {
      title: data?.title,
      sku: data?.sku,
      categories: data?.category,
      industries: data?.industry,
      styles: data?.style,
      metaTitle: data?.metaTitle,
      metaDescription: data?.metaDescription,
      keywords: data?.keywords,
      shortDescription: data?.shortDescription,
      featureImage: data?.featureImg,
      featureImageAlt: data?.featureAlt,
      galleryImages: galleryFields?.map(i => i),
      galleryImagesAlt: galleryFields?.map(i => i?.alt),
      featureDetails: {
        first: [
          {
            title: data?.first_row_title,
            description: data?.first_row_feature_description,
          },
          {
            firstFeatureTitle: data?.first_row_first_feature_title,
            firstFeatureDescription: data?.first_row_first_feature_title,
          },
          {
            secondFeatureTitle: data?.first_row_second_feature_title,
            secondFeatureDescription: data?.first_row_second_feature_description,
          },
        ],
        second: [
          {
            title: data?.second_row_title,
            description: data?.second_row_feature_description,
          },
          {
            firstFeatureTitle: data?.second_row_first_feature_title,
            firstFeatureDescription: data?.second_row_first_feature_title,
          },
          {
            secondFeatureTitle: data?.second_row_second_feature_title,
            secondFeatureDescription: data?.second_row_second_feature_description,
          },
        ],
        third: [
          {
            title: data?.third_row_feature_title,
            description: data?.third_row_feature_description,
          },
          {
            firstFeatureTitle: data?.third_row_first_feature_title,
            firstFeatureDescription: data?.third_row_first_feature_title,
          },
          {
            secondFeatureTitle: data?.third_row_second_feature_title,
            secondFeatureDescription: data?.third_row_second_feature_description,
          },
        ],
      },
      slug: data?.slug,
    };
    console.log(productData);

    try {
      let res;
      if (isEdit) {
        await productService.updateProduct(products_data?._id, convertToFormData(productData));
      } else {
        res = await productService.createProduct(convertToFormData(productData));
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

  // const addGalleryField = () => {
  //   const nextIndex = galleryFields.length + 1;
  //   setGalleryFields(prev => [
  //     ...prev,
  //     { name: `gallery_img_${nextIndex}`, label: `Gallery Image ${nextIndex}`, alt: '' },
  //   ]);
  // };

  const addGalleryField = () => {
    const nextIndex = galleryFields.length + 1;
    setGalleryFields(prev => [
      ...prev,
      {
        id: nextIndex,
        name: `gallery_img_${nextIndex}`,
        label: `Gallery Image ${nextIndex}`,
        file: null,
        path: '',
        alt: '',
      },
    ]);
  };

  // const updateGalleryAlt = (index, value) => {
  //   setGalleryFields(prev => {
  //     const updated = [...prev];
  //     updated[index].alt = value;
  //     return updated;
  //   });
  // };

  const updateGalleryFile = (index, file, path) => {
    setGalleryFields(prev => {
      const updated = [...prev];
      updated[index].file = file;
      updated[index].path = path;
      return updated;
    });
    form.setFieldsValue({
      [galleryFields[index].name]: file,
    });
  };

  const updateGalleryAlt = (index, alt) => {
    setGalleryFields(prev => {
      const updated = [...prev];
      updated[index].alt = alt;
      return updated;
    });
  };

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
              { required: false, message: 'Please enter post title' },
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
            rules={[{ required: false, message: 'Please enter sku' }]}>
            <Field />
          </Form.Item>
          <Form.Item
            sm
            isMulti
            options={categoryOpts}
            isSearchable
            name="category"
            label="Category"
            placeholder="Select Category"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[
              { required: false, message: 'Select atleast one cateogry' },
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
            options={industryOpts}
            isSearchable
            name="industry"
            label="Industry"
            placeholder="Select material"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[
              { required: false, message: 'Select atleast one cateogry' },
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
            options={styleOpts}
            isSearchable
            name="style"
            label="style"
            placeholder="Select style"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[
              { required: false, message: 'Select atleast one cateogry' },
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
              { required: false, message: 'Please enter meta title' },
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
            label="Meta Description"
            name="metaDescription"
            placeholder="Metadescription"
            rules={[
              { required: false, message: 'Please enter post meta description' },
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
            rules={[{ required: false, message: 'Please enter post keywords' }]}>
            <Field />
          </Form.Item>
        </Grid>
        <div className="product-description">
          <Form.Item
            sm
            type="textarea"
            label="Short Description"
            name="shortDescription"
            placeholder="Short Descrption"
            rules={[{ required: false, message: 'Please enter sku' }]}>
            <Field />
          </Form.Item>
        </div>
        <div className="upload-field-holder feature">
          <Form.Item
            label="Feature Image"
            name="featureImg"
            placeholder="Select Banner Image"
            displayFile={productData?.featureImg || null}
            type="chooseFile"
            noMargin
            rules={[{ required: false, message: 'Select Banner Image' }]}>
            <Field />
          </Form.Item>

          <Form.Item
            type="text"
            placeholder="Alt"
            name="featureAlt"
            sm
            noMargin
            rules={[{ required: false, message: 'Enter Alt' }]}>
            <Field />
          </Form.Item>
        </div>

        <div className="product-gallery-images">
          <div className="head">
            <span className="label">Gallery Images</span>
            <button className="add-more" type="button" onClick={addGalleryField}>
              Add more <i className="material-icons-outlined">add</i>
            </button>
          </div>
          <Grid xs={1} lg={3} colGap={10} rowGap={10}>
            {galleryFields?.map((field, index) => (
              <div className="upload-field-holder" key={field?.id}>
                <Form.Item
                  name={field?.name}
                  type="chooseFile"
                  small
                  value={field?.file}
                  onChange={(file, path) => updateGalleryFile(index, file, path)}
                  rules={[{ required: index < 3, message: `Select ${field?.label}` }]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  name={`alt_${field?.name}`}
                  type="text"
                  placeholder="Alt"
                  sm
                  rules={[{ required: false, message: 'Enter Alt' }]}>
                  <Field />
                </Form.Item>
              </div>
            ))}
          </Grid>
        </div>
        <div className="feature-detail-holder">
          <span className="label">Feature Details</span>
          <span className="label">First</span>
          <Grid xs={1} lg={2} colGap={10}>
            <div>
              <Form.Item
                label="Title"
                name="first_row_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="Descripion"
                  name="first_row_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                label="First Feauture Title"
                name="first_row_first_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="First Feaure Descripion"
                  name="first_row_first_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                label="Second Feauture Title"
                name="first_row_second_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="Second Feaure Descripion"
                  name="first_row_second_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
          </Grid>
          <span className="label">Second</span>
          <Grid xs={1} lg={2} colGap={10}>
            <div>
              <Form.Item
                label="Title"
                name="second_row_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="Descripion"
                  name="second_row_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                label="First Feauture Title"
                name="second_row_first_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="First Feaure Descripion"
                  name="second_row_first_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                label="Second Feauture Title"
                name="second_row_second_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="Second Feaure Descripion"
                  name="second_row_second_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
          </Grid>
          <span className="label">Third</span>
          <Grid xs={1} lg={2} colGap={10}>
            <div>
              <Form.Item
                label="Title"
                name="third_row_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="Descripion"
                  name="third_row_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                label="First Feauture Title"
                name="third_row_first_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="First Feaure Descripion"
                  name="third_row_first_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                label="Second Feauture Title"
                name="third_row_second_feature_title"
                type="text"
                sm
                rules={[{ required: false, message: 'Enter title' }]}>
                <Field />
              </Form.Item>
              <div className="product-description">
                <Form.Item
                  label="Second Feaure Descripion"
                  name="third_row_second_feature_description"
                  type="textarea"
                  rules={[{ required: false, message: 'Enter title' }]}>
                  <Field />
                </Form.Item>
              </div>
            </div>
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
              { required: false, message: 'Slug is required.' },
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
