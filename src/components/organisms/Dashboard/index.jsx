import React, { useContext } from 'react';
import magicianImg from 'assets/images/magician-img.svg';
import { AuthContext } from 'context/authContext';
import { Container, ImgBox, WelcomeContiner } from './Dashboard.styles';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <WelcomeContiner>
        <div className="welcome-text">
          <strong className="subtitle">Welcome</strong>
          <span className="title">{user?.fullName}</span>
        </div>
        <ImgBox>
          <img src={magicianImg} alt="dashboardImage" />
        </ImgBox>
      </WelcomeContiner>
    </Container>
  );
}
export default Dashboard;
