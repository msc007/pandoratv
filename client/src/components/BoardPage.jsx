import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BoardTable from './BoardTable';
// Mateiral-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';



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
      <BoardTable />
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Button variant="contained" color="primary"  component={Link} to='/board/write' >
          글쓰기
        </Button>
      </Box>
    </div>
  );
}

export default BoardPage;