import React from 'react';
// Material-ui
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link, useLocation } from 'react-router-dom';
// Mateiral-ui Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ForumIcon from '@material-ui/icons/Forum';
import TrendingIcon from '@material-ui/icons/Whatshot';
import SportsIcon from '@material-ui/icons/SportsSoccer';
import MessageIcon from '@material-ui/icons/Message';
import LinkIcon from '@material-ui/icons/Link';
// DrawerList Functional Component
const DrawerList = () => {
  const [active, setActive] = React.useState(useLocation().pathname);

  return (
    <React.Fragment>
      <Divider />
        {/* PRIMARY LIST */}
        <List>
          <ListItem button component={Link} to='/' onClick={()=> setActive('/')} selected={active === '/' ? true : false}> 
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="홈" />
          </ListItem>
          <ListItem button component={Link} to='/trending' onClick={()=> setActive('/trending')} selected={active === '/trending' ? true : false}> 
            <ListItemIcon>
              <TrendingIcon />
            </ListItemIcon>
            <ListItemText primary="트렌딩" />
          </ListItem>
          <ListItem button component={Link} to='/board' onClick={()=> setActive('/board')} selected={active === '/board' ? true : false}> 
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="게시판" />
          </ListItem>
        </List>
      <Divider />     
      {/* SECONDARY */}
      <List> 
        <ListSubheader inset> 사이트 모음 </ListSubheader>
        <ListItem button component={Link} to='/sports' onClick={()=> setActive('/sports')} selected={active === '/sports' ? true : false}>
          <ListItemIcon>
            <SportsIcon />
          </ListItemIcon>
          <ListItemText primary="스포츠 라이브" />
        </ListItem>
        <ListItem button component={Link} to='/livetv' onClick={()=> setActive('/livetv')} selected={active === '/livetv' ? true : false}>
          <ListItemIcon>
            <LiveTvIcon />
          </ListItemIcon>
          <ListItemText primary="라이브 TV" />
        </ListItem>
        <ListItem button component={Link} to='/webhard' onClick={()=> setActive('/webhard')} selected={active === '/webhard' ? true : false}>
          <ListItemIcon>
            <CloudDownloadIcon />
          </ListItemIcon>
          <ListItemText primary="미주 웹하드" />
        </ListItem>
        <ListItem button component={Link} to='/community' onClick={()=> setActive('/community')} selected={active === '/community' ? true : false}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="미주 커뮤니티" />
        </ListItem>
        <ListItem button component={Link} to='/userlink' onClick={()=> setActive('/userlink')} selected={active === '/userlink' ? true : false}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="스포츠 라이브" />
        </ListItem>
      </List>

    </React.Fragment>
  );
}

export default DrawerList;