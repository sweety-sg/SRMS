
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Tooltip } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';

export const mainListItems = (
  <div>
    <Link to="/dashboard" style={{textDecoration:"none"}}>
    <ListItem button >
    <Tooltip title="Dashboard" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <DashboardIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="Dashboard" style={{color: "#000"}}/>
    </ListItem>
    </Link>
    <Link to="/results" style={{textDecoration:"none"}}>
    <ListItem button >
    <Tooltip title="Results" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <AssessmentIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="View Result" style={{color: "#000"}}/>
    </ListItem>
    </Link>

    <Link to="/subjects" style={{textDecoration:"none"}}>
    <ListItem>
    <Tooltip title="Subjects" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <MenuBookIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="Subjects" style={{color: "#000"}} />
    </ListItem>
    </Link>

    <Link to="/myprofile" style={{textDecoration:"none"}}>
    <ListItem button>
    <Tooltip title="Your Profile" enterDelay={200} leaveDelay={100} placement="right">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      
      </Tooltip>
      <ListItemText primary="Your Profile" style={{color: "#000"}}/>
    </ListItem>  
    </Link>
  </div>
);

export const teacherList = (
  <div>
    <Link to="/home" style={{textDecoration:"none"}}>
    <ListItem button >
    <Tooltip title="Home" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <HomeIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="Home" style={{color: "#000"}}/>
    </ListItem>
    </Link>
    {/* <Link to="/results" style={{textDecoration:"none"}}>
    <ListItem button >
    <Tooltip title="Results" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <AssessmentIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="View Result" style={{color: "#000"}}/>
    </ListItem>
    </Link> */}
    <Link to="/exams" style={{textDecoration:"none"}}>
    <ListItem>
    <Tooltip title="Exams" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <LibraryBooksIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="Exams" style={{color: "#000"}} />
    </ListItem>
    </Link>

    <Link to="/subjectsTeached" style={{textDecoration:"none"}}>
    <ListItem>
    <Tooltip title="Your subjects" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
    <MenuBookIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="Your subjects" style={{color: "#000"}} />
    </ListItem>
    </Link>

    <Link to="/myprofile" style={{textDecoration:"none"}}>
    <ListItem button>
    <Tooltip title="Your Profile" enterDelay={200} leaveDelay={100} placement="right">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      
      </Tooltip>
      <ListItemText primary="Your Profile" style={{color: "#000"}}/>
    </ListItem>  
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Assigned to you</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);