import React, { useState } from 'react';

const LLLE = () => {
  const a_division = 'A Division (IRT)'
  const b_division = 'B Division (IND / BMT)'
  const [activeTab, setActiveTab] = useState(a_division);

  const tabStyle = {
    flexGrow: 1,
    padding: '16px 0',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: 'grey',
  };

  const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const rootStyle = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={rootStyle}>
      <div style={tabContainerStyle}>
        <div
          style={activeTab === a_division ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab(a_division)}
        >
          Tab 1
        </div>
        <div
          style={activeTab === b_division ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab(b_division)}
        >
          Tab 2
        </div>
      </div>
    </div>
  );
};

export default LLLE;