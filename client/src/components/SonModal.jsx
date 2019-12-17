import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button  variant="contained" color="primary" onClick={handleClickOpen}>
        손흥민 스텟
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth='md'
      >
        <DialogContent overflow-y='hidden'>
            <a href="https://www.fctables.com/players/heungmin_son-247612/" title="Heung-Min Son stats">
              <img src="https://www.fctables.com/uploads/infographics/profil/247612/heungmin_son.jpg" alt="Heung-Min Son stats" />
            </a>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}