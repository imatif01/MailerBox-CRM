import styled from 'styled-components';

export const CreditHistoySection = styled.div`
  width: 100%;
  background: rgb(242, 255, 246);

  .table-holder {
    width: 100%;
  }

  table {
    width: 100%;
    font-size: 13px;
    line-height: 16px;
    border: 1px solid #ddd;
    border-collapse: collapse;
    text-align: center;

    @media (max-width: 575px) {
      width: 508px;
    }

    thead {
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th,
    td {
      padding: 12px 10px;
      border-bottom: 1px solid #ddd;

      &:first-child {
        text-align: left;
      }
      /* &:last-child {
        text-align: right;
      } */
    }
  }
  .green-text {
    color: green;
    font-weight: bold;
  }

  .red-text {
    color: red;
    font-weight: bold;
  }
`;
