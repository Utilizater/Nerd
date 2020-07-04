import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  barRoot: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%',
  },
  text: {
    color: '#efdab9',
    fontSize: '18px',
  },
});

const Header = () => {
  const classes = useStyles();

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <Box className={classes.root}>
      <AppBar
        position="static"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar className={classes.barRoot}>
          <Link to="/game" style={linkStyle}>
            <Typography className={classes.text}>Game</Typography>
          </Link>
          <Link to="/dictionary" style={linkStyle}>
            <Typography className={classes.text}>Dictionary</Typography>
          </Link>
          <Link to="/settings" style={linkStyle}>
            <Typography className={classes.text}>Settings</Typography>
          </Link>
        </Toolbar>
        <Toolbar>
          <Link to="/" style={linkStyle}>
            <Typography className={classes.text}>Login</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
