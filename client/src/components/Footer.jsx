import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// Material-ui
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';


// Footer Functional Component
const Footer = () => {
  return (
    <Box pt={4}>
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' component={RouterLink} to='/'>
          PandoraTV
        </Link>{' '}
        {new Date().getFullYear()}
        {' | '}
        <Link color='inherit' component={RouterLink} to='/about'>
          About
        </Link>{' '}
      </Typography>
    </Box>
  );
}

export default Footer;