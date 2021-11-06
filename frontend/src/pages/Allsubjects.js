import React, {useRef} from 'react';
import axios from "axios";
import SubjectCard from '../components/SubjectCard';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MyAppBar from '../components/Myappbar';
import '../components/style.css';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const Allsubjects = () =>{
    const [subjects, setSubjects] = React.useState([]);
    let history = useHistory();
    async function fetchUserDetails(){
        axios
        .get("http://127.0.0.1:3000/srm/user/data")
        .then((res) => {
        console.log(res.data);
        if(res.data.is_teacher){
            history.push("/home");
        }
        setSubjects(res.data.subjects);
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

return(
    <div className="flex-row">
        <MyAppBar title="Subjects"/>
        <div style={{padding:"2rem",width:"100%", marginTop:"5rem"}}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5">Subjects you are enrolled in</Typography>
        </Box>
        <Grid container spacing={3}>
            {subjects.map((subject)=>(
                
                <Grid item xs={12} sm={6} md={3}>
                <Link to ={`subject/${subject.code}`} style={{textDecoration:"none"}}>
                <SubjectCard obj={subject}/>
                </Link>
                </Grid>
                
            ))}
        </Grid>
        </div>
    </div>
)
}


export default Allsubjects;