import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    banner: {
      backgroundImage: `url(/images/UCL.jpg)`,
      height: '700px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
      <AppBar position="relative" className={classes.banner}>
        <Toolbar>
          <LiveTvIcon className={classes.icon} />
          <Typography variant="h5" color="inherit" noWrap>
          PandoraTV
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

