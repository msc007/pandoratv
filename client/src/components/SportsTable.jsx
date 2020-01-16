import React, { useState, useEffect } from "react";
import StandingModal from './StandingModal';
import NextMatchModal from './NextMatchModal';
import PremierScheduleModal from './PremierScheduleModal';
import SonModal from './SonModal';
import Loading from './Loading';
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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

const SportsTable = () => {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/livesports')  // For production: https://pandoratv.tk/api/links"
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
      <Container maxWidth='lg'>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StandingModal />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <PremierScheduleModal />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <NextMatchModal />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <SonModal />
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          라이브 스포츠 스트리밍 사이트
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
                  <Button size="small" color="secondary">
                    버그신고
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default SportsTable;