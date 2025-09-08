import React from 'react';
import { StyledMenu, StyledMenuButton, StyledMenuItem } from './Menu.styles';

export function MenuItem({ children, icon, ...props }) {
  return (
    <StyledMenuItem onSelect={() => {}} {...props}>
      {icon ?? null}
      {children}
    </StyledMenuItem>
  );
}

function MenuButton({ children, icon, ...props }) {
  return (
    <StyledMenu menuButton={<StyledMenuButton>{icon}</StyledMenuButton>} {...props}>
      {children}
    </StyledMenu>
  );
}

export default MenuButton;
