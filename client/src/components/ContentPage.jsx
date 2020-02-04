import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import Loading from './Loading';
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import EnterIcon from '@material-ui/icons/TransitEnterexit';

// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
  },
  content: {
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(6),

  }
}));

// ContentPage Functional Component
const ContentPage = () => {
  const { postId } = useParams();
  const classes = useStyles();
  // React hook initialize state and setter
  const [post, setPost] = useState('');
  //const [images, setImages] = useState([]);
  // React hook replace component lifecyle method, empty array makes the effect run on first render.
  useEffect(() => {
    fetch(`/api/posts/${postId}`)  // For production: https://pandoratv.tk/api/user"
      .then(res => res.json())
      .then(post => {
        setPost(post);
        //setImages([...post.img_urls]);
      });
  }, [postId]);

  // Loading Spinner
  if(post === '') {
    return <Loading/>;
  }
  // Render Contents
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
          {post.title}
        </Typography>   
        {/*
          images.map(img_url => (
              <React.Fragment key={img_url}>
                <img src={img_url} alt='' style={{maxWidth: '100%', height: 'auto', display: 'block'}} />
                <br/>
              </React.Fragment>
            )
          )
          */
        }
        {/* Content */}
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: post.text}}/>
        <Button variant='outlined' href={post.source} target='_blank' rel='noopener' fullWidth>
          출처 사이트 방문하기
          <EnterIcon />
        </Button>
        {/* COMMENTS */}
        <CommentSection postId={postId}/>
      </Container>     
    </div>
  );
}

export default ContentPage;