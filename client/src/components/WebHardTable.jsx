import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  buttonContainer: {
    padding: theme.spacing(0, 0, 8),
  },
}));

export default function SiteTable() {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/webhard')  // For production: https://pandoratv.tk/api/links"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);

  return (
    <div className={classes.container}>
      <Container maxWidth='lg'>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          미주 한인 웹하드
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align='center'>Link</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Hits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow hover key={row.name}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell component='th' scope='row'>{row.name}</TableCell>
                  <TableCell align='center'>      
                    <Link color="inherit" href={row.link} target='_blank'>{row.link}</Link>        
                  </TableCell>
                  <TableCell align='center'>{row.description}</TableCell>
                  <TableCell align='center'>{row.hits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}