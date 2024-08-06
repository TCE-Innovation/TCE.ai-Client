// CRO.js
import React, { useState } from 'react';
import ConduitMessenger from './ConduitMessenger';
import PullBox from './PullBox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2, mr: 9, marginTop: '-20px' }}>
        <Button
          variant="contained"
          sx = {{backgroundColor: '#609CCF'}}
          onClick={() => setActiveComponent('ConduitMessenger')}
        >
          Conduit or Messenger
        </Button>
        <Button
          variant="contained"
          sx = {{backgroundColor: '#003EAB'}}
          onClick={() => setActiveComponent('PullBox')}
        >
          Pull Box Sizer
        </Button>
      </Box>
      {renderComponent()}
    </Box>
  );
};

export default CRO;
