import Table from 'components/molecules/Table';
import styled from 'styled-components/macro';

export const TableContainer = styled.div`
  width: 100%;
  height: 335px;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 25px 20px 0px;
  margin: 0 0 20px;
  box-sizing: border-box;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

  @media (max-width: 1500px) {
    max-width: 100%;
    height: auto;
    padding: 25px 20px;
  }
  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const StyledTable = styled(Table)`
  border-collapse: separate;
  width: 100%;
  min-width: 100%;
  max-height: 400px;
  border-spacing: 0 8px;

  thead,
  tbody {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: table;
    width: calc(100% - 17px);
    table-layout: fixed;
    box-sizing: border-box;
    margin: 0 auto;
  }
  @media (max-width: 991px) {
    thead {
      display: none;
    }
    tr {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: '40px 15px';
    }
  }

  @media (min-width: 992px) {
    tbody {
      display: block;
      box-shadow: none;
      max-height: 182px;
      overflow-y: auto;
      width: 100%;
    }
    tr {
      display: inline-table;
      border: none;
      border-spacing: 0;
    }
  }
  th,
  td {
    border: none;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    display: table-cell;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 12px;
    }
  }
`;

export const EnquiryContainer = styled.div`
  @media (min-width: 1200px) {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 15px;
  margin: 0 0 20px;
  box-sizing: border-box;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

  @media (min-width: 992px) {
    padding: 20px 17px;
  }
  @media (min-width: 1200px) {
    min-height: 324px;
    padding: 25px 17px;
  }

  .heading {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 22px;
      line-height: 25px;
    }
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 50px;
  flex-shrink: 0;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin: 0 0 20px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  background: var(--white);

  @media (min-width: 1200px) {
    width: 250px;
    gap: 10px;
  }
  @media (min-width: 1400px) {
    width: 300px;
  }
  @media (min-width: 1600px) {
    width: 400px;
  }

  .head {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background: linear-gradient(90deg, rgba(39, 131, 236, 0.1) 0%, rgba(30, 220, 227, 0.1) 100%);

    @media (min-width: 1500px) {
      width: 100px;
      height: 100px;
    }

    img {
      display: block;
      width: 30px;
      height: auto;

      @media (min-width: 1500px) {
        width: 40px;
      }
    }
  }

  .info-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 16px;
    line-height: 19px;
    border-radius: 50px;
    padding: 6px 10px;
    background: var(--white);

    &.up {
      color: #52C93F;
      background: rgba(82, 201, 63, 0.12);
    }
    &.down {
      color: #FF4B26;
      background: rgba(255, 75, 38, 0.12);
    }
  }

  .text-box {
    width: 100%;
    font-size: 18px;
    line-height: 22px;
    color: #868686;

    .number {
      display: block;
      font-size: 30px;
      line-height: 35px;
      font-weight: 600;
      color: #2C2C2C;

      @media (min-width: 1200px) {
        font-size: 35px;
        line-height: 40px;
      }
    }
  }
`;
