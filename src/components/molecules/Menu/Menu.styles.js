import styled, { keyframes } from 'styled-components/macro';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { menuSelector, menuItemSelector } from '@szhsin/react-menu/style-utils';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const menuShow = keyframes`
  from {
    opacity: 0;
  }
`;

const menuHide = keyframes`
  to {
    opacity: 0;
  }
`;

export const StyledMenu = styled(Menu)`
  ${menuSelector.name} {
    box-sizing: border-box;
    list-style: none;
    user-select: none;
    margin: 0px;
    padding: 5px 0px;
    border: none;
    box-shadow: 3px 18px 44px rgba(176, 183, 195, 0.28);
    min-width: 10rem;
    z-index: 999;
    border-radius: 0.4rem;
    background: var(--white);
  }

  ${menuSelector.stateOpening} {
    animation: ${menuShow} 0.15s ease-out;
  }

  ${menuSelector.stateClosing} {
    animation: ${menuHide} 0.2s ease-out forwards;
  }

  ${menuItemSelector.name} {
    display: flex;
    margin: 5px 0px;
    padding: 5px 10px;
    align-items: space-between;
    color: var(--primary-text-color);
  }

  ${menuItemSelector.name}:hover {
    background: var(--primary);
    color: var(--white);
  }
`;

export const StyledMenuButton = styled(MenuButton)`
  font-size: 20px;
`;

export const StyledMenuItem = styled(MenuItem)`
  [class^='material-icons-'],
  [class*=' material-icons-'] {
    margin-right: 0.5rem;
  }

  &.delete-btn {
    color: var(--danger);
  }

  &.detail-btn {
    color: var(--primary);
  }
`;
