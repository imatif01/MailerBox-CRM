import styled, { css } from 'styled-components/macro';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';

export const Background = styled.div`
  background: rgba(50, 59, 75, 0.3);
  backdrop-filter: blur(4px);
  z-index: 99;
  overflow-x: hidden;
  padding-left: 10px;
  padding-right: 10px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  opacity: 1;
`;

export const ModalContent = styled.div`
  border-radius: 16px;
  padding: 1.875rem;
  width: 100%;
  position: relative;
  margin: 10vh auto;
  outline: none;
  /* overflow-y: hidden;
  overflow-x: hidden; */

  .from-wrap {
    border-radius: 12px;
    background: #f2fff6;
    padding: 1.87rem;
  }

  .project-style {
    margin-bottom: 20px;
    p {
      font-weight: 600;
      line-height: 30px;
      size: 20px;
    }
  }

  @media (max-width: 575px) {
    padding: 25px 15px;
  }

  ${({ bgOpacity }) =>
    bgOpacity &&
    css`
      opacity: 0.9;
      backdrop-filter: blur(5px);
    `}
  .btn-close {
    /* background-color: transparent; */
  }
`;

export const CloseModalButton = styled(Button)`
  i {
    font-size: var(--font-size-base);
  }
  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: -12px;
      right: -5px;
    `}
`;

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 0.5rem;
  max-width: 544px;
  min-height: calc(100% - 1rem);
  ${({ $width }) =>
    $width &&
    css`
      max-width: ${$width}px;
    `}

  ${({ $xl }) =>
    $xl &&
    css`
      max-width: 1060px;
      display: flex;
      align-items: center;
      justify-content: center;
    `}

  ${({ $lg }) =>
    $lg &&
    css`
      max-width: 715px;
    `}

  ${({ $sm }) =>
    $sm &&
    css`
      max-width: 350px;
    `}

    
  @media (min-width: 576px) {
    margin: ${({ $lg }) => ($lg ? '1.75rem 0.625rem' : '1.75rem auto;')};
    min-height: calc(100% - 3.5rem);
  }
  @media (min-width: 730px) {
    margin: 1.75rem auto;
  }

  ${({ imgPreview }) =>
    imgPreview &&
    css`
      ${ModalContent} {
        padding: 10px;
        position: relative;
      }
      ${CloseModalButton} {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    `}
`;

export const ModalHeading = styled(Heading)`
  margin-bottom: 0;
  padding-right: 0.75rem;
  flex-grow: 1;
  @media (max-width: 575px) {
    font-size: var(--font-size-base);
    line-height: calc(var(--font-size-base) + 0.3125rem);
  }
`;
