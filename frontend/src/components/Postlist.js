import React, { Component } from 'react'
import axios from 'axios'
import { useTheme, makeStyles, createTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyAppBar from '../components/Myappbar';
import Cookies from 'js-cookie';
import '../components/style.css';
import { useHistory, Link } from "react-router-dom";
import { Dialog, Grid } from '@mui/material';
import SubjectCard from '../components/SubjectCard';
import Box from '@mui/material/Box';
import DashGraph from '../components/dashGraph';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import TextField from "@material-ui/core/TextField";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: "#ffffff",
  //   backgroundColor: combination[0]
}));

const PostList = () => {
  const [user, setUser] = React.useState({});
  const [values, setValues] = React.useState({});

  const [userdetails, setUserDetails] = React.useState([]);
  const [enrollment, setEnrollment] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState(0);
  const [id, setId] = React.useState(0);
  const handleEmailChange = (event, data) => {
    setEmail(event.target.value)
  }
  const handleMobileChange = (event, data) => {
    setMobile(event.target.value)
  }
  // formGroup:{
  //   alignItems: 'center'
  // }
  async function fetchUser() {
    axios
      .get("http://127.0.0.1:3000/srm/user/data")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setValues(res.data);
        setName(res.data.full_name);
        setEmail(res.data.email);
        setDepartment(res.data.department);
        setEnrollment(res.data.username);
        setMobile(res.data.mobile);
        setId(res.data.id);
        console.log({ user });
      })
      .catch((err) => {
        console.log(err);
        console.log("no");
      });
  }
  var csrf = Cookies.get("csrftoken");
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = user
    user.mobile = mobile
    user.email = email
    axios.put("http://127.0.0.1:3000/srm/user/"+ user.id+ "/", data, {
      headers: { "Content-Type": "application/json", "X-CSRFToken": csrf }, params: { withCredentials: true }
    })
      .then(res => {
        console.log(res)
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div  >

      <div style={{ display: "flex", height: "1000px" }}>
        <MyAppBar title="User_Details" />
        <div style={{ padding: "2rem", width: "100%", marginTop: "5rem" }}>

          <div style={{ paddingLeft: '40%', width: "100%", backgroundColor: 'grey' }}>
            <Box sx={{ pb: 5 }}>
              <Typography variant="h4"  >Personal Information</Typography>
            </Box>
          </div>
          <br/>
          <br/>
          <div style={{ paddingLeft: "35%", paddingBottom: "10rem" }} >
            <Grid container direction="row" >
              <form onSubmit={handleSubmit} noValidate >
                <div >
                  <Typography variant="h5" component="div" gutterBottom >
                    Academic Info:

                  </Typography>
                  <br />
                </div>
                <Box sx={{ pb: 7, justifyContent: 'center', display: 'flex' }}>
                  <label>
                    <div style={{ paddingLeft: '60%', alignItems: "bottom" }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        Name:
                      </Typography>
                    </div>
                  </label>
                  <label>
                    <div style={{ paddingLeft: "8rem" }}>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        //label="Disabled"
                        value={name}
                      />
                    </div>

                  </label>

                </Box>
                <Box sx={{ pb: 7, justifyContent: 'center', display: 'flex' }}>

                  <label>
                    <div style={{ paddingLeft: '60%', alignItems: "bottom" }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        Enrollment_No:
                      </Typography>
                    </div>
                  </label>
                  <label>
                    <div style={{ paddingLeft: "8rem" }}>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        //label="Disabled"
                        value={enrollment}
                      />
                    </div>
                  </label>

                </Box>

                <Box sx={{ pb: 7, justifyContent: 'center', display: 'flex' }}>

                  <label>
                    <div style={{ paddingLeft: '60%', alignItems: "bottom" }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        Department:
                      </Typography>
                    </div>
                  </label>
                  <label>
                    <div style={{ paddingLeft: "8rem" }}>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        //label="Disabled"
                        value={department}
                      />
                    </div>
                  </label>
                </Box>

                <div>
                  <Typography variant="h5" component="div" gutterBottom >
                    Contact Info:
                  </Typography>
                  <br />
                  <br />
                </div>
                <div>
                  <Box sx={{ pb: 7, justifyContent: 'center', display: 'flex' }}>

                    <label>
                      <div style={{ paddingLeft: '60%', alignItems: "bottom" }}>
                        <Typography variant="h6" component="div" gutterBottom>
                          Email_Id:
                        </Typography>
                      </div>
                    </label>
                    <label>
                      <div style={{ paddingLeft: "8rem" }}>
                        <TextField id="outlined-basic" variant="outlined"
                          value={email} onChange={handleEmailChange} />
                      </div>

                    </label>

                  </Box>

                  <Box sx={{ pb: 7, justifyContent: 'center', display: 'flex' }}>

                    <label>
                      <div style={{ paddingLeft: '60%', alignItems: "bottom" }}>
                        <Typography variant="h6" component="div" gutterBottom>
                          Mobile_No:
                        </Typography>
                      </div>
                    </label>
                    <label>
                      <div style={{ paddingLeft: "8rem" }}>
                        <TextField id="outlined-basic" variant="outlined"
                          value={mobile} onChange={handleMobileChange} />
                      </div>

                    </label>

                  </Box>
                </div>

                <Box sx={{ pb: 5 }}>


                  <div style={{ paddingLeft: '60%', alignItems: "bottom" }}>
                    <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                      Update
                    </Button>
                  </div>
                </Box>
              </form>
            </Grid>
            {/* <Button 
            onClick={Password_change()}
            className="light-hover"
            >changepasss</Button> */}


          </div>
        </div>
      </div>
    </div >
  )

}

export default PostList;