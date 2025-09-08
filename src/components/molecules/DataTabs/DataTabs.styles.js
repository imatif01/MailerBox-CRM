import styled, { css } from 'styled-components/macro';

export const StyledTabs = styled.div`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      flex-grow: 1;
      margin: 10px 0px;
    `}
  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      display: flex;
      margin: 0 0 15px 0;
    `}
`;

export const Wrap = styled.div`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      overflow-x: auto;
      border-bottom: 1px solid #e6e8ec;
    `}
  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      overflow-y: auto;
      overflow-x: hidden;
      width: 180px;
      margin-bottom: 15px;
      height: 450px;
      padding: 0 8px;
      border-right: 1px solid #e6e8ec;
    `}
  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
  }
  position: relative;
`;

export const StyledTabList = styled.div`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      display: flex;
      white-space: nowrap;
    `}

  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      button {
        font-size: 1rem;
        font-family: var(--base-font-poppins);
        font-weight: 600;
        line-height: 27px;
        margin-bottom: 10px;
        color: #a0a0a0;
        transition: all 0.4s ease-in;
      }
    `}
  
  z-index: 1;
  margin: 0 0 3px;
  position: relative;
`;

export const TabBtn = styled.div`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
      padding: 0 5px;

      @media (min-width: 768px) {
        padding: 0 5px;
      }
    `}
  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      padding: 0 0;
    `}
  flex-shrink: 0;
  &:first-child {
    padding-left: 0;
  }
`;

export const StyledTab = styled.button`
  ${({ orientation }) =>
    orientation === 'horizontal' &&
    css`
  padding: 20px 5px;
  border-radius: 6px;
  @media (min-width: 768px) {
    padding: 14px 10px;
  }
  }
  }
        `}
  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      padding: 10px 0px;
      border-radius: 0px;
      border-bottom: 1px solid transparent;
      width: 100%;
      text-align: left;
    `}
  font-size: var(--font-size-sm);
  line-height: 16px;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--text-color-gray);
  position: relative;

  &:after {
    display: none;
    visibility: hidden;
    opacity: 0;
    transition: ease-in-out 0.5s;
    content: '';
    position: absolute;
    left: 50%;
    right: 0;
    bottom: 0;
    transform: translateX(-50%);
    height: 1px;
    width: 0;
    background: var(--secondary-text-color);
  }

  ${
    '' /* &:hover {
    background: var(--primary);
    color: var(--white);

    &:after {
      visibility: visible;
      opacity: 1;
      width: 100%;
    }
  } */
  }
  &:hover {
    color: var(--primary);
    border-bottom: 1px solid var(--primary);

    &:after {
      visibility: visible;
      opacity: 1;
      width: 100%;
    }
  }
  ${({ active }) =>
    active &&
    css`
      color: var(--primary) !important;
      border-bottom: 1px solid var(--primary);

      &:after {
        visibility: visible;
        opacity: 1;
        width: 100%;
      }
    `}
`;

export const StyledTabPanels = styled.div`
  /* overflow: hidden; */
  padding: 0;

  @media (min-width: 768px) {
    padding: 0px 0;
  }
`;

export const StyledTabPanel = styled.div`
  position: relative;
  padding-left: 15px;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  height: 0;
  ${'' /* transition: all 0.3s ease-in-out; */}
  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      visibility: visible;
      height: auto;
    `}
`;
