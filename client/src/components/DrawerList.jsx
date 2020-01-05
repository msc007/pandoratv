import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
//import ListSubheader from '@material-ui/core/ListSubheader';
import { Link, useLocation } from 'react-router-dom';
// Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import GetAppIcon from '@material-ui/icons/GetApp';
import ForumIcon from '@material-ui/icons/Forum';

export default function DrawerList() {
  const [active, setActive] = React.useState(useLocation().pathname);

  return (
    <React.Fragment>
      <Divider />
        <List>
          <ListItem button component={Link} to='/' onClick={()=> setActive('/')} selected={active === '/' ? true : false}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="홈" />
          </ListItem>
          <ListItem button component={Link} to='/sitetable' onClick={()=> setActive('/sitetable')} selected={active === '/sitetable' ? true : false}>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary="스포츠 라이브" />
          </ListItem>
          <ListItem button component={Link} to='/webhard' onClick={()=> setActive('/webhard')} selected={active === '/webhard' ? true : false}>
            <ListItemIcon>
              <GetAppIcon />
            </ListItemIcon>
            <ListItemText primary="미주 웹하드" />
          </ListItem>
          <ListItem button component={Link} to='/community' onClick={()=> setActive('/community')} selected={active === '/community' ? true : false}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="미주 커뮤니티" />
          </ListItem>
        </List>
      <Divider />
    </React.Fragment>
  );
}