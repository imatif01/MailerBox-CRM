import styled from 'styled-components/macro';
import BG from 'assets/images/bg.jpg';
import Banner from 'assets/images/banner-bg.png';

export const TemplateHolder = styled.div`
  min-height: 100vh;
  height: 100%;
  position: relative;
  z-index: 1;
  background-image: url(${Banner});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:after {
    display: none;
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.78;
    z-index: -1;
  }

  h1 {
    text-transform: uppercase;
    margin-bottom: 8px;
    color: var(--dark);
  }
`;

export const Content = styled.div`
  padding: 1rem;
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 16px 32px;
  }
  @media (min-width: 992px) {
    padding: 50px;
  }
`;

export const ContentHolder = styled.div`
  border-radius: 12px;
  width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px 30px;
  border: 1px solid #efefef;
  backdrop-filter: blur(19px);
  background: linear-gradient(90deg, rgba(39, 131, 236, 0.1) 0%, rgba(30, 220, 227, 0.1) 100%);

  @media screen and (min-width: 768px) {
    padding: 45px 45px;
  }
  /* @media screen and (min-width: 992px) {
    padding: 45px 45px 130px;
  } */
`;
