import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import { LoadingContext } from 'context/loadingContext';
import { SideNavContext } from 'context/sideNavContext';
import { AuthContext } from 'context/authContext';
import DummyPic from 'assets/images/ProfilePic.png';

import {
  ProfileHolder,
  UserWrap,
  ImgBox,
  TextBox,
  DropDown,
  Ul,
  Li,
  StyledLink,
  Name,
  Text,
  IconHolder,
} from './AdminActions.styles';

function AdminActions({ meeting }) {
  const { toggleSideNav } = useContext(SideNavContext);
  const { onLogout, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useContext(LoadingContext);

  const getLimitedFirstName = (fullName, limit = 8) => {
    const firstName = fullName?.split(' ')[0]; // Get the first name
    return firstName?.length > limit ? `${firstName.substring(0, limit)}` : firstName;
  };

  return (
    <>
      {isLoading ? (
        <Skeleton circle height={40} width={40} />
      ) : (
        <ProfileHolder dropdownopen={isOpen || undefined}>
          <UserWrap onClick={() => setIsOpen(!isOpen)}>
            <ImgBox>
              <img
                src={user?.userPic && user?.userPic?.length ? user?.userPic : DummyPic}
                width="40"
                height="40"
                alt="userPic"
              />
            </ImgBox>
            <TextBox dropdownopen={isOpen || undefined}>
              <Name>{getLimitedFirstName(user?.fullName)}</Name>
            </TextBox>
            <i className="icon-chevron-down material-icons-outlined">expand_more</i>
          </UserWrap>

          <DropDown dropdownopen={isOpen || undefined}>
            <Ul>
              <Li index="2">
                <StyledLink
                  as="span"
                  css="cursor: pointer;"
                  onClick={e => {
                    e.preventDefault();
                    toggleSideNav();
                    onLogout();
                  }}>
                  <IconHolder>
                    <i className="material-icons-outlined">logout</i>
                  </IconHolder>
                  <Text>Logout</Text>
                </StyledLink>
              </Li>
            </Ul>
          </DropDown>
        </ProfileHolder>
      )}
    </>
  );
}

export default AdminActions;
