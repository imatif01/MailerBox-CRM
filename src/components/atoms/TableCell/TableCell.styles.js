import styled, { css } from 'styled-components/macro';

const styles = css`
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  font-size: var(--font-size-xs);
  font-weight: bold;
  ${({ responsive }) =>
    responsive
      ? css`
          @media (min-width: 992px) {
            display: table-cell;
            padding: 0.8rem 0.5rem;
            min-width: 120px;
            /* white-space: nowrap; */

            &:first-child {
              padding-left: 1rem;
            }
            &:last-child {
              padding-right: 1rem;
              justify-content: flex-end;
            }
          }
        `
      : css`
          display: table-cell;
          padding: 0.8rem 0.5rem;
          &:first-child {
            padding-left: 1rem;
          }
          &:last-child {
            padding-right: 1rem;
          }
        `}
`;

export const Th = styled.th`
  ${styles}
  font-size: 0.87rem;
  font-family: var(--base-font-poppins);
  font-weight: 600;
  background: var(--white);
  padding-top: 1.6rem;
  padding-bottom: 0.9375rem;
  text-transform: capitalize;
  color: var(--primary);

  /* @media (max-width: 480px) {
    font-size: 9px;
  } */

  /* .tablerow {
    @media (max-width: 480px) {
      font-size: 9px;
    }
  } */
`;

export const Td = styled.td`
  .tablerow {
    font-size: 14px;
    font-weight: 600;
    color: '#424954';
    padding: '0px';

    /* @media (max-width: 480px) {
      font-size: 9px;
    } */
  }
  ${styles}
  ${({ responsive }) =>
    responsive &&
    css`
      display: flex;
      justify-content: space-between;

      @media (max-width: 991px) {
        padding: 10px 15px;
        width: 100%;
        text-align: right;

        &:last-child {
          padding: 0;
        }
        &:nth-child(odd) {
          background: var(--gray-3);
          border-radius: 8px;
        }
      }
      &:before {
        content: attr(data-th);
        font-weight: bold;
        display: inline-block;
        color: var(--gray);
        padding-right: 12px;

        @media (min-width: 992px) {
          display: none;
        }
      }
    `} /* @media (max-width: 480px) {
    font-size: 9px;
  } */
`;
