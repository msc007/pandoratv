import React, { useState, useEffect, useRef, useCallback } from "react";
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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
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

const TrendingPage2 = () => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [rows, setRows] = useState([])
  const [hasMore, setHasMore] = useState(false)
  // Render content page, initial render and on pageNumber change
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // Fetch contents from server
    const fetchData = async (signal) => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(`/api/posts/trending/${pageNumber}`, {signal: signal }); // signal to aborting request
        const data = await res.json();
        setRows(prev => [...new Set([...prev, ...data])]);  // set() for handle duplicate contents
        setHasMore(data && data.length > 0);
        setLoading(false);
      } catch (err) {
        // Don't do anything on abort error
        if(err.name === 'AbortError') {
          return;
        }
        setError(true);
      }
    }
    fetchData(signal);
    // abort previous request on new render
    return () => {
      controller.abort();
    }
  }, [pageNumber]);

  // Ref node
  const observer = useRef();
  const lastContentElementRef = useCallback(node => {
    if (loading) { 
      return;
    }
    // if observer is already attached, then detach it
    if (observer.current) { 
      observer.current.disconnect();
    }
    // Attach intersection observer for checking if reached last content, then increment page number
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(p => p + 1)
      }
    });
    // attach observer to current node
    if (node) {
      observer.current.observe(node)
    } 
  }, [loading, hasMore]);

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {rows.map((card, index) => (
            rows.length === (index + 1) ?
            (<Grid item key={card.title} ref={lastContentElementRef} xs={12} sm={6} md={4} lg={3}>
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
            )
            :
            (<Grid item key={card.title} xs={12} sm={6} md={4} lg={3}>
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
            )
          ))}
        </Grid>
      </Container>
      {loading ? <Loading/>: ''}
      {error ? 'Error while loading': ''}
    </div>
  );
}

export default TrendingPage2;