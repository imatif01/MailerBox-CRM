import styled from 'styled-components';

export const CustomerInfo = styled.div`
  overflow: hidden;
  position: relative;

  .btn-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    margin-bottom: 15px;

    .btn {
      color: white;
      border: none;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      width: 49%;
      color: var(--headings-color);
      font-weight: 500;
      border: 1px solid #ddd;
      transition: 0.3s;
      background: #fff;

      &:hover,
      &.active {
        color: var(--white);
        background: var(--headings-color);
      }
    }
  }

  .credit-history {
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
      }
    }
  }
  .input-wrap {
    display: flex;
    align-items: end;
    gap: 10px;
    > div {
      flex-grow: 1;
    }
    button {
      width: 70px;
      padding: 15px 10px;
    }
  }
`;
