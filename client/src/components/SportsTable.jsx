import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StandingModal from './StandingModal';
import NextMatchModal from './NextMatchModal';
import SonModal from './SonModal';
import PremierScheduleModal from './PremierScheduleModal';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Card
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  buttonContainer: {
    padding: theme.spacing(0, 0, 8),
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
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function SiteTable() {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('/api/links/livesports')  // For production: https://pandoratv.tk/api/links"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);

  return (
    <div className={classes.container}>
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='center' className={classes.buttonContainer}>
            <StandingModal />
            <PremierScheduleModal />
            <NextMatchModal />
            <SonModal />
        </Box>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          스포츠 라이브 중계 사이트
        </Typography>
      </Container>
     <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {rows.map(card => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                {/*<CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />*/}
                <CardActionArea component='a' href={card.link} target='_blank'>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
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