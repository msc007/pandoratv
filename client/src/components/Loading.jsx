import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// Style
const useStyles = makeStyles(theme => ({
  loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }
}));
// Loading Functional Component
const Loading = () => {
  const classes = useStyles();
  // Render Content
  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
}

export default Loading;