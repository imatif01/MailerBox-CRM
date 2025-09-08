import styled, { css } from 'styled-components/macro';

export const StyledHeader = styled.header`
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary);
  padding: 0 15px;
  margin: 0 0 20px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: var(--z-35);
  border-bottom: 1px solid var(--white);

  @media (min-width: 992px) {
    height: auto;
    background: none;
    padding: 0 0 15px;
    margin: 0 0 20px;
    position: static;
  }

  ${({ profile }) =>
    profile &&
    css`
      @media (min-width: 992px) {
        display: none;
      }
    `}
`;

export const ButtonsHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 -5px;

  @media (min-width: 992px) {
    margin: 0 -5px;
  }
  > * {
    margin: 0 5px 0;
    @media (min-width: 992px) {
      margin: 0 5px;
    }
    @media (max-width: 1199px) {
      flex-shrink: 0;
    }
    @media (max-width: 575px) {
      padding: 0;
    }
    @media (min-width: 1200px) {
      &:not(:last-child) {
        width: auto;
        flex-shrink: 0;
      }
    }
  }
  @media (max-width: 991px) {
    [class^='icon-'],
    [class*=' icon-'] {
      color: var(--text-color-gray);
    }
  }
  .btn-restore {
    background-color: var(--white);
    border: none;
    &:hover {
      background-color: var(--primary);
      color: var(--white);
    }
  }
`;

export const MenuButton = styled.button`
  display: flex;
  color: var(--white);
  font-size: 25px;
  line-height: 1;
`;
