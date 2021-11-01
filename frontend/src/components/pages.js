
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

export const mainListItems = (
  <div>

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

    {/* <Link to="/projects" style={{textDecoration:"none"}}>
    <ListItem button as={NavLink} to="http://127.0.0.1:3000/projects">
    <Tooltip title="Projects" enterDelay={200} leaveDelay={100} placement="right">
    <ListItemIcon>
        <LayersIcon/>           
      </ListItemIcon>
      
        </Tooltip>
        <ListItemText primary="All Boards" style={{color: "#000"}} />
    </ListItem>
    </Link> */}

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