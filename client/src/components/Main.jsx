import React from 'react';
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
// Material-ui Icons
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import LiveTvIcon from '@material-ui/icons/LiveTv';
// Components
import Home from './Home';
import UserTable from './UserTable';
import SportsTable from './SportsTable';
import LiveTvTable from './LiveTvTable';
import WebHardTable from './WebHardTable';
import CommunityTable from './CommunityTable';
import TrendingPage from './TrendingPage';
import ContentPage from './ContentPage';
import AboutPage from './AboutPage';
import BoardPage from './BoardPage';
import BoardWritePage from './BoardWritePage';
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
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

// Main Functional Component
const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Router>
        {/* NAVIGATION BAR */}
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
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
        {/* LEFT SIDE DRAWER */}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <DrawerList />
        </Drawer>
        {/* MAIN CONTENTS */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/trending" component={TrendingPage} />
              <Route path="/board" exact component={BoardPage} />
              <Route path='/board/write' component={BoardWritePage} />
              <Route path="/sports" component={SportsTable} />
              <Route path="/livetv" component={LiveTvTable} />
              <Route path="/webhard" component={WebHardTable} />
              <Route path="/community" component={CommunityTable} />
              <Route path="/userlink" component={UserTable} />
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