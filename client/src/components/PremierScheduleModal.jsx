import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        프리미어리그 경기 일정
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
        <DialogTitle align='center' id="alert-dialog-slide-title">{"2019 프리미어리그 경기 일정 (Pacific Standard Time)"}</DialogTitle>
        <DialogContent>
          <iframe title='Premier Schedule' frameborder="0"  scrolling="no" width="600" height="400" src="https://www.fctables.com/england/premier-league/iframe/?type=league-scores&lang_id=2&country=67&template=10&team=&timezone=America/Los_Angeles&time=12&width=600&height=440&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&scoreb=f4454f&scorefc=FFFFFF&sgdcoreb=8f8d8d&sgdcorefc=FFFFFF&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF"></iframe>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}