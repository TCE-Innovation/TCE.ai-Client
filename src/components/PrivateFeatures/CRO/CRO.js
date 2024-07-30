// CRO.js
import React, { useState } from 'react';
import ConduitMessenger from './ConduitMessenger';
import PullBox from './PullBox';

const CRO = () => {
  const [activeComponent, setActiveComponent] = useState('ConduitMessenger');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ConduitMessenger':
        return <ConduitMessenger />;
      case 'PullBox':
        return <PullBox />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button onClick={() => setActiveComponent('ConduitMessenger')}>Show ConduitMessenger</button>
      <button onClick={() => setActiveComponent('PullBox')}>Show PullBox</button>
      {renderComponent()}
    </div>
  );
};

export default CRO;
