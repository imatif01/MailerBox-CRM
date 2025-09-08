import React, { useState, createContext } from 'react';

const context = {};

export const FiltersContext = createContext(context);

export const FiltersContextProvider = props => {
  const [filterToggle, setFilterToggle] = useState(true);

  const toggleFilter = () => {
    setFilterToggle(!filterToggle);
  };

  return (
    <FiltersContext.Provider
      value={{
        filterState: filterToggle,
        toggleFilter,
        setFilterToggle,
      }}>
      {props.children}
    </FiltersContext.Provider>
  );
};
