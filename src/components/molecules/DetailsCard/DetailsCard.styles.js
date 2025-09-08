import styled from 'styled-components/macro';

export const StyledDetailsCard = styled.div`
  /* background: ${({ gray }) => (gray ? 'var(--light-secondary)' : 'var(--white)')}; */
  background-color: #f2fff6;
  border-radius: 12px;
  box-shadow: ${({ gray }) => !gray && '0px 23px 44px rgba(176, 183, 195, 0.14)'};
  padding: 1.75rem;
  margin-bottom: 0.625rem;
  position: relative;
  overflow-y: auto;
  max-height: 500px;
`;
