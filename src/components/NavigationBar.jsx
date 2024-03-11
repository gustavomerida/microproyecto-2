/* eslint-disable no-unused-vars */
import React, { useState, useEffect  } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logOut } from "../controllers/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { updateUsers } from "../services/users.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '50px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    width: '50%',
  },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: theme.palette.common.white,
  //   '&:hover': {
  //     backgroundColor: theme.palette.common.white,
  //   },
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    //position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer', 
    position: 'relative',
    backgroundColor: 'none',
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    }
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleEditProfile = () => {
        // Implementar la lógica para editar el perfil del usuario;
        navigate("/user/profile");
        console.log('Editar Perfil');
        handleClose();
    };
    
    const handleLogout = () => {
        // Implementar la lógica para cerrar sesión del usuario
        logOut();
        console.log('Cerrar Sesión');
        handleClose();
    };
    
    const user = useUser();
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState("");
    const [lastname, setLastname] = useState("");
    const [selectedGame, setSelectedGame] = useState("");
    const [gameOptions, setGameOptions] = useState([]);

    function getUserData(){
      
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <a  href='/'>
          <IconButton className={classes.searchIcon} edge="start" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
          </a>
          {/* <div className={classes.search}> */}
            <a  href='/search'>
            <IconButton className={classes.searchIcon}>
                <SearchIcon />
            </IconButton>
            </a>
          {/* </div> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Gaming Clubs
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="profile" onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
             
            <MenuItem onClick={handleEditProfile}>Editar Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;