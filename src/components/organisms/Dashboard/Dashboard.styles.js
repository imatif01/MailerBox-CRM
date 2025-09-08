import styled from 'styled-components/macro';
import bgImg from '../../../assets/images/banner-bg01.png';

export const Container = styled.div`
  width: 100%;
`;

export const WelcomeContiner = styled.div`
  width: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  margin: 0 0 20px;
  position: relative;
  /* background: #202a45; */
  background-image: url(${bgImg});
  background-size: cover;

  @media (min-width: 992px) {
    min-height: 120px;
    margin: 35px 0 20px;
  }
  @media (min-width: 1200px) {
    margin: 25px 0 20px;
    min-height: 125px;
  }

  .welcome-text {
    color: #ffffff;
  }

  .subtitle {
    display: block;
    font-family: 'Poppins';
    font-size: 22px;
    line-height: 25px;
    font-weight: 300;
    margin: 0 0 10px;
  }

  .title {
    display: block;
    font-family: 'Poppins';
    font-size: 30px;
    line-height: 35px;
    font-weight: 700;
    text-transform: capitalize;
  }

  @media (max-width: 991px) {
    flex-direction: column;
    height: auto;
    padding: 20px;

    .welcome-text {
      text-align: center;
    }

    .subtitle {
      font-size: 18px;
      line-height: 22px;
    }

    .title {
      font-size: 25px;
      line-height: 30px;
    }
  }
`;

export const ImgBox = styled.div`
  display: none;
  position: absolute;
  right: 5px;
  bottom: 0;
  width: 196px;

  // More responsiveness
  @media (min-width: 992px) {
    display: block;
    position: absolute;
    right: 5px;
    bottom: 0;
    width: 196px;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;
