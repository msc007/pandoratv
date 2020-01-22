import React, { useState }from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(6),
  },
  form: {
    width: '100%',
    PaddingBottom: theme.spacing(4),
  },
}));

const ShowRepliesButton = (props) => {
  const { commentId } = props;
  const classes = useStyles();
  const handleClick = () => {
  }

  return (
    <div>
      <Box pl={8}>
        <Button color='primary' onClick={handleClick}>댓글보기</Button>
      </Box>
    </div>
  );
}

export default ShowRepliesButton;          