import styled, { css } from 'styled-components/macro';

export const StyledFlex = styled.div`
  display: flex;

  ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}

  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}

  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: ${wrap};
    `}


     ${({ gap }) =>
    gap &&
    css`
      grid-gap: ${gap};
    `}
     @media (max-width: 768px) {
    flex-direction: ${({ mobileDirection }) => mobileDirection || 'column'};
    justify-content: ${({ mobileJustify }) => mobileJustify || 'center'};
    align-items: ${({ mobileAlign }) => mobileAlign || 'stretch'};
    flex-wrap: ${({ mobileWrap }) => mobileWrap || 'wrap'};
  }
`;
