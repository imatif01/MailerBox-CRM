import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Header from 'components/molecules/Header';

import { useParams } from 'react-router-dom';

function TopBar() {
  const { view: title, child } = useParams();

  return (
    <Header
      title={
        child
          ? child.split('-').join(' ')
          : title
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
      }
    />
  );
}

export default TopBar;
