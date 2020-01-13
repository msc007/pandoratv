import React, { useState, useEffect } from "react";
import UserTable from './UserTable';
// Mateiral-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardAction: {
    diaplay: 'flex',
  },
  cardButton: {
    marginLeft: 'auto',
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

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          안녕하세요 저희 PandoraTV는 해외 거주 한인분들의 좀더 원활한 생활을 위하여 만들어졌습니다.
          미주 한인들에게 유익한 사이트들을 조금더 손쉽게 찾아 보실수있습니다.
        </Typography>
      </Container>
     <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {rows.map(card => (
            <Grid item key={card.name} xs={12} sm={6} md={4} lg={3}>
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
                    <Typography variant='body2'>
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button size="small" color="secondary" className={classes.cardButton}>
                    버그신고
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <UserTable />
      </Container>
    </div>
  );
}

export default Home;