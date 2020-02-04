import React, { useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Comment from './Comment';
// Style
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(6),
  },
  form: {
    width: '100%',
    PaddingBottom: theme.spacing(4),
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  newline: {
    whiteSpace: 'pre-wrap'  // For newlines in comment
  },
  summary: {
    overflow: 'hidden'
  }
}));

const CommentSection = (props) => {
  const { postId } = props;
  const classes = useStyles();
  const [commentInput, setCommentInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [comments, setComments] = useState([]);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    fetch(`/api/comments/${postId}`)  // For production: https://pandoratv.tk/api/user'
      .then(res => res.json())
      .then(data => {
        setComments([...data.comments])
      });
  }, [postId]);
  // Name Validation
  useEffect(() => {
    if(nameInput.length > 10)
      setNameError('10 글자 이내');
    else
      setNameError('');
  },[nameInput]);
  // Password validation
  useEffect(() => {
    if(passwordInput.length > 10)
      setPasswordError('10 글자 이내');
    else
      setPasswordError('');
  },[passwordInput]);
// Comment validation
  useEffect(() => {
    if(commentInput.length > 300)
      setCommentError('300 글자 이내');
    else
      setCommentError('');
  },[commentInput]);

  const handleChangeComment = (e) => {
    setCommentInput(e.target.value);
  };
  const handleChangeName = (e) => {
    setNameInput(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleCancel = (e) => {
    setCommentInput('');
    setNameInput('');
    setPasswordInput('');
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'postId': postId,
          'parentId': null,
          'replyOrigin': null,
          'replyTo': '',
          'index': 0,
          'author': nameInput,
          'password': passwordInput,
          'text': commentInput,
          'date': Date.now(),
        })
      });

      if(res.status === 200) {
        const data = await res.json();
        setCommentInput('');
        setNameInput('');
        setPasswordInput('');
        setComments([...comments, data.comment]);
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant='h6'>Comments</Typography>
      <List>
        <Divider component='li' />
        <ListItem alignItems='flex-start'>
          <form component='span' className={classes.form} onSubmit={handleSubmit} autoComplete='off'>
            <TextField label='닉네임' type='text' value={nameInput} onChange={handleChangeName} error={nameError !== ''} helperText={nameError} />
            <TextField label='비밀번호' type='password' value={passwordInput} onChange={handleChangePassword} error={passwordError !== ''} helperText={passwordError}/>
            <TextField id='standard-multiline-flexible' label='댓글 달기...' multiline rowsMax={4} value={commentInput} onChange={handleChangeComment} error={commentError !== ''} helperText={commentError} fullWidth/>
            <Box display='flex' flexDirection='row-reverse' p={1} m={1} bgcolor='background.paper'>
              <ButtonGroup color='primary'>
                <Button type='button' variant='outlined' onClick={handleCancel}>취소</Button>
                <Button type='submit' variant='contained' disabled={commentInput === '' || nameInput === '' || passwordInput === '' || passwordError || commentError }>댓글</Button>
              </ButtonGroup>
            </Box>
          </form>
        </ListItem>
        <Divider component='li' />
        { /* Comments */
          comments.map((comment) => (
            <Comment key={comment._id} index={0} comment={comment}/>
          ))
        }
      <Divider component='li' />
      </List>
    </div>
  );
}

export default CommentSection;