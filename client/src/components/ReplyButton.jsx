import React, { useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(6),
  },
  form: {
    width: '100%',
    PaddingBottom: theme.spacing(4),
  },
}));

const ReplyButton = (props) => {
  const { comment, replies, setReplies } = props;
  const classes = useStyles();
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [replyError, setReplyError] = useState('');
  // Name validation
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
    if(replyInput.length > 300)
      setReplyError('300 글자 이내');
    else
      setReplyError('');
  },[replyInput]);
  const handleOpen = () => {
    setReplyOpen(true);
  };
  const handleChangeReply= (e) => {
    setReplyInput(e.target.value);
  };
  const handleChangeName = (e) => {
    setNameInput(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleCancel = () => {
    setReplyInput('');
    setNameInput('');
    setPasswordInput('');
    setReplyOpen(false);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // TODO: handle submit comment
      const res = await fetch('https://pandoratv.tk//api/comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'postId': comment.postId,
          'parentId': comment._id,
          'replyOrigin': comment.replyOrigin ? comment.replyOrigin : comment._id,
          'replyTo': comment.author,
          'index': comment.index + 1,
          'author': nameInput,
          'password': passwordInput,
          'text': replyInput,
          'date': Date.now(),
        })
      });

      if(res.status === 200) {
        const data = await res.json();
        setReplyInput('');
        setNameInput('');
        setPasswordInput('');
        setReplyOpen(false);
        setReplies([...replies, data.comment]);
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box pl={8}>
        <Button color='primary' onClick={handleOpen}>댓글달기</Button>
      </Box>
      {replyOpen ? 
        <Box pl={9}>
          <form component='span' className={classes.form} onSubmit={handleSubmit} autoComplete='off'>
            <TextField label='닉네임' type='text' value={nameInput} onChange={handleChangeName} error={nameError !== ''} helperText={nameError} />
            <TextField label='비밀번호' type='password' value={passwordInput} onChange={handleChangePassword} error={passwordError !== ''} helperText={passwordError} />
            <TextField id='standard-multiline-flexible' label='댓글 달기...' multiline rowsMax={4} value={replyInput} onChange={handleChangeReply} error={replyError !== ''} helperText={replyError} fullWidth/>
            <Box display='flex' flexDirection='row-reverse' p={1} m={1} bgcolor='background.paper'>
              <ButtonGroup color='primary'>
                <Button type='button' variant='outlined' onClick={handleCancel}>취소</Button>
                <Button type='submit' variant='contained' disabled={replyInput === '' || nameInput === '' || passwordInput === '' || passwordError || replyError }>댓글</Button>
              </ButtonGroup>
            </Box>
          </form>
        </Box>
      :
        ''
      }
    </div>
  );
}

export default ReplyButton            