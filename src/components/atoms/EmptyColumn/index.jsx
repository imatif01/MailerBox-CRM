import React from 'react';
import { StyledEmptyColumn } from './EmptyColumn.styles';

function EmptyColumn({ text, ...props }) {
  return (
    <>
      <StyledEmptyColumn {...props}>{text}</StyledEmptyColumn>
    </>
  );
}

export default EmptyColumn;
