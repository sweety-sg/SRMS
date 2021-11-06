import React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Alert, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Dialog } from '@mui/material';
import Grow from "@material-ui/core/Grow";
import { Grid } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import SelectInput from '@material-ui/core/Select/SelectInput';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [marks,setMarks]=  useState(props.marks);
  const [success,setSuccess]=  useState("Successfully updated result!");
  // console.log(props)
  const handleMarksChange = (event, data) => {
    setMarks(event.target.value)
    console.log(event.target.value)
}
  const handleDelete=()=>{
    axios
    .delete("http://127.0.0.1:3000/srm/result/"+ props.id +"/", {
        headers: {"X-CSRFToken":Cookies.get('csrftoken') },
        params: {withCredentials : true}
    })
    .then((response)=>{
        console.log(response);
        window.location.reload();
        setTimeout(setOpenS(true), 1000);
    })
    .catch((err) => {
        console.log("uff")
        console.log(err);
    });

  }
  const handleEdit=(e)=>{
    e.preventDefault();
    console.log("hi")
    const data = {
      id: props.id,
      // name : props.name,
      marks: marks,
      student: props.student,
      subject: props.subject,
      exam: props.exam
  }
    axios
      .put("http://127.0.0.1:3000/srm/result/"+props.id+ "/", 
        data,
        {
        headers: { "Content-Type": "application/json" ,  "X-CSRFToken": Cookies.get('csrftoken')},  
        params: {withCredentials : true}
      })
      .then((res) => {
        console.log(res);
        console.log(data);
        console.log("updated result");
        window.location.reload();
        setTimeout(setOpenS(true), 1000);
      })
      .catch((err) => {
        setOpenE(true);
        console.log(err);
        console.log("can't update");
      });
  }
  const handleOpen = () => {
    setIsOpen(false);
    setOpen(true);
  }
  const handleClose = () => {
    setIsOpen(false);
    setOpen(false);
  }
  
  const [name,setName]=  useState(props.name);
  const [openE, setOpenE] = React.useState(false);
    const [openS, setOpenS] = React.useState(false);
    const handleCloseE = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenE(false);
      };
      const handleCloseS = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenS(false);
      };
      
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={handleOpen}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        className= "modalclass"
        style={{height:"500px",  padding:"0rem"}}
        TransitionComponent={Grow}
      >
        <Container component="main" >
            <div style={{  padding: "5px 5px", outline: "10px solid #e6e6e6e", height:"200px" , width:"450px"}}>
            {/* <Paper className=".MuiPaper-outlined" sx={{ width: 10 }}> */}
                <form onSubmit={handleEdit} noValidate >
                <Grid container spacing={2} style={{margin:"auto"}}>
                
            <Typography className="form-label">Student</Typography>
            <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{color: "secondary"}}>{props.name}</Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField
            id="outlined-number"
            label="Edit Marks"
            type="number"
            value= {marks}
            onChange={handleMarksChange}
            InputLabelProps={{
                shrink: true,
            }}
            />
            </Grid>
            <Button
              className= "orange"
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "15px", background: "#336EF1", color:"white" }}
              sx = {{width: "100%", color: 'success'}}
            >
              Update
            </Button>
                </Grid>

                </form>
                <Snackbar open={openS} autoHideDuration={4000} onClose={handleCloseS}>
                <Alert onClose={handleCloseS} severity="success" sx={{ width: '100%' }}>
                {success}
                </Alert>
            </Snackbar>
            <Snackbar open={openE} autoHideDuration={4000} onClose={handleCloseE}>
                <Alert onClose={handleCloseE} severity="error" sx={{ width: '100%' }}>
                Error updating result! 
                </Alert>
            </Snackbar>
            </div>

        </Container>
      </Dialog>
    </>
  );
}
