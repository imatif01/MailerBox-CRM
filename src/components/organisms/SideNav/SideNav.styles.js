import styled, { css } from 'styled-components/macro';
import { NavLink, Link } from 'react-router-dom';
import Field from '../../molecules/Field';
import {
  ProfileHolder,
  UserWrap,
  TextBox,
  ImgBox,
  DropDown,
} from 'components/organisms/AdminActions/AdminActions.styles';

export const LogoHolder = styled.div`
  margin: -20px -15px 0 -15px;
  padding: 15px 25px;
  height: 73px;
  position: relative;
  background: var(--dark);
`;
export const Button = styled.div`
  background: #ffff;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  right: -15px;
  cursor: pointer;
  display: none;
`;

export const Logo = styled(Link)`
  display: flex;
  cursor: pointer;

  .logo-full {
    max-width: 200px;
    transition: all 0.3s ease-in;
  }
`;

export const SearchField = styled.div`
  position: relative;
  padding: 20px 0 0;
  margin-left: -7px;

  [type='search'] {
    padding-left: 3rem;
  }
`;

export const StyledField = styled(Field)`
  position: relative;
  height: 40px;
  color: var(--dark);
  border-radius: 25px;
  border: 1px solid var(--primary);
  background: var(--white);

  &::placeholder {
    color: var(--dark);
  }
  i {
    color: var(--primary);
  }
`;

export const Nav = styled.nav`
  /* flex-grow: 1; */
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding-top: 10px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
  @media (max-width: 991px) {
    height: 100dvh;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const Li = styled.li`
  padding: 6px 0;
`;

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--white);
  position: relative;
  transition: none;
  padding: 8px;
  transition: linear 0.3s;
  z-index: 1;

  &:before {
    visibility: hidden;
    opacity: 0;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 0px;
    height: 100%;
    background: linear-gradient(180deg, #1edce3 0%, #2783ec 100%);
    opacity: 0;
    transition: all 0.3s ease-in;
    border-radius: 8px;
    z-index: -1;
  }

  &:hover,
  &.active {
    color: var(--white);

    &:before {
      visibility: visible;
      opacity: 1;
      width: 100%;
    }
  }

  i.icon {
    position: relative;
    font-size: 23px;
    line-height: 1;
    margin: 0;
    transition: linear 0.3s;
    width: 40px;
    height: 35px;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: linear-gradient(180deg, #1edce3 0%, #2783ec 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:before {
      content: '';
      position: absolute;
      width: 40px;
      height: 35px;
      border-radius: 8px;
      background: var(--white);
      z-index: -1;
    }
  }
`;

export const Title = styled.span`
  position: relative;
  white-space: nowrap;
  transition: linear 0.3s;

  /* @media (min-width: 992px) {
    width: 0;
    left: 30px;
    visibility: hidden;
    opacity: 0;
  } */
`;

export const StyledSubMenu = styled.ul`
  font-size: 14px;
  margin-top: 5px;
  padding-left: 44px;

  li {
    margin: 0 0 3px;
    border-radius: 6px;
    background: #161a24;

    &:last-child {
      border-bottom: 0;
    }
  }

  .icon {
    display: inline-block;
    font-size: 25px;
    line-height: 1;
    margin: 0;
    transition: linear 0.3s;
    margin-right: 10px;
  }
`;

export const ArrowHolder = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2px;
  font-size: 20px;
`;

export const SideNavbar = styled.div`
  display: flex;
  flex-flow: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 270px;
  padding: 30px 15px;
  transform: translateX(-100%);
  background: var(--dark);
  transition: linear 0.3s;
  z-index: var(--z-40);

  .nav-active & {
    transform: translateX(0);
  }
  @media (max-width: 576px) {
    z-index: 9999;
  }

  @media (max-width: 991px) {
    width: 275px;
  }

  /* &:not(:hover) {
    ${DropDown}, ${StyledSubMenu},${ArrowHolder} {
      @media (min-width: 992px) {
        display: none;
      }
    }
  } */

  @media (min-width: 992px) {
    transform: none;

    ${({ $loading }) =>
      $loading &&
      css`
         {
          ${UserWrap} {
            padding: 10px;
          }

          ${ProfileHolder} {
            max-width: 190px;
          }

          ${ImgBox} {
            padding: 0;
            img {
              width: 40px;
              height: 40px;
            }
          }

          ${TextBox} {
            display: block;
          }
        }
      `}
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  width: 24px;
  height: 24px;
  color: var(--white);
  font-size: 25px;
  line-height: 1;
`;

export const SubMenuItem = styled.li``;

export const SubMenuLink = styled(NavLink)`
  padding: 8px 10px;
  color: var(--text-color-gray);
  display: flex;
  align-items: center;

  &:hover,
  &.active {
    color: var(--white);
  }
`;

export const SubMenuTitle = styled.span``;

export const NoRecordFoundContainer = styled.div``;

export const NoRecordFoundItem = styled.span`
  display: block;
  max-width: 200px;
  padding: 15px 10px 13px;
  margin: 15px auto;
  border-radius: 5px;
  color: var(--danger);
  background: #ffebeb;
  text-align: center;
`;
