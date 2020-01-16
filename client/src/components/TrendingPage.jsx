import React, { useState, useEffect } from "react";
import Loading from './Loading';
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
// Style
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardActionArea: {
    height: '100%'
  },
}));

const TrendingPage = () => {
  const classes = useStyles();
  // React hook initialize state and setter
  const [rows, setRows] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch('https://pandoratv.tk/api/trending')  // For production: https://pandoratv.tk/api/links"
      .then(res => res.json())
      .then(rows => setRows([...rows]));
  }, []);
  // Loading Spinner
  if(rows.length === 0) {
    return <Loading/>;
  }
  // Render Contents
  return (
    <div className={classes.container}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {rows.map(card => (
            <Grid item key={card.title} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea} component='a' href={`/contents/${card._id}`}>
                  <CardMedia
                  className={classes.cardMedia}
                  image={card.img_urls[0]}
                  title={card.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                      {card.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default TrendingPage;