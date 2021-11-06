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
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// id = models.AutoField(primary_key=True)
//     name = models.CharField(max_length=255, blank=True, null=True)
//     date = models.DateField()
//     wiki = models.TextField(blank=True, null=True)
//     subject= models.ForeignKey(to=Subject, on_delete=models.CASCADE, null=True, related_name='examOfsub')
export default function AddExam(props){
  let history = useHistory();
    const [formData, setFormData] = React.useState({
        name: '',
      });
    const [wiki, setWiki] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [fdate, setfDate] = React.useState(convert(date));
    const [sub, setSub] = React.useState();
    const [subjects,setSubjects] = React.useState([]);
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
                            // setUserinfo(response.data)
                            setSubjects(response.data.subs)
                        }
                    })
                    .catch((error) => {
                        history.push("/");
                        console.log(error)
                    });
            }
            // async function fetchSubjectDetails(){
            //     axios
            //         .get('http://127.0.0.1:3000/srm/subject/'+ subjectId + "/", {headers:{ "X-CSRFToken":Cookies.get('csrftoken')}})
            //         .then((response) => {
            //             setmembers(response.data.students)
            //             // console.log(response.data.students)
            //         })
            //         .catch((error) => {
            //             console.log(error)
            //         });
            // }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        console.log(formData.wiki)
        setFormData((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      };

      const handleWikiChange = (content, editor) => {
        setWiki((content));
      };

    const handleSubjectChange = (event, data) => {
        console.log(event.target.value)
        setSub(event.target.value)
        
    }
    const handleDateChange = (event, data) => {
        setDate(event)
        var date = convert(event)
        setfDate(date)
        console.log(fdate)
    }
    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
    var csrf = Cookies.get("csrftoken");
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            date: fdate,
            subject: sub,
            name:formData.name,
            wiki:  wiki.wiki
        }
        axios
          .post("http://127.0.0.1:3000/srm/exam/", data, {
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
    //   fetchSubjectDetails();
    }, []);

    return(
        <Container component="main" style={{alignItems:"center", margin:"auto"}}>
            <div style={{  padding: "5px 5px", outline: "10px solid #e6e6e6e",  width:"450px", margin:"auto"}}>
            {/* <Paper className=".MuiPaper-outlined" sx={{ width: 10 }}> */}
                <form onSubmit={handleFormSubmit} noValidate >
                <Grid container spacing={2} style={{margin:"auto"}}>
                
            <Typography className="form-label">Subject</Typography>
            <Grid item xs={12}>
            <Select
                    className="custom-form-selection-outline"
                    // labelId="mutiple-chip-label"
                    // id="mutiple-chip"
                    style={props.borderClass}
                    style={{width: "100%"}}
                    value={sub}
                    label="Subject"
                    onChange={handleSubjectChange}
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
                    {subjects.map((subject) => (
                    <MenuItem key={subject.code} value={subject.id}>
                        {subject.code}
                    </MenuItem>
                    ))}
                </Select>
            </Grid>
            {/* <Typography className="form-label">Name</Typography> */}
            <Grid item xs={12}>
            <TextField
                        name="name"
                        fullWidth
                        id="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
            </Grid>

            <Grid item xs={12}>
            <TextField
                        name="Wiki"
                        fullWidth
                        id="wiki"
                        label="Wiki"
                        value={wiki.wiki}
                        onChange={handleWikiChange}
                    />
            </Grid>
            <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
            label="Date"
            openTo="year"
            views={['year', 'month', 'day']}
            value={date}
            format={'DD/MM/YYYY'}
            InputLabelProps={{
                shrink: true
              }}
            // onChange={(newValue) => {
            //     setDate(newValue);
            //     console.log(newValue)
            //   }}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
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