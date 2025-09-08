import styled, { css } from 'styled-components/macro';

export const Flex = styled.div`
  display: flex;
  flex-wrap: ${props => !props.nowrap && 'wrap'};

  ${props =>
    props.direction === 'column' &&
    css`
      flex-direction: column;
    `}

  ${props =>
    props.direction === 'columnReverse' &&
    css`
      flex-direction: column;
    `}

  ${props =>
    props.justify === 'center' &&
    css`
      justify-content: center;
    `}

  ${props =>
    props.justify === 'space-between' &&
    css`
      justify-content: space-between;
    `}

  ${props =>
    props.justify === 'end' &&
    css`
      justify-content: flex-end;
    `}

  ${props =>
    props.align === 'top' &&
    css`
      align-items: flex-start;
    `}

  ${props =>
    props.align === 'middle' &&
    css`
      align-items: center;
    `}

    ${props =>
    props.align === 'bottom' &&
    css`
      align-items: flex-end;
    `}
`;

export const Centered = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledFormGroup = styled.div`
  margin-bottom: ${({ $invalid, noMargin }) => ($invalid || noMargin ? '0px' : '1.625rem')};
  /* position: relative; */
`;

export const InputHolder = styled.div`
  position: relative;
`;

// export const ActionBtnHolder = styled.div`
//   display: grid;
//   grid-template-columns: repeat(${({ numOfBtns }) => (numOfBtns === 4 ? 4 : 5)}, minmax(20px, 20px));
//   align-items: center;
//   justify-content: flex-end;
//   position: absolute;
//   top: 5px;
//   right: 17px;
//   gap: 10px;
//   margin: 0 auto;
//   min-width: 180px;
//   .tooltip-holder {
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
//     /* display: inline-table; */

//     &.red_dot {
//       .detail-btn {
//         position: relative;

//         &:before {
//           content: '';
//           position: absolute;
//           top: 0;
//           right: 0;
//           width: 7px;
//           height: 7px;
//           border-radius: 50%;
//           background: var(--danger);
//         }
//       }
//     }
//   }
//   .tooltip-holder:only-child {
//     justify-content: flex-end;
//     @media (min-width: 992px) {
//       justify-content: center;
//     }
//     @media (max-width: 992px) {
//       grid-column: ${({ numOfBtns }) => (numOfBtns === 4 ? `span 4 / span 4` : `span 3 / span 3`)};
//     }
//   }
//   @media (min-width: 992px) {
//     position: static;
//   }
//   button {
//     font-size: var(--font-size-xl);
//     line-height: calc(var(--font-size-xl) + 0.3125rem);
//     display: flex;
//     align-items: center;

//     color: var(--white);
//     border-radius: 6px;
//     background-color: var(--primary);
//     opacity: 0.6;
//     width: 22px;
//     height: 22px;
//     justify-content: center;
//     i {
//       font-size: 14px;
//       max-width: 16px;
//     }
//   }
//   .btn-blink {
//     background-color: transparent;
//   }

//   .delete-btn {
//     color: var(--white);
//     border-radius: 6px;
//     background-color: var(--danger);
//     opacity: 0.6;
//     width: 22px;
//     height: 22px;
//     justify-content: center;
//     i {
//       font-size: 14px;
//     }
//   }

//   .detail-btn {
//     color: var(--primary);
//   }

//   /* .edit-btn{
//     color: var(--white);
//     border-radius: 6px;
//     background-color: var(--primary);
//     opacity: 0.6;
//     width: 22px;
//     height: 22px;
//     justify-content: center;
//     i{
//       font-size: 14px;
//     }
//   } */

//   .select-table {
//     width: 110px;
//     margin-top: 25px;
//     padding-right: 10px;
//     left: -30px;
//     .react-select__control {
//       height: 35px;
//       .react-select__placeholder {
//         font-size: 12px;
//       }
//       .react-select__input-container {
//         font-size: 12px;
//       }
//     }
//   }
// `;

export const ActionBtnHolder = styled.div`
  display: grid;
  grid-template-columns: ${({ numOfBtns }) =>
    numOfBtns === 2
      ? 'repeat(2, minmax(20px, 20px))'
      : numOfBtns === 4
      ? 'repeat(4, minmax(20px, 20px))'
      : numOfBtns === 5
      ? 'repeat(5, minmax(20px, 20px))'
      : 'repeat(5, minmax(20px, 20px))'};
  align-items: flex-end;
  justify-content: flex-end;
  /* position: absolute; */
  position: relative;
  top: 5px;
  grid-template-columns: ${({ numOfBtns }) =>
    numOfBtns === 2
      ? 'repeat(2, minmax(20px, 20px))'
      : numOfBtns === 4
      ? 'repeat(4, minmax(20px, 20px))'
      : numOfBtns === 5
      ? 'repeat(5, minmax(20px, 20px))'
      : 'repeat(5, minmax(20px, 20px))'};
  right: ${({ right }) => (right ? '' : '17px')};
  gap: 10px;
  margin: 0 auto;
  min-width: ${({ numOfBtns }) => (numOfBtns === 2 ? '60px' : '180px')}; // Adjust width for 2 buttons
  .tooltip-holder {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &.red_dot {
      .detail-btn {
        position: relative;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--danger);
        }
      }
    }
  }
  .tooltip-holder:only-child {
    justify-content: flex-end;
    @media (min-width: 992px) {
      justify-content: center;
    }
    @media (max-width: 992px) {
      grid-column: ${({ numOfBtns }) =>
        numOfBtns === 2 ? 'span 2 / span 2' : numOfBtns === 4 ? 'span 4 / span 4' : 'span 5 / span 5'};
    }
  }
  @media (min-width: 992px) {
    position: static;
  }
  @media (max-width: 991px) {
    min-width: 100%;
  }
  button {
    font-size: var(--font-size-xl);
    line-height: calc(var(--font-size-xl) + 0.3125rem);
    display: flex;
    align-items: center;
    color: var(--white);
    border-radius: 6px;
    background-color: var(--dark);
    width: 22px;
    height: 22px;
    justify-content: center;
    i {
      font-size: 14px;
      max-width: 16px;
    }
  }
  .btn-blink {
    background-color: transparent;
  }

  .delete-btn {
    color: var(--white);
    border-radius: 6px;
    background-color: var(--danger);
    opacity: 0.7;
    width: 22px;
    height: 22px;
    justify-content: center;
    i {
      font-size: 14px;
    }
  }

  .detail-btn {
    color: var(--primary);
  }

  .select-table {
    width: 110px;
    margin-top: 25px;
    padding-right: 10px;
    left: -30px;
    .react-select__control {
      height: 35px;
      .react-select__placeholder {
        font-size: 12px;
      }
      .react-select__input-container {
        font-size: 12px;
      }
    }
  }
`;
