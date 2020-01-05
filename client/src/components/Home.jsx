import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  heroContent: {
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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="lg">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          안녕하세요 저희 PandoraTV는 해외 거주 한인분들의 좀더 원활한 스포츠 관람을 돕기위해 만들어졌습니다.
          매번 구글에 검색하기 귀찮고 특정 사이트 버퍼링이 심하시다면 아래 목록에서 원활한 스트리밍 사이트를 찿아보세요! 
        </Typography>
      </Container>
     <Container className={classes.cardGrid} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map(card => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                {/*<CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />*/}
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
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