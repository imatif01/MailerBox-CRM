import React, { useContext, useEffect, useState, useRef } from 'react';
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
import { Editor } from '@tinymce/tinymce-react';

function AddNewLanguageBlogForm({ id, currentLanguages, blogData, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { refetch } = useContext(AuthContext);
  const [description, setDescription] = useState('');

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'Dutch', value: 'nl' },
    { label: 'German', value: 'de' },
  ]?.filter(ele => !currentLanguages.includes(ele?.value));

  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current && description) {
      editorRef.current.setContent(description);
    }
  }, [description]);

  const onSubmit = async data => {
    let desc = description;
    if (editorRef?.current) {
      desc = editorRef.current.getContent();
    }

    setLoading(true);
    try {
      const postData = {
        language: data?.language?.value,
        title: data.title,
        description: desc,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      };

      let res;
      res = await blogService.addBlogInNewLanguage(id, postData);

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
      </Grid>

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
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={description}
          init={{
            image_resizing: true,
            height: 500,
            paste_as_text: true,
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
              'help',
              'code',
              'wordcount',
              'directionality',
            ],
            toolbar:
              'undo redo | casechange blocks | bold italic backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help | link' +
              'ltr rtl | a11ycheck code table help | preview code | link',

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
                let clipboardData = e.clipboardData || window.clipboardData;
                let items = clipboardData.items;
                handleImageSizeLimit(e, items, editor);
              });

              editor.on('drop', function (e) {
                let items = e.dataTransfer.items;

                handleImageSizeLimit(e, items, editor);
              });
            },
          }}
        />
      </Grid>

      <Button loading={loading} type="primary" htmlType="submit" style={{ margin: '0 auto' }}>
        Save
      </Button>
    </Form>
  );
}

export default AddNewLanguageBlogForm;
