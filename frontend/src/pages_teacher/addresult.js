import * as React from 'react';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { Checkbox } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';

export default function AddResult(props){
  let history = useHistory();
    const examId = props.examId
    const subjectId = props.subjectId
    console.log(props)
    const [formData, setFormData] = React.useState({
        exam : examId,
        subject: subjectId
      });
    // const [description, setDescription] = React.useState("");
    const [marks, setMarks] = React.useState();
    const [userinfo, setUserinfo] = React.useState({full_name:"no name"});
    const [student,setStudent] = React.useState();
    const [members,setmembers] = React.useState([]);
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
      
    async function fetchUserDetails(){
                axios
                    .get('http://127.0.0.1:3000/srm/user/data', {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
                    .then((response) => {
                        if(!response.data.is_teacher){
                            history.push("/404");
                        }
                        else{
                            setUserinfo(response.data)
                        }
                    })
                    .catch((error) => {
                        history.push("/");
                        console.log(error)
                    });
            }
            async function fetchSubjectDetails(){
                axios
                    .get('http://127.0.0.1:3000/srm/subject/'+ subjectId + "/", {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
                    .then((response) => {
                        setmembers(response.data.students)
                        // console.log(response.data.students)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      };

    const handleStudentChange = (event, data) => {
        setStudent(event.target.value)
    }
    const handleMarksChange = (event, data) => {
        setMarks(event.target.value)
    }

    var csrf = Cookies.get("csrftoken");
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            marks: marks,
            student: student,
            exam:formData.exam,
            subject:  formData.subject
        }
        axios
          .post("http://127.0.0.1:3000/srm/result/", data, {
            headers: { "Content-Type": "application/json" ,  "X-CSRFToken": csrf},  params: {withCredentials : true}
          })
          .then((res) => {
            setOpenS(true)
            console.log(res);
            console.log("posted form");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            setOpenE(true);
            console.log("can't post form");
          });
      };

    React.useEffect(()=>{
      fetchUserDetails();
      fetchSubjectDetails();
    }, []);

    return(
        <Container component="main" >
            <div style={{  padding: "5px 5px", outline: "10px solid #e6e6e6e", height:"200px" , width:"450px"}}>
            {/* <Paper className=".MuiPaper-outlined" sx={{ width: 10 }}> */}
                <form onSubmit={handleFormSubmit} noValidate >
                <Grid container spacing={2} style={{margin:"auto"}}>
                
            <Typography className="form-label">Student</Typography>
            <Grid item xs={12}>
            <Select
                    className="custom-form-selection-outline"
                    // labelId="mutiple-chip-label"
                    // id="mutiple-chip"
                    style={props.borderClass}
                    style={{width: "100%"}}
                    value={student}
                    onChange={handleStudentChange}
                    input={<Input id="select-multiple-chip" />}
                    // renderValue={(selected) => (
                    // <div>
                    //     {selected.map((value) => (
                    //     <Chip
                    //         key={value}
                    //         label={
                    //         users.filter((user, index) => user.id == value)[0]
                    //             .full_name
                    //         }
                    //         style={{ margin: "10px", borderRadius: "5px" }}
                    //     />
                    //     ))}
                    // </div>
                    // )}
                >
                    {members.map((user) => (
                    <MenuItem key={user.full_name} value={user.id}>
                        {user.full_name}
                    </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
            <TextField
            id="outlined-number"
            label="Marks"
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
              Add
            </Button>
                </Grid>

                </form>
                <Snackbar open={openS} autoHideDuration={4000} onClose={handleCloseS}>
                <Alert onClose={handleCloseS} severity="success" sx={{ width: '100%' }}>
                Successfully added result!
                </Alert>
            </Snackbar>
            <Snackbar open={openE} autoHideDuration={4000} onClose={handleCloseE}>
                <Alert onClose={handleCloseE} severity="error" sx={{ width: '100%' }}>
                Error adding result! Check for duplicate data.
                </Alert>
            </Snackbar>
            </div>

        </Container>
    )



}