import styled, { css } from 'styled-components/macro';

export const TableRow = styled.tr`
  border: none;
  border-bottom: 1px solid var(--table-border);
  /* background: beige; */
  background: ${({ customBg }) => (customBg ? 'rgb(255 255 255)' : 'none')};
  display: table-row;
  width: 100%;
  border-radius: 0;
  padding: 0;
  ${({ responsive }) =>
    responsive &&
    css`
      @media (max-width: 991px) {
        background: var(--white);
        border: 1px solid var(--table-border);
        display: block;
        /* padding: 40px 15px 15px; */
        padding: 15px;
        margin: 0 0 10px;
        position: relative;
      }
    `}
  /* @media (max-width: 480px) {
    th,
    td {
      font-size: 9px;
    }
    .tablerow {
      font-size: 9px;
    }
  } */
  @media (min-width: 768px) {
    /* border-radius: 10px; */
  }

  &:hover {
    td {
      @media (min-width: 992px) {
        transition: background var(--animation-speed) ease-in-out;
        /* background: var(--gray-3); */
        background: linear-gradient(90deg, rgba(39, 131, 236, 0.1) 0%, rgba(30, 220, 227, 0.1) 100%);

        cursor: pointer;
      }
    }
  }
`;

export default TableRow;
