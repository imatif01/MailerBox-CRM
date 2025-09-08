import React, { useState, createContext } from 'react';

const context = {};

export const SideNavContext = createContext(context);

export const SideNavContextProvider = props => {
  const [sideNavToggle, setSideNavToggle] = useState(false);

  const toggleSideNav = () => {
    setSideNavToggle(!sideNavToggle);
  };

  return (
    <SideNavContext.Provider
      value={{
        sideNavState: sideNavToggle,
        toggleSideNav,
      }}>
      {props.children}
    </SideNavContext.Provider>
  );
};
