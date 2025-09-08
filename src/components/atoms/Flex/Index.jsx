import React from 'react';
import PropTypes from 'prop-types';
import { StyledFlex } from './Flex.styles';

const Flex = ({ children, direction, justify, align, wrap, gap, ...props }) => (
  <StyledFlex direction={direction} justify={justify} align={align} wrap={wrap} gap={gap} {...props}>
    {children}
  </StyledFlex>
);

Flex.propTypes = {
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
  align: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  children: PropTypes.node,
};

export default Flex;
