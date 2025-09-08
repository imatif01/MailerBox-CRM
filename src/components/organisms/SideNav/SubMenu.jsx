import React, { useContext, useState, useEffect } from 'react';
import { SideNavContext } from 'context/sideNavContext';
import { AuthContext } from 'context/authContext';
import {
  Li,
  StyledLink,
  Title,
  StyledSubMenu,
  SubMenuItem,
  SubMenuLink,
  SubMenuTitle,
  ArrowHolder,
} from './SideNav.styles';

function SubMenu({ item }) {
  const { toggleSideNav } = useContext(SideNavContext);
  const { allowedPages } = useContext(AuthContext);
  const [isSubnavOpen, setIsSubnavOpen] = useState(false);

  // Function to handle arrow click, preventing event propagation
  const handleArrowClick = e => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Stop the event from propagating to parent elements
    setIsSubnavOpen(!isSubnavOpen);
  };

  // Function to close side nav when a menu item is clicked
  // This is always called, regardless of whether the item has a submenu
  const handleItemClick = e => {
    if (!item.subNav || item.subNav.length === 0) {
      e.stopPropagation(); // Prevent further propagation if it's a leaf node
    }
    toggleSideNav();
  };

  return (
    item.file !== 'profile' && (
      <Li>
        <StyledLink
          to={item.hideSelf ? `/${item.file}/${item?.subNav[0]?.file}` : `/${item.file}`}
          onClick={handleItemClick}>
          <i className="icon material-icons-outlined">{item.icon}</i>
          <Title>{item.name}</Title>
          {item.subNav && (
            <ArrowHolder onClick={handleArrowClick}>
              <span className="material-icons-outlined">{isSubnavOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
            </ArrowHolder>
          )}
        </StyledLink>

        {isSubnavOpen && (
          <StyledSubMenu>
            {item.subNav
              .filter(subNavItem => allowedPages.includes(subNavItem.file))
              .map((subNavItem, index) => (
                <SubMenuItem key={index}>
                  {/* Pass the event to handleItemClick to ensure it stops propagation correctly */}
                  <SubMenuLink to={`/${item.file}/${subNavItem.file}`} onClick={handleItemClick}>
                    <i className="icon material-icons-outlined">{subNavItem.icon}</i>
                    <SubMenuTitle>{subNavItem.name}</SubMenuTitle>
                  </SubMenuLink>
                </SubMenuItem>
              ))}
          </StyledSubMenu>
        )}
      </Li>
    )
  );
}

export default SubMenu;
