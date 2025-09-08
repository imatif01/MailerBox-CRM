import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'context/authContext';
import Button from 'components/atoms/Button';
import Grid from 'components/atoms/Grid';
import Select from 'components/atoms/Select';
import Field from 'components/molecules/Field';
import Form, { useForm } from 'components/molecules/Form';
import Toast from 'components/molecules/Toast';
import testimonialService from 'services/testimonialService';
import { Country } from 'country-state-city';
import { descriptionRegex } from 'common/regexes';
import { convertToFormData } from 'helpers/common';

function TestimonialForm({ testimonial, onClose = () => {} }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const { refetch } = useContext(AuthContext);

  useEffect(() => {
    if (testimonial) {
      form.setFieldsValue({
        author: testimonial.author,
        text: testimonial.text,
        country: countries?.find(({ value }) => value === testimonial?.country),
        image: testimonial.image,
      });
    }
  }, [testimonial, countries]);

  const onSubmit = async data => {
    try {
      setLoading(true);
      if (testimonial) {
        await testimonialService.updateTestimonial(
          testimonial.id,
          convertToFormData({
            author: data?.author,
            text: data?.text,
            country: data?.country?.value,
            image: data?.image,
          }),
        );
      } else {
        await testimonialService.createTestimonial(convertToFormData({ ...data, country: data?.country?.value }));
      }
      refetch();
      onClose();
      setLoading(false);
      Toast({
        type: 'success',
        message: 'Testimonial saved successfully',
      });
    } catch ({ message }) {
      setLoading(false);
      Toast({
        type: 'error',
        message: message,
      });
    }
  };

  useEffect(() => {
    setCountries(
      Country.getAllCountries()?.map(country => ({
        label: country?.name,
        value: country?.isoCode,
      })),
    );
  }, []);

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
          label="Author"
          name="author"
          placeholder="Jean Paul Sartre"
          rules={[
            { required: true, message: 'Please enter author name' },
            {
              pattern: /^.{0,40}$/,
              message: 'Maximum Character Length Is 40',
            },
          ]}>
          <Field />
        </Form.Item>
        <Form.Item
          sm
          options={countries || []}
          name="country"
          label="Country"
          placeholder="Select Country"
          rules={[{ required: true, message: 'Select counrty' }]}>
          <Select />
        </Form.Item>
      </Grid>
      <Form.Item
        sm
        type="textarea"
        label="Testimonial Description"
        name="text"
        placeholder="Find our dream home a seamless experience. Their expert guidance and attention to detail were invaluable throughout the process!"
        rules={[
          { required: true, message: 'Testimonial is required.' },
          { min: 10, message: 'Testimonial must be at least 10 characters long.' },
          { max: 1000, message: 'Description must not exceed 1000 characters.' },
          { pattern: descriptionRegex, message: 'Testimonial can contain any characters, including newlines.' },
        ]}>
        <Field />
      </Form.Item>
      <Form.Item
        label="Author Image"
        name="image"
        placeholder="Select Author Image"
        displayFile={testimonial?.image || null}
        type="chooseFile">
        <Field />
      </Form.Item>
      <Button loading={loading} type="primary" htmlType="submit" style={{ margin: '0 auto' }}>
        Save
      </Button>
    </Form>
  );
}

export default TestimonialForm;
