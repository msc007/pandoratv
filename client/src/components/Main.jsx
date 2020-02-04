import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
// Material-ui 
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import DrawerList from './DrawerList';
import Hidden from '@material-ui/core/Hidden';
// Material-ui Icons
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import LiveTvIcon from '@material-ui/icons/LiveTv';
// Components
import Home from './Home';
import UserPage from './UserPage';
import SportsPage from './SportsPage';
import LiveTvPage from './LiveTvPage';
import WebHardPage from './WebHardPage';
import CommunityPage from './CommunityPage';
//import TrendingPage from './TrendingPage';
import TrendingPage2 from './TrendingPage2';
import ContentPage from './ContentPage';
import AboutPage from './AboutPage';
//import BoardPage from './BoardPage';
//import BoardWritePage from './BoardWritePage';
import Footer from './Footer';

// Style
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 30,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
    height: '90vh', // -10vh for appbar
    overflow: 'auto',
  },
  icon: {
    marginRight: theme.spacing(2),
  },  
}));

// Main Functional Component
const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Router>
        {/* NAVIGATION BAR */}
        <Hidden xsDown>
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <LiveTvIcon className={classes.icon} />
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                PandoraTV
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>
        {/* MOBILE NAVIGATION BAR */}
        <Hidden smUp>
          <AppBar position="absolute" className={clsx(classes.appBar, mobileOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleMobileDrawerToggle}
                className={clsx(classes.menuButton, mobileOpen && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <LiveTvIcon className={classes.icon} />
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                PandoraTV
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>
        {/* LEFT SIDE DRAWER */}
        <Hidden xsDown> 
          <Drawer
            variant='permanent'
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
            onClose={handleDrawerToggle}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <DrawerList />
          </Drawer>
        </Hidden>
        {/* MOBILE LEFT SIDE DRAWER */}
        <Hidden smUp>
          <Drawer
            variant="temporary"
            classes={{
              paper: clsx(classes.drawerPaper, !mobileOpen && classes.drawerPaperClose),
            }}
            open={mobileOpen}
            onClose={handleMobileDrawerToggle}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleMobileDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <DrawerList />
          </Drawer>
        </Hidden>
        {/* MAIN CONTENTS */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/trending" component={TrendingPage2} />
              {/*<Route path="/board" exact component={BoardPage} />
              <Route path='/board/write' component={BoardWritePage} />
              */}
              <Route path="/sports" component={SportsPage} />
              <Route path="/livetv" component={LiveTvPage} />
              <Route path="/webhard" component={WebHardPage} />
              <Route path="/community" component={CommunityPage} />
              <Route path="/userlink" component={UserPage} />
              <Route path="/contents/:postId" component={ContentPage} />
              <Route path="/about" component={AboutPage} />
              <Route component={Home} /> 
            </Switch>
            {/* Footer */}
            <Footer />
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default Main;