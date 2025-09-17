import React, { useContext, useEffect, useMemo, useState } from 'react';
import Styled from 'styled-components/macro';
import { useMediaPredicate } from 'react-media-hook';
import { SideNavContext } from 'context/sideNavContext';
import { LoadingContext } from 'context/loadingContext';
import LogoFull from 'assets/images/logo-white.svg';
import rightArrows from 'assets/images/rightArrows.svg';
import leftArrows from 'assets/images/leftArrows.svg';
import { AuthContext } from 'context/authContext';
import sideNavData from 'nav.json';
import AdminActions from 'components/organisms/AdminActions';

import {
  SideNavbar,
  Nav,
  Ul,
  CloseButton,
  LogoHolder,
  Logo,
  SearchField,
  StyledField,
  Button,
  NoRecordFoundContainer,
  NoRecordFoundItem,
} from './SideNav.styles';
import SubMenu from './SubMenu';

function Navbar() {
  const { toggleSideNav, sideNavState } = useContext(SideNavContext);
  const [searchText, setSearchText] = useState('');
  const { allowedPages, user, active, setActive } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);

  const MaxWidth991 = useMediaPredicate('(max-width: 991px)');
  useEffect(() => {
    !sideNavState && document.body.classList.remove('nav-active');
  }, [sideNavState]);

  const sideBarItems = useMemo(() => {
    return sideNavData?.map((item, index) => <SubMenu item={item} key={index} />);
  }, [searchText, sideNavData, allowedPages]);
  const toggleVisibility = () => {
    setActive(!active);
  };
  const handleLogoClick = () => {
    if (sideNavState) {
      toggleSideNav();
    }
  };

  useEffect(() => {
    if (!MaxWidth991 && searchText !== '') {
      setSearchText('');
    }
  }, [MaxWidth991]);

  return (
    <SideNavbar css={isLoading && 'background:var(--dark);'} $loading={active} width={active} $hamburger={active}>
      <LogoHolder>
        <Logo to="/dashboard" $hamburger={active} onClick={handleLogoClick}>
          <img src={LogoFull} alt="houdiny" className="logo-full" />
        </Logo>
        {!MaxWidth991 && (
          <Button onClick={toggleVisibility}>
            {active ? <img src={leftArrows} alt="leftArrows" /> : <img src={rightArrows} alt="rightArrows" />}
          </Button>
        )}
      </LogoHolder>
      {MaxWidth991 && (
        <CloseButton onClick={toggleSideNav}>
          <i className="material-icons-outlined">close</i>
        </CloseButton>
      )}

      {sideBarItems?.length > 0 ? (
        <Nav id="sub-menu">
          <Ul>{sideBarItems}</Ul>
        </Nav>
      ) : (
        <NoRecordFoundContainer>
          <NoRecordFoundItem>No Record Found</NoRecordFoundItem>
        </NoRecordFoundContainer>
      )}
    </SideNavbar>
  );
}
export default Navbar;
