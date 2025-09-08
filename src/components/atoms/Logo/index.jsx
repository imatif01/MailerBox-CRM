import React from 'react';

import logo from 'assets/images/logo.svg';
import { LogoHolder, Img } from './Logo.styles';

function LogoComp() {
  return (
    <LogoHolder>
      <Img src={logo} alt="logo" />
    </LogoHolder>
  );
}

export default LogoComp;
