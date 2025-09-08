import styled from 'styled-components/macro';
import Link from 'components/atoms/Link';
import Form from 'components/molecules/Form';

export const SubTitle = styled.span`
  color: var(--dark);
  font-weight: 500;
  margin-bottom: 20px;
  display: block;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const LoginHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 30px;

  @media (min-width: 768px) {
    padding: 40px 80px;
  }
`;

export const FormHolder = styled.div`
  width: 100%;

  .btn-holder {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      min-width: 100%;
    }
  }
`;

export const StyledForm = styled(Form)`
  text-align: left;
  max-width: 500px;
  margin: 0 auto;

  /* input {
    color: #424954;
    font-size: 14px;
    border-color: var(--white);
    border-radius: 10px;
    box-shadow: none;
    background: none !important;
  } */
  /* label {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #424954;
  } */
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--light-gray);
  &:hover {
    i {
      transform: translateX(-5px);
    }
  }
  i {
    color: var(--primary);
    transition: transform 0.3s linear;
  }
`;

export const LogoWrap = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  max-width: 200px;
  margin: 0;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* @media screen and (min-width: 1440px) {
    margin-bottom: 90px;
  }
  @media screen and (max-width: 1024px) {
    text-align: center;
    margin-bottom: 20px;
  } */
`;
