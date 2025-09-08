import styled, { css } from 'styled-components/macro';

// export const TableHolder = styled.div`
//   padding: ${({ noPadding }) => (noPadding ? '0' : '1.25rem 1.25rem 0.5625rem')};
//   background: var(--base-background-color);
//   padding-top: 10px;
//   border-radius: 20px;
//   ${({ responsive }) =>
//     responsive
//       ? css`
//           @media (min-width: 768px) {
//             padding: 1.25rem;
//           }
//           @media (min-width: 992px) {
//             background: var(--white);
//             padding: 0;
//           }
//         `
//       : css`
//           background: var(--white);
//         `}
// `;

// export const TableScroll = styled.div`
//   width: 100%;
//   /* overflow-x: auto; */
//   max-height: ${({ $height }) => $height && `${$height}px`};
// `;

// export const StyledTable = styled.table`
//   border-collapse: collapse;
//   width: 100%;
//   color: var(--primary-text-color);
//   border-spacing: 40px 20px; /* Remove cell spacing */
//   border-radius: 8px; /* Apply border-radius here */
//   overflow: hidden; /* Ensure overflow is hidden to respect border-radius */

//   ${({ responsive }) =>
//     responsive
//       ? css`
//           @media (min-width: 992px) {
//             min-width: ${({ $width }) => $width && `${$width}px`}; /* width on which horizontal scroll will appear */
//             min-width: 100%;
//           }
//         `
//       : css`
//           min-width: ${({ $width }) => $width && `${$width}px`};
//         `}
// `;

// export const Thead = styled.thead`
//   ${({ responsive }) =>
//     responsive
//       ? css`
//           @media (max-width: 991px) {
//             display: none;
//           }
//         `
//       : css`
//           display: table-header-group;
//         `}
// `;

// export const TBody = styled.tbody`
//   ${({ responsive }) =>
//     responsive &&
//     css`
//       @media (max-width: 991px) {
//         display: grid;
//         grid-template-columns: repeat(2, minmax(0px, 1fr));
//         gap: 10px;
//       }

//       @media (max-width: 767px) {
//         grid-template-columns: repeat(1, minmax(0px, 1fr));
//       }
//     `}
// `;

// export const NoRecordFound = styled.span`
//   display: block;
//   max-width: 200px;
//   padding: 15px 10px 13px;
//   margin: 15px auto;
//   border-radius: 5px;
//   color: var(--danger);
//   background: #ffebeb;
//   text-align: center;
// `;

export const TableHolder = styled.div`
  padding: ${({ noPadding }) => (noPadding ? '0' : '1.25rem 1.25rem 0.5625rem')};
  background: var(--base-background-color);
  padding-top: 10px;
  /* border-radius: 20px; */
  overflow: hidden;

  @media (min-width: 1200px) {
    min-height: ${({ $minHeight }) => $minHeight && $minHeight};
  }

  ${({ responsive }) =>
    responsive
      ? css`
          @media (min-width: 768px) {
            /* padding: 1.25rem; */
            padding: 0;
          }
          @media (min-width: 992px) {
            background: var(--white);
            padding: 0;
          }
        `
      : css`
          background: var(--white);
        `}
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  max-height: ${({ $height }) => $height && `${$height}px`};
  /* -ms-overflow-style: none; 
  scrollbar-width: none;  */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: ${({ $width }) => ($width ? `${$width}px` : 'auto')};
  color: var(--primary-text-color);
  border-spacing: 0;

  ${({ responsive }) =>
    responsive
      ? css`
          @media (max-width: 1230px) {
            width: 100%;
            min-width: 1200px;
          }
          @media (max-width: 991px) {
            width: 100%;
            min-width: 350px;
          }
        `
      : css`
          width: 100%;
        `}
`;

export const Thead = styled.thead`
  display: table-header-group;

  ${({ responsive }) =>
    responsive
      ? css`
          @media (max-width: 991px) {
            display: none;
          }
        `
      : css`
          display: table-header-group;
        `}
`;

export const TBody = styled.tbody`
  display: table-row-group;

  ${({ responsive }) =>
    responsive &&
    css`
      @media (max-width: 991px) {
        display: block;

        tr {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      }
      @media (max-width: 480px) {
        tr {
          align-items: center;
        }
      }
    `}
`;

export const NoRecordFound = styled.span`
  display: block;
  max-width: 200px;
  padding: 15px 10px 13px;
  margin: 15px auto;
  border-radius: 5px;
  color: var(--danger);
  background: #ffebeb;
  text-align: center;
`;
