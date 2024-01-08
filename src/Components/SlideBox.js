// SlideBox.js
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../Components/TabPanel';

export default function SlideBox({ value, handleChange }) {
  return (
    <Box sx={{ maxWidth: { xs: 290, sm: 440 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="My Story" />
        <Tab label="Meeting" />
        <Tab label="Saved" />
        <Tab label="Health" />
      
      </Tabs>
    </Box>
  );
}
