import React from 'react';
import styled from 'styled-components/macro';

import { StyledLabel, RequiredAsterisk } from './Label.styles';

function Label({ children, onlyRead, required, labelIcon, clear, onClear = () => {}, clrWhite, ...props }) {
  return (
    <StyledLabel $onlyRead={onlyRead} labelIcon={labelIcon} {...props}>
      <div css="display: flex; justify-content: space-between;">
        <div css={{ display: 'flex', alignItems: 'center', color: clrWhite && '#fff' }}>
          {required ? <RequiredAsterisk>*</RequiredAsterisk> : ''}
          {children}
        </div>
        {clear && (
          <span css="color: var(--danger); cursor: pointer;" onClick={onClear}>
            Clear
          </span>
        )}
      </div>
      {labelIcon && <span css="margin-left: 5px;">{labelIcon}</span>}
    </StyledLabel>
  );
}

export default Label;
