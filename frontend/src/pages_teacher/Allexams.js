import React, {useRef} from 'react';
import axios from "axios";
import SubjectCard from '../components/SubjectCard';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MyAppBar from '../components/Myappbar';
import '../components/style.css';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import ExamsofSub from './examsofsub';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import AddExam from './addExam';
import { Dialog } from '@mui/material';
import Grow from "@material-ui/core/Grow";


const AllExams = () =>{
    const [subjects, setSubjects] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    async function fetchUserDetails(){
        axios
        .get("http://127.0.0.1:3000/srm/user/data")
        .then((res) => {
        console.log(res.data);
        setSubjects(res.data.subs);
        console.log("yes");
        })
        .catch((err) => {
        console.log(err);
        console.log("no");
        });
    }
React.useEffect(() => {
    fetchUserDetails();
},[]);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
return(
    <div className="flex-row">
        <MyAppBar title="Exams"/>
        <div style={{paddingTop:"5rem",width:"100%"}}>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} marginTop="1rem">
          <Typography variant="h4" gutterBottom>
            
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Schedule Exam
          </Button>
        </Stack>
        <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        className= "modalclass2"
        style={{minHeight:"1200px",  padding:"0rem",margin:"auto"}}
        TransitionComponent={Grow}
      >
          <AddExam style={{minHeight:"1200px",  padding:"0rem"}}/>
      </Dialog>
        <Grid container spacing={3} style={{padding:"0rem"}}>
            {subjects.map((subject)=>(
                
                <Grid item xs={12} >
                {/* <Link to ={`subject/${subject.code}/exams`} style={{textDecoration:"none"}}>
                <SubjectCard obj={subject}/>
                </Link> */}
                <ExamsofSub code={subject.code} style={{marginTop:0}}/>
                </Grid>
                
            ))}
        </Grid>
        </div>
    </div>
)
}


export default AllExams;