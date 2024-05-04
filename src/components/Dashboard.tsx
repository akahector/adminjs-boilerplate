import { Box, Text, Button, Input } from '@adminjs/design-system';
import React from 'react'

const Dashboard: React.FC = () => {


  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Text>
        <h2>Welcome to Tatsat Admin Panel</h2>
      </Text>
    </Box>
  );
};

export default Dashboard;