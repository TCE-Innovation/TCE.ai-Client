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
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2, mr: 1.5, marginTop: '-20px' }}>
        <Button
          variant="contained"
          sx = {{
            backgroundColor: activeComponent === 'ConduitMessenger' ? '#1B365F' : 'white',
            border: '1px solid #1B365F',
            color: activeComponent === 'ConduitMessenger' ? 'white' : '#1B365F',
            '&:hover': {
              backgroundColor: activeComponent === 'ConduitMessenger' ? '#1B365F' : 'white',
              border: '1px solid #1B365F',
              color: activeComponent === 'ConduitMessenger' ? 'white' : '#1B365F',
            },
          }}
          onClick={() => setActiveComponent('ConduitMessenger')}
        >
          Conduit or Messenger
        </Button>
        <Button
          variant="contained"
          sx = {{
            backgroundColor: activeComponent === 'PullBox' ? '#1B365F' : 'white',
            border: '1px solid #1B365F',
            color: activeComponent === 'PullBox' ? 'white' : '#1B365F',
            '&:hover': {
              backgroundColor: activeComponent === 'PullBox' ? '#1B365F' : 'white',
              border: '1px solid #1B365F',
              color: activeComponent === 'PullBox' ? 'white' : '#1B365F',
            },
          }}
          onClick={() => setActiveComponent('PullBox')}
          disabled
        >
          Sizing Junction Boxes
        </Button>
      </Box>
      {renderComponent()}
    </Box>
  );
};

export default CRO;
