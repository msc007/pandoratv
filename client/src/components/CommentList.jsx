import React, { useState } from "react";
// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';

// Style
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  body: {
    marginLeft: 30
  },
}));

// CommentList Functional Component
const CommentList = () => {
  const classes = useStyles();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = index => e => {
    isClicked[index] ? setIsClicked({[index]: false}) : setIsClicked({[index]: true});
  };

  return (
    <List dense className={classes.root} variant='outlined'>
      <Divider component='li'/>
      {
        [0, 1, 2, 3].map(value => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <React.Fragment key={value}>
          <ListItem button value={value} onClick={handleClick(value)} >
              <PersonIcon/>
              <Typography>Min</Typography>
              {/*
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />*/}
            <ListItemText className={classes.body} id={labelId} primary={`Line item ${value + 1}`} />

            {/*
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="good">
                <CommentIcon />
              </IconButton> 
              <IconButton edge="end" aria-label="good">
                <ThumbUpIcon />
              </IconButton> 
              <IconButton edge="end" aria-label="bad">
                <ThumbDownIcon />
              </IconButton>
            </ListItemSecondaryAction>
            */}
          </ListItem>
          {
            isClicked[value] ? (    
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Standard" />
            </form>
            ) : ""
          }
          <Divider component='li'/>
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default CommentList;