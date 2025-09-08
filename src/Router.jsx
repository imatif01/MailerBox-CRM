import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './pages/login';
import Pages from './pages/index';
import { AuthContext } from './context/authContext';

function PublicRoute({ isLoggedIn, redirectTo }) {
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />;
}

function PrivateRoute({ isLoggedIn, redirectTo }) {
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
}

function Router() {
  const { isLoggedIn, allowedPages } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/:view" element={<PrivateRoute redirectTo="/" isLoggedIn={isLoggedIn} />}>
        <Route path="/:view" element={<Pages />} />
        <Route path="/:view/:child" element={<Pages />} />
      </Route>
      
      <Route
        path="*"
        element={
          <PublicRoute
            isLoggedIn={isLoggedIn}
            // redirectTo={allowedPages.length > 0 ? `/${allowedPages[0]}` : '/dashboard'}
            redirectTo='/dashboard'
          />
        }>
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );
}
export default Router;
