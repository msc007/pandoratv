import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const BugReportButton = (props) => {
  const { siteName, id } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (id) => {
    try {
      const res = await fetch(`/api/links/bug/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
      });
      // Alert rate limit error message
      if(res.status === 429) {
        const jsonRes = await res.json();
        alert(jsonRes.limitErrorMessage);
      }
      setOpen(false);
    } catch(err) {
      alert('Error occured during submit: ' + err);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button size="small" color="secondary" startIcon={<ErrorIcon/>} onClick={handleClickOpen}>
        버그신고
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{siteName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 사이트 접속 문제시 신고 해주시면 검토후 처리됩니다
          </DialogContentText>
          {/*
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant='contained'>
            취소
          </Button>
          <Button onClick={() => handleSubmit(id)} color="secondary" variant='contained'>
            신고
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BugReportButton;