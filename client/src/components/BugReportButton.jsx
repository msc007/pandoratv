import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const BugReportButton = (props) => {
  const { siteName, siteId } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (siteId) => {
    try {
      if(sessionStorage.getItem(siteId) !== 'true') {
        const res = await fetch(`/api/links/bug/${siteId}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
        });
        // Alert rate limit error message
        if(res.status === 429) {
          const jsonRes = await res.json();
          alert(jsonRes.limitErrorMessage);
        }
        sessionStorage.setItem(siteId, 'true');
      } else {
        alert('이미 신고하신 사이트입니다.');
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant='contained'>
            취소
          </Button>
          <Button onClick={() => handleSubmit(siteId)} color="secondary" variant='contained'>
            신고
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BugReportButton;