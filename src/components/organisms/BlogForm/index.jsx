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

function BlogForm({ isEdit, blogData, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const { category_data, category_loading } = categoryService.GetCategories({ getAll: true }, refetch);
  const { authors_data } = authorService.GetAuthors({ getAll: true }, refetch);

  const categoryOpts = useMemo(() => {
    return category_data?.categories.map(category => ({
      label: category.title,
      value: category._id,
    }));
  }, [category_data]);

  const authorsOpts = useMemo(() => {
    return authors_data?.authors.map(author => ({
      label: author.name,
      value: author.id,
    }));
  }, [authors_data]);

  // const languageOptions = [{ label: 'English', value: 'en' }];
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
        // authorId: authorsOpts?.find(data => data.value === blogData?.author?.id),
        category: categoryOpts?.find(data => data.value === blogData?.category?._id),
        bannerImg: blogData?.bannerImg,
        keywords:blogData?.keywords.map((item)=>item),
        slug: blogData?.slug,
      });
      setDescription(blogData?.description);
    }
  }, [blogData, categoryOpts, authorsOpts]);

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
      keywords:data?.keywords,
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

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Grid
        xs={1}
        lg={2}
        colGap={20}
        css={`
          align-items: center;
        `}>
        {/* {!isEdit && ( */}
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
        {/* )} */}
        {/* {!isEdit && (
          <Form.Item
            sm
            options={languageOptions}
            isSearchable
            name="language"
            label="Language"
            placeholder="Select Language"
            hideSelectedOptions={false}
            closeMenuOnSelect={true}
            rules={[{ required: true, message: 'Select atleast one language' }]}>
            <Select />
          </Form.Item>
        )} */}
        <Form.Item
          sm
          options={categoryOpts}
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

        {/* {!isEdit && ( */}
        <>
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
            rules={[
              { required: true, message: 'Please enter post keywords' },
             
            ]}>
            <Field />
          </Form.Item>
        </>
        {/* )} */}

        {/* <Form.Item
          sm
          options={authorsOpts}
          isSearchable
          name="authorId"
          label="Author"
          placeholder="Select Author"
          hideSelectedOptions={false}
          closeMenuOnSelect={true}
          rules={[
            { required: true, message: 'Select atleast one author' },
            // {
            //   transform: value => !value?.length,
            //   message: 'Select at least one author',
            // },
          ]}>
          <Select />
        </Form.Item> */}
      </Grid>
      {/* {!isEdit && ( */}
      <Grid
        xs={1}
        lg={1}
        css={`
          align-items: center;
        `}>
        <div
          css={`
            padding-bottom: 10px;
          `}>
          <span style={{ color: 'red' }}>* </span>
          Editor
        </div>
         <Editor
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={description}
          init={{
            image_resizing: true,
            height: 500,
            plugins: [
              'advlist',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
              'directionality',
            ],
            toolbar:
              'undo redo | casechange blocks | bold italic backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist checklist outdent indent | removeformat | a11ycheck preview code table help | link' +
              'ltr rtl | a11ycheck code table help | link',

            link_rel_list: [
              {
                title: 'Do Follow',
                value: 'dofollow',
              },
              {
                title: 'No Follow',
                value: 'nofollow',
              },
            ],
            content_style: 'img { width:100%; height:auto; }',
            menubar: 'insert',
            a11y_advanced_options: true,
            // directionality: lang?.value === 'ar' ? 'rtl' : 'ltr',
            setup: function (editor) {
              let savedSelection;
              editor.on('keyup', function (e) {
                if (e.keyCode === 32 || e.keyCode === 13) {
                  editor.undoManager.add();
                  savedSelection = editor.selection.getBookmark(2, true);
                }
              });
              editor.on('undo', function (e) {
                if (savedSelection) {
                  editor.selection.moveToBookmark(savedSelection);
                }
              });

              editor.on('paste', function (e) {
                var clipboardData = e.clipboardData || window.clipboardData;
                var items = clipboardData.items;
                handleImageSizeLimit(e, items, editor);
              });

              editor.on('drop', function (e) {
                var items = e.dataTransfer.items;

                handleImageSizeLimit(e, items, editor);
              });
            },
          }}
        />
        <Error>{error}</Error>
      </Grid>
      {/* )} */}
      <Form.Item
        label="Banner Image"
        name="bannerImg"
        placeholder="Select Banner Image"
        displayFile={blogData?.bannerImg || null}
        type="chooseFile"
        rules={[{ required: true, message: 'Select Banner Image' }]}>
        <Field />
      </Form.Item>

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
  );
}

export default BlogForm;
