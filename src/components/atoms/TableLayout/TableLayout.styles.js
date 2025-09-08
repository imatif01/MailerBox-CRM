import styled from 'styled-components/macro';

export const StyledTableLayout = styled.div`
  /* margin: ${({ nonegativemargin }) => (nonegativemargin ? '' : '0 -20px 0')}; */

  border-radius: 12px;
  padding-top: 10px;

  @media (min-width: 992px) {
    padding-top: 15px;
    background-color: var(--white);
  }

  /* @media (min-width: 992px){
    margin: 0 30px;
    } */

  .table-title {
    display: block;
    font-weight: 600;
    text-transform: capitalize;
    margin: 0 0 10px;
    padding: 0 20px;

    @media (max-width: 991px) {
      padding: 0;
    }
    @media (max-width: 767px) {
      font-size: 20px;
      line-height: 24px;
    }
  }
`;
