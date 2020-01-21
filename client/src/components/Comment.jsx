import React, { useState, useEffect }from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ReplyButton from './ReplyButton';
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
    whiteSpace: 'pre-wrap'  // For newlines in comment
  },
  summary: {
    overflow: 'hidden'
  },
  reply: {
    paddingLeft: theme.spacing(6)
  }
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
    // Get nested comments (replies)
    fetch(`/api/replies/${comment._id}`)  // For production: https://pandoratv.tk/api/..."
      .then(res => res.json())
      .then(data => {
        setReplies([...data.comments])
      });
  }, [comment._id]);

  return (
    <div className={index > 0 ? classes.reply : ''}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={comment.author + ' ' + comment.date.substring(0,10)}
          secondary={
            <React.Fragment>
              <Typography className={classes.newline} component="span" variant="body2" color="textPrimary" noWrap>
                {comment.text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {/* Reply */}
      <ReplyButton postId={comment.postId} commentId={comment._id} replies={replies} setReplies={setReplies}/>
      {/* Gen comments */}
      {replies ? genComment(replies, index) : ''}
    </div>
  );
}

export default Comment;