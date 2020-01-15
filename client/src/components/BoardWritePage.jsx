import React, { useState, useEffect } from "react";
// Mateiral-ui
import { makeStyles } from '@material-ui/core/styles';




// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
  },
}));

// Home functional Component
const BoardPage = () => {
  const classes = useStyles();
  /* React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/home')  // For production: https://pandoratv.tk/api/user"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);
  */

  return (
    <div className={classes.root}>
            write page
    </div>
  );
}

export default BoardPage;