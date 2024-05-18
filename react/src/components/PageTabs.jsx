import React from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import {Box, AppBar, Tab, Tabs, Typography, useMediaQuery} from '@mui/material';


function TabPanel(props) {
   const { children, value, index, ...other } = props;
 
   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`full-width-tabpanel-${index}`}
       aria-labelledby={`full-width-tab-${index}`}
       {...other}
     >
       {value === index && (
         <Box sx={{ p: 3 }}>
           <Typography>{children}</Typography>
         </Box>
       )}
     </div>
   );
 }
 
 TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
 };
 
 function a11yProps(index) {
   return {
     id: `full-width-tab-${index}`,
     'aria-controls': `full-width-tabpanel-${index}`,
   };
 }

 export default function PageTabs(props) {

   const {data} = props;

   const [value, setValue] = React.useState(0);
   const theme = useTheme();

   const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

   return(
         <Box sx={{ bgcolor: 'background.paper', width: isNonMobileScreen ? "800px" : "90vw"}}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {data.map((el, index) => {
                return (
                  <Tab key={index} label={el.label} {...a11yProps(index)} />
                )
               })}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {data.map((el, index) => {
              return (
                <TabPanel key={index} value={value} index={index} dir={theme.direction}>
                  <el.element {...props}/>
                </TabPanel>
              )
            })}
          </SwipeableViews>
      </Box>
   )
 }