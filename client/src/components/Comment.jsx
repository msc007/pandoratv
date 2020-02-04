import React, { useState, useEffect }from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ReplyButton from './ReplyButton';
//import ViewRepliesButton from './ViewRepliesButton';
//import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(6),
  },
  form: {
    width: '100%',
    paddingBottom: theme.spacing(4),
  },
  newline: {
    whiteSpace: 'pre-wrap', // For newlines in comment
    overflowWrap: 'break-word', // For overflow text to wrap
  },
  summary: {
    overflow: 'hidden'
  },
  reply: {
    paddingLeft: theme.spacing(6)
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const genComment = (comments, index) => {
  return comments.map((comment) => (
    <Comment key={comment._id} index={index+1} comment={comment}/>
  ));
}
const Comment = (props) => {
  const { comment, index } = props;
  const classes = useStyles();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if(index === 0) { // Fetching only once per post comment
      // Get replies
      fetch(`/api/comments/replies/${comment._id}`)  // For production: https://pandoratv.tk/api/..."
        .then(res => res.json())
        .then(data => {
          setReplies([...data.comments])
      });
    }
  }, [comment._id, index]);

  return (
    <div className={index === 1 ? classes.reply : ''}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={index > 0 ? classes.avatar: ''} alt={comment.author} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <React.Fragment>
              <Typography variant='subtitle2' display='inline'>
                {comment.author}
                {' '}
              </Typography>
              <Typography variant='caption' display='inline' align='right'>
                {comment.date.substring(0,10)}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
            {comment.replyTo  && comment.index > 1 ?
              <Typography component='div' variant="body2" color='primary'>
                {'@' + comment.replyTo}
                {' '}
                <Typography className={classes.newline} display='inline' variant="body2" color="textPrimary">
                  {comment.text}
                </Typography>
              </Typography>
              :
              <Typography className={classes.newline} variant="body2" color="textPrimary">
                {comment.text}
              </Typography>
            }
            </React.Fragment>
          }
        />
      </ListItem>
      {/* Reply */}
      <ReplyButton comment={comment} replies={replies} setReplies={setReplies}/>
      {/*<ViewRepliesButton commentId={comment._id}/>*/}
      {/* Gen comments */}
      {replies ? genComment(replies, index) : ''}
    </div>
  );
}

export default Comment;