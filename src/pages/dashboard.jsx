import React from 'react';
import Dashboard from '../components/organisms/Dashboard';
import MeetingTable from '../components/organisms/PropertiesAndTodayBookingsTable';
import DashboardTable from '../components/organisms/DashboardTable';

export default function LoginPage() {
  return (
    <div className="dashboard">
      <Dashboard />
      <MeetingTable />
      <DashboardTable />
    </div>
  );
}
