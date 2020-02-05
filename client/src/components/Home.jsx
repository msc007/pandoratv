import React, { useState, useEffect } from "react";
import Loading from './Loading';
import BugReportButton from './BugReportButton';
// Mateiral-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
    height: '100%',

  },  
  cardGrid: {
    paddingTop: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionArea: {
    height: '100%'
  }
}));
// Home functional Component
const Home = () => {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/home')  // For production: https://pandoratv.tk/api/user"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);
  // Increment view count of site
  const handleViewCount = async (id) => {
    const res = await fetch(`/api/links/views/${id}`, {
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
        <Typography variant="h5" align="center" color="textSecondary">
          클릭수 상위 사이트
        </Typography>
      </Container>
     <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {rows.map(card => (
            <Grid item key={card.name} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea} component='a' href={card.link} target='_blank' onClick={() => handleViewCount(card._id)}>
                  <CardContent>  
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography variant='body2'>
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <BugReportButton siteName={card.name} siteId={card._id} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;