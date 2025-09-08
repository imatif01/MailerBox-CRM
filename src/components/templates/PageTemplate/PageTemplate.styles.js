import styled, { css } from 'styled-components/macro';

export const Content = styled.div`
  position: relative;
  padding: 5.9375rem 1.25rem 1.25rem;
  transition: all ease-in-out 0.3s;

  .upper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .dashboard {
    width: 100%;
  }
  .upper-head {
    padding: 0px;
  }
  &::before {
    content: '';
    width: 100%;
    height: 67px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--white);
  }

  @media (min-width: 992px) {
    padding: 80px 20px 20px 290px;
    /* ${({ isActive }) =>
      isActive &&
      css`
        padding: 80px 20px 20px 290px;
      `}; */
  }
  @media (max-width: 991px) {
    padding: 80px 16px 16px;

    .upper {
      width: 100%;
      margin-left: 0;
      gap: 10px;
    }
  }
  .user-actions-container {
    position: absolute;
    right: 20px;
    top: -5px;
    z-index: 9999;

    @media (max-width: 991px) {
      position: fixed;
    }
    @media (max-width: 576px) {
      top: 3px;
    }
    @media (max-width: 520px) {
      position: fixed;
    }
  }
`;
