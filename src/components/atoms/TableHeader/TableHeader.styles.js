import styled from 'styled-components/macro';
import Select from '../Select';

export const StyledTableHeader = styled.div`
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 5px 10px;
  font-size: var(--font-size-xs);
  color: var(--gray);
  border-radius: 12px 12px 0 0;

  @media (min-width: 768px) {
    padding: 0 20px 5px 20px;
    font-size: var(--font-size-sm);
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

export const TotalResult = styled.span``;

export const ResultPerPage = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledSelect = styled(Select)`
  margin-left: 5px;

  .react-select__control {
    padding-left: 10px;
    width: 100px;
    height: 35px;
    min-height: 35px;
  }
  .react-select__indicators {
    /* transform: translateX(25px); */
  }
`;
