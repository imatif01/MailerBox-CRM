import styled, { css } from 'styled-components';

export const UploadFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${({ $invalid }) => ($invalid ? '1px solid red' : '1px solid #ddd')};
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: border-color var(--animation-speed) ease-in-out;

  &.after-drop {
    padding: 10px;
  }

  .drop-text {
    margin: ${({ $small }) => ($small ? '0' : '0 0 30px')};
  }

  h4 {
    margin: 5px;
  }

  i.icon {
    font-size: 60px;
    line-height: 1;
    margin: 0;
    transition: linear 0.3s;
    width: 35px;
    height: 35px;
    border-radius: 30px;
    fill: var(--28-b-781, #28b781);
    background-color: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SelectedFiles = styled.div`
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  ${({ $small }) =>
    $small &&
    css`
      height: auto;
      padding: 0 !important;

      .files-holder {
        display: block !important;
        padding: 0 !important;
        border: none !important;
        margin: 0 !important;
      }
      .files {
        display: block !important;
        margin: 0 0 10px;
      }

      img {
        width: 100%;
        height: 120px;
        margin: 0 0 5px;
      }

      .delete-btn {
        margin: 0 auto;
      }
    `}

  .files-holder {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin: 0 0 10px;

    .files {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      line-height: 17px;

      @media (max-width: 575px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    button {
      display: block;
      width: 70px;
      max-width: 70px;
      padding: 7px 5px;
      border-radius: 5px;
    }
  }
`;
