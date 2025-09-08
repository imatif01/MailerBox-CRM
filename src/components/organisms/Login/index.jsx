import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { AuthContext } from 'context/authContext';
import Heading from 'components/atoms/Heading';
import Logo from 'components/atoms/Logo';
import Button from 'components/atoms/Button';
import Tooltip from 'components/atoms/Tooltip';
import LoginTemplate from '../../templates/LoginTemplate';
import Field from '../../molecules/Field';
import Form, { useForm } from '../../molecules/Form';

import { SubTitle, FormHolder, StyledForm, LogoWrap } from './Login.styles';
import logoImg from 'assets/images/logo.svg';

function Login() {
  const [form] = useForm();
  const { onLogin, loading_user } = useContext(AuthContext);

  return (
    <LoginTemplate>
      <FormHolder>
        <LogoWrap>
          <a href="/">
            <img src={logoImg} alt="Logo" />
          </a>
        </LogoWrap>
        <Heading level={1}>Sign in</Heading>
        <SubTitle>Hello there! Sign in and start managing Houdiny CRM.</SubTitle>
        <StyledForm form={form} onSubmit={onLogin}>
          <Form.Item
            type="email"
            name="email"
            clrWhite
            placeholder="Enter Email Address"
            prefix={<i className="material-icons-outlined">email</i>}
            rules={[
              {
                required: true,
                message: 'Email is Required',
              },
              { email: true },
            ]}>
            <Field />
          </Form.Item>
          <Form.Item
            type="password"
            name="password"
            placeholder="Your Password"
            clrWhite
            prefix={<i className="material-icons-outlined">lock</i>}
            rules={[
              {
                required: true,
              },
              {
                pattern: /^.{8,64}$/,
                message: 'Minimum Character Length is 8 and Maximum Character Length is 64',
              },
            ]}>
            <Field />
          </Form.Item>
          <div className="btn-holder">
            <Button loading={loading_user} type="primary" htmlType="submit">
              Sign in
            </Button>
          </div>
        </StyledForm>
      </FormHolder>
    </LoginTemplate>
  );
}

export default Login;
