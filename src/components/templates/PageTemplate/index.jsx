import React, { Suspense, useContext } from 'react';

import Loaders from 'components/atoms/Loaders';
import { Content } from './PageTemplate.styles';
import SideNav from '../../organisms/SideNav';
import TopBar from '../../../common/TopBar';
import AdminActions from '../../organisms/AdminActions/index';
import { SideNavContext } from 'context/sideNavContext';
import { AuthContext } from 'context/authContext';

function PageTemplate({ title, showTemplate, children, topBar }) {
  const { toggleSideNav } = useContext(SideNavContext);
  const { active } = useContext(AuthContext);

  return (
    <>
      {showTemplate ? (
        <Content isActive={active}>
          <div className="user-actions-container">
            <AdminActions toggleSideNav={toggleSideNav} />{' '}
          </div>
          <SideNav />
          <div className="upper upper-head" margin={active}>
            {topBar && <TopBar />}
          </div>

          <Suspense fallback={<Loaders />}>
            <div className="upper" margin={active}>
              {children}
            </div>
          </Suspense>
        </Content>
      ) : (
        <div className="lower">{children}</div>
      )}
    </>
  );
}

export default PageTemplate;
