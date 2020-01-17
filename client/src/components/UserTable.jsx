import React, { useState, useEffect } from "react";
import Loading from './Loading';
import BugReportButton from './BugReportButton';
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import UserTableModal from './UserTableModal';

// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
  },  
  table: {	
    width: '100%',
    minHeight: 400,
    maxHeight: 400,
    overflow: 'auto',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionArea: {
    height: '100%'
  },
}));

// UserTable Functional Component
const UserTable = () => {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/user')  // For production: https://pandoratv.tk/api/user"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);
  // Increment view count of site
  const handleViewCount = async (id) => {
    const res = await fetch(`/api/links/user/views/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
    });

    if(res.status !== 200) {
      console.log('Error occured during update view count');
    }
  }
  // Loading Spinner
  if(rows.length === 0) {
    return <Loading/>;
  }

  // Render Contents
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          유저 등록 채널
        </Typography>
        <Grid container spacing={4}>
          {rows.map(card => (
            <Grid item key={card.name} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea} component='a' href={card.link} target='_blank' onClick={() => handleViewCount(card._id)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <BugReportButton siteName={card.name} id={card._id} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <UserTableModal rows={rows} setRows={setRows}/>
    </div>
  );
}

export default UserTable;