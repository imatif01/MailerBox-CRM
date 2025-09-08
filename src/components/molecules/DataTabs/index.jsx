/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import { StyledTabs, Wrap, StyledTabList, TabBtn, StyledTab, StyledTabPanels, StyledTabPanel } from './DataTabs.styles';

const propTypes = {
  data: PropTypes.array,
};

function DataTabs({ data, orientation, view = true }) {
  // console.log('orientation:---------- ', orientation);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <StyledTabs orientation={orientation}>
        {view && (
          <Wrap orientation={orientation}>
            <StyledTabList orientation={orientation}>
              {data.map((tab, index) => (
                <TabBtn
                  orientation={orientation}
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                  }}>
                  <StyledTab active={activeTab === index}>{tab.label}</StyledTab>
                </TabBtn>
              ))}
            </StyledTabList>
          </Wrap>
        )}
        <StyledTabPanels
          orientation={orientation}
          css={`
            width: 100%;
          `}>
          {data?.map((tab, index) => (
            <StyledTabPanel orientation={orientation} key={index} active={activeTab === index}>
              {tab?.content}
            </StyledTabPanel>
          ))}
        </StyledTabPanels>
      </StyledTabs>
    </>
  );
}

DataTabs.propTypes = propTypes;

export default DataTabs;
