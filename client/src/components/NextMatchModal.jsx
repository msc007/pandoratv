import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
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
          토트넘 다음 경기 일정
      </Button>
      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth='md'
      >
        <DialogTitle align='center' id="alert-dialog-slide-title">{"토트넘 다음 경기 일정 (Pacific Standard Time)"}</DialogTitle>
        <DialogContent>
          <iframe title='Tottenham' frameBorder="0"  scrolling="no" width="600" height="200" src="https://www.fctables.com/teams/tottenham-195775/iframe/?type=team-next-match&lang_id=2&country=67&template=10&team=195775&timezone=America/Los_Angeles&time=12&width=600&height=200&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"></iframe>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}