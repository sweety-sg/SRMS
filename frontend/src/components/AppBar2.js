import React, {useRef} from 'react';
// import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { useTheme, makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { Icon, Menu, MenuItem, Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {mainListItems ,secondaryListItems} from './pages' ;
// import AddIcon from '@mui/icons-material/Add';
// import NewProject from './newProject';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './style.css'
import { useHistory } from "react-router-dom";
import { ClickAwayListener } from '@mui/material';
import { logout } from './authentication/logout';
import { Dialog } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 10,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(6),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    TitleCont : {
        // flex:1,
        // flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        
    },
    linkcolor : { 
      color: 'white',
      fill: 'white'
    }
  }));
  export default function MyAppBar(props){
    let history = useHistory();

        async function fetchUserDetails(){
                axios
                    .get('http://127.0.0.1:3000/srm/user/data', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
                    .then((response) => {
                    })
                    .catch((error) => {
                        history.push("/");
                        console.log(error)
                    });
            }
        React.useEffect(()=>{
            fetchUserDetails();
        }, []);
      function stringAvatar(name) {
          return {
              sx: {
              bgcolor: stringToColor(name),
              },
              children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
          };
          }
      function stringToColor(string) {
            let hash = 0;
            let i;
        
            /* eslint-disable no-bitwise */
            for (i = 0; i < string.length; i += 1) {
                hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }
        
            let color = '#';
        
            for (i = 0; i < 3; i += 1) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.substr(-2);
            }
            /* eslint-enable no-bitwise */
        
            return color;
            }
    const handleClick = () => {
    setOpenlogo((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenlogo(false);
  };
  
  const renderMenu = (
    <Menu>
      "hello"
    </Menu>
  );
    const [openproj, setOpenproj] = React.useState(false);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openlogo, setOpenlogo] = React.useState(false);
    const handleOpenproj = () => setOpenproj(!openproj);
    const handleCloseproj = () => setOpenproj(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const styles = {
      position: 'absolute',
      top: 68,
      right: 0,
      zIndex: 1,
      border: '1px solid',
      p: 1,
      bgcolor: 'background.paper',
    };
  
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
       
      <>

        <div className={classes.root}>
             <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}
        //  style={{background:"#ffffff", color:"#5a5a5a"}}
        // style={{background:"#373737"}}
        style={{background:"#000"}}
         >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden) && "light-hover"} 
            >
              <MenuIcon />
            </IconButton>
            <Link to="/dashboard" style={{textDecoration:"none"}}>
            <IconButton >
            <HomeIcon style= {{marginLeft : 0 , marginRight : 4 ,color: 'white'}} />
            </IconButton>
            </Link>

            <Typography component="h1" variant="h6" color="inherit" style={{display:'inline',marginLeft:"20px"}}>
              {props.title}
            </Typography>
            <Container  className={classes.TitleCont} align='center'>
            
            <Icon>
            <GroupWorkIcon style= {{paddingLeft : 1 , paddingRight : 2.5}} />
            </Icon>
            <Typography component="h1" variant="h6" color="inherit" wrap style= {{paddingLeft : 2.5 , paddingRight : 1}}>
              SRMS
            </Typography>
            </Container>
    
           <Tooltip title="Add new project">
            <IconButton 
            color="inherit"
            onClick={handleOpenproj}
            >
            <Badge color="secondary">
                {/* <AddIcon /> */}
              </Badge>
              </IconButton>
            </Tooltip>
            

                 
            
            <div>
            <Button 
            endIcon={<LogoutIcon />} 
            color="inherit"
            onClick={logout()}
            className="light-hover"
            >
            <Typography component="h1" variant="button" color="inherit" wrap style= {{paddingLeft : 2.5 , paddingRight : 1}}>
              Logout
            </Typography>
             </Button>
             
             </div>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        //   style={{height:"100%"}}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        </div>
        
        </>
    )
  }