import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const UserWrap = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  height: auto;
  padding: 3px;
  box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.14);
  /* border-radius: 50px; */

  @media (min-width: 992px) {
    background: var(--dark);
  }

  .icon-chevron-down {
    font-size: var(--font-size-xl);
    line-height: 1;
    margin: 0 6px 0 0;

    @media (min-width: 992px) {
      color: var(--white);
    }
  }
`;

export const ImgBox = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: var(--white);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 3px;

  img {
    display: block;
    border-radius: 100%;
    object-fit: cover;
    max-width: 100%;
    width: 34px;
    height: 34px;
  }
`;

export const TextBox = styled.div`
  flex-grow: 1;
  padding: 0 0 0 10px;

  /* @media (max-width: 576px) {
    display: ${({ dropdownopen }) => (dropdownopen ? '' : 'none')};
    padding: ${({ dropdownopen }) => (dropdownopen ? '0 0 0 2px' : '0')};
  } */
`;

export const Name = styled.strong`
  display: block;
  font-size: 13px;
  line-height: 17px;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--dark);

  @media (min-width: 992px) {
    color: var(--white);
  }
`;

export const Designation = styled.span`
  display: block;
  font-size: var(--font-size-xs);
  line-height: 15px;
  font-weight: 400;
  color: var(--primary-text-color);
  text-transform: capitalize;
`;

export const DropDown = styled.div`
  /* max-height: 0;
  visibility: hidden;
  opacity: 0; */
  transition: linear 0.3s;
  position: relative;
  max-height: ${({ dropdownopen }) => (dropdownopen ? '200px' : '0px')};
  visibility: ${({ dropdownopen }) => (dropdownopen ? 'visible' : 'hidden')};
  opacity: ${({ dropdownopen }) => (dropdownopen ? '1' : '0')};
  z-index: -1;
`;

export const ProfileHolder = styled.div`
  flex-shrink: 0;
  /* position: relative; */
  overflow: hidden;
  max-width: 245px;
  background: var(--white);
  box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.14);
  border-radius: 8px;
  position: relative;
  z-index: 2;
  margin-top: 7px;

  @media (min-width: 576px) {
    margin-top: 17px;
  }

  @media (max-width: 576px) {
    /* max-width: ${({ dropdownopen }) => (dropdownopen ? '130px' : '60px')};
    margin-top: ${({ dropdownopen }) => (dropdownopen ? '17px' : '15px')};
    padding: ${({ dropdownopen }) => (dropdownopen ? '10px 4px 0px' : '2px 0px')}; */
  }

  /* &:hover {
    ${DropDown} {
      max-height: 200px;
      visibility: visible;
      opacity: 1;
    }

    ${UserWrap} {
      .icon {
        transform: scale(-1);
      }
    }
  } */
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 5px 10px;
`;

export const Li = styled.li`
  padding: 5px 0;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 30px;
  color: var(--primary-text-color);
  background: var(--light-secondary);

  .icon-chevron-right {
    font-size: 10px;
    line-height: 1;
  }
`;

export const Text = styled.span`
  flex-grow: 1;
  font-size: var(--font-size-xs);
  line-height: 15px;
  text-transform: capitalize;
  padding: 0 10px;
`;

export const IconHolder = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  line-height: 1;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background: var(--white);
`;

export const PlaceHolder = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  height: 100%;
  background: #edfad6;
  color: #9dcb4c;
  border-radius: 100%;
`;
