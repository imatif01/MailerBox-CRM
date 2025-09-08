import React from 'react';

import { toast } from 'react-toastify';
import AlertIcon from 'components/atoms/AlertIcon';
import { StyledAlert, Message } from './Toast.styles';

function Toast({ type, message, ...props }) {
  return toast(
    <>
      <StyledAlert $type={type} {...props}>
        <AlertIcon $type={type} />
        <Message $type={type}>{message}</Message>
      </StyledAlert>
    </>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
    },
  );
}

export default Toast;
