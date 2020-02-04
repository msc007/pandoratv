import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

// Tabpanel functional component
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// Props for tabs
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
/*const useStyles = makeStyles(theme => ({
  root: {
  }
}));*/

// StandingTab functional component
const StandingTab = () => {
  //const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Container maxWidth='md'>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab style={{minWidth: 50}} label="프리미어리그" {...a11yProps(0)} />
            <Tab style={{minWidth: 50}} label="라리가" {...a11yProps(1)} />         
            <Tab style={{minWidth: 50}} label="분데스리그" {...a11yProps(2)} />
            <Tab style={{minWidth: 50}} label="세리에" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <iframe title='Premier League' frameBorder="0"  scrolling="no" width="600" height="500" src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&timezone=Pacific/Midway&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=0&width=600&height=600&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"></iframe>   
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <iframe title='La Liga' frameBorder="0"  scrolling="no" width="600" height="500" src="https://www.fctables.com/spain/liga-bbva/iframe/?type=table&lang_id=2&country=201&template=43&timezone=Pacific/Midway&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=0&width=600&height=600&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"></iframe>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <iframe title='Bundesliga' frameBorder="0"  scrolling="no" width="600" height="500" src="https://www.fctables.com/germany/1-bundesliga/iframe/?type=table&lang_id=2&country=83&template=16&team=&timezone=Pacific/Midway&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=0&width=600&height=600&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"></iframe>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <iframe title='Serie A' frameBorder="0"  scrolling="no" width="600" height="500" src="https://www.fctables.com/italy/serie-a/iframe/?type=table&lang_id=2&country=108&template=17&timezone=Pacific/Midway&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=0&width=600&height=600&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"></iframe>
          </TabPanel>
      </Container>
    </React.Fragment>
  );
}

export default StandingTab;