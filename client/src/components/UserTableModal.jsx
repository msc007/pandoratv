import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// Style
const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    bottom: '2rem',
    right: '2rem',
    position: 'fixed',
  },
}));
// UserTableModal Functional Component with props
const UserTableModal = (props) => {
  const classes = useStyles();
  const { rows, setRows } = props;
  const [open, setOpen] = React.useState(false);
  const [siteName, setSiteName] = useState('');
  const [siteLink, setSiteLink] = useState('');
  const [siteDescription, setSiteDescription] = useState('');

  // Modal State
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Handle form submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('/api/links/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'siteName': siteName,
          'siteLink': siteLink,
          'siteDescription': siteDescription
        })
      });
      const data = await res.json();
      // Response status check
      if(res.status === 500) {
        return alert('Unexpected error occured, please try again later');
      }
      // Alert rate limit error message
      if(res.status === 429) {
        alert(data.limitErrorMessage);
        return setOpen(false);
      }
      // Input validation check
      if(data.validationMessage) {
        return alert(data.validationMessage);
      }
      // Rerender on successful save and close modal
      if(res.status === 200) {
        setSiteName('');
        setSiteLink('');
        setSiteDescription('');
        setRows([...rows, data.row]);
        setOpen(false);
      }
    } catch(err) {
      alert('Error occured during submit: ' + err);
    }
  }
  return (
    <div>
      <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader title="사이트 등록" subheader='미주 한인들에게 알리고 싶거나 홍보하고 싶은 사이트가 있다면 등록해주세요.' align='center'/>
            <CardContent>
              <TextField
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                id="site-name"
                label="사이트명 (20자 이내)"
                fullWidth
                required
                autoComplete="off"
              />
              <TextField
                value={siteLink}
                onChange={(e) => setSiteLink(e.target.value)}
                id="site-link"
                label="사이트 주소 (http, https 포함)"
                fullWidth
                required
                autoComplete="off"
              />
              <TextField
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                id="site-description"
                label="사이트 설명 (30자 이내)"
                fullWidth
                required
                autoComplete="off"
              />
            </CardContent>
            <CardActions>
              <Button type='submit' variant='contained' color='primary' fullWidth>등록</Button>
            </CardActions>
          </Card>
        </form>
      </Dialog>
    </div>
  );
}

export default UserTableModal;