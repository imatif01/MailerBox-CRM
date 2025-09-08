import React, { useState, useEffect } from 'react';
import PieChart from 'components/organisms/PieChart';
import iconCustomer from '../../../assets/images/icon-customers.svg';
import iconTask from '../../../assets/images/icon-tasks.svg';
import { ChartContainer, EnquiryContainer, InfoBox } from './PropertiesAndTodayBookingsTable.styles';
import dashboardService from 'services/dashboardService';

function PropertiesAndTodayBookingsTable() {
  const [cardsInfo, setCardsInfo] = useState({});

  useEffect(() => {
    dashboardService
      .getAnalyticCards()
      .then(data => setCardsInfo(data))
      .catch(({ message }) => console.log(message));
  }, []);

  return (
    <EnquiryContainer>
      <InfoBox>
        <div className="head">
          <div className="icon-box">
            <img src={iconCustomer} widht="30" alt="icon" />
          </div>
          <span className="info-text down">
            <i class="material-icons-outlined">arrow_downward</i>
            2.5%
          </span>
        </div>
        <div className="text-box">
          <strong className="number">{cardsInfo?.totalUsers || 0}</strong>
          <sapn className="text">Total Customers</sapn>
        </div>
      </InfoBox>
      <InfoBox>
        <div className="head">
          <div className="icon-box">
            <img src={iconTask} widht="30" alt="icon" />
          </div>
          <span className="info-text up">
            <i class="material-icons-outlined">arrow_upward</i>
            2.5%
          </span>
        </div>
        <div className="text-box">
          <strong className="number">{cardsInfo?.totalTasks || 0}</strong>
          <sapn className="text">Total Tasks Created</sapn>
        </div>
      </InfoBox>
      <ChartContainer>
        <strong className="heading">Active Subscriptions</strong>
        <PieChart data={cardsInfo?.subscriptions} />
      </ChartContainer>
    </EnquiryContainer>
  );
}

export default PropertiesAndTodayBookingsTable;
