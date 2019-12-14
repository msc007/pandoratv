import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
      //backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        pandoraTV.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
    <Typography variant="h6" align="center" gutterBottom>
      PandoraTV
    </Typography>
    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
    </Typography>
    <Copyright />
    </footer>
  );
}