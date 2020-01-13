import React, { useState, useEffect } from "react";
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },  
  table: {	
    width: '100%',
    minHeight: 400,
    maxHeight: 400,
    overflow: 'auto',
  },
  card: {
    minHeight: 400,
    //padding: theme.spacing(3, 0, 6),
  }
}));

// UserTable Functional Component
const UserTable = () => {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [siteLink, setSiteLink] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/user')  // For production: https://pandoratv.tk/api/user"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('/api/links/user', {
                          method: 'POST',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify({
                            'siteName': siteName,
                            'siteLink': siteLink,
                            'siteDescription': siteDescription
                          })
      });
      const data = await res.json();
      // Response status check
      if(res.status === 500){
        return alert('Unexpected error occured, please try again later');
      }
      // Input validation check
      if(data.validationMessage) {
        return alert(data.validationMessage);
      }
      // Rerender on successful save
      if(res.status === 200) {
        setSiteName('');
        setSiteLink('');
        setSiteDescription('');
        setRows([...rows, data.row]);
      }
    } catch(err) {
      alert('Error occured during submit: ' + err);
    }
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Paper className={classes.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>유저 등록 채널</TableCell>
                  <TableCell/>   
                  <TableCell/>              
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow hover key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">
                      <Link href={row.link} target="_blank" rel="noopener" color='inherit' underline='none'>
                        {row.description} <br/>
                        {row.link}
                      </Link>
                    </TableCell>
                    <TableCell>
                      hits: {row.hits}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Card className={classes.card}>
            <CardHeader title="사이트 등록" subheader='미주 한인들에게 알리고 싶거나 홍보하고 싶은 사이트가 있다면 등록해주세요.' align='center'/>
            <form onSubmit={handleSubmit}>
            <CardContent>
              <TextField
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                id="site-name"
                label="사이트명 (20자 이내로 입력)"
                fullWidth
                required
                autoComplete="off"
              />
              <TextField
                value={siteLink}
                onChange={(e) => setSiteLink(e.target.value)}
                id="site-link"
                label="사이트 주소 (http, https 포함하여 입력)"
                fullWidth
                required
                autoComplete="off"
              />
              <TextField
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                id="site-description"
                label="사이트 설명 (30자 이내로 입력)"
                fullWidth
                required
                autoComplete="off"
              />
            </CardContent>
            <CardActions>
              <Button type='submit' variant='contained' color='primary' fullWidth>등록</Button>
            </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserTable;