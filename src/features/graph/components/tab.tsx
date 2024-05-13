import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { TabProps } from '../types';

export default function TabComponent(props : TabProps) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

    return (
      <Box  sx={{ width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
          <Box className="md:flex md:justify-center">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab sx={{fontSize : 'small'}} label="Temperature" value="1" />
                <Tab sx={{fontSize : 'small'}} label="Humidity" value="2" />
                <Tab sx={{fontSize : 'small'}} label="CO2 level" value="3" />
                <Tab sx={{fontSize : 'small'}} label="Air Condition" value="4" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    );
}
