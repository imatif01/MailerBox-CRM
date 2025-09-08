import React from 'react';

import { StyledInputIcon } from './InputIcon.styles';

function InputIcon({ prefix, invalid, suffix, makeSuffixPointable, children, disabled, ...props }) {
  return (
    <>
      <StyledInputIcon
        $showPointer={makeSuffixPointable}
        $prefix={prefix}
        $invalid={invalid}
        $suffix={suffix}
        disabled={disabled}
        {...props}>
        {children}
      </StyledInputIcon>
    </>
  );
}

export default InputIcon;
