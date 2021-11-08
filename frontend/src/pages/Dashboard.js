import React, {useRef} from 'react';
import axios from "axios";
import { useTheme, makeStyles, createTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyAppBar from '../components/Myappbar';
import Cookies from 'js-cookie';
import '../components/style.css';
import { useHistory ,Link} from "react-router-dom";
import { Dialog , Grid} from '@mui/material';
import SubjectCard from '../components/SubjectCard';
import Box from '@mui/material/Box';
import DashGraph from '../components/dashGraph';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: "#ffffff",
  //   backgroundColor: combination[0]
  }));
const Dashboard = () => {
    const [user, setUser] = React.useState({});
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
        setUser(res.data);
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
    <MyAppBar title="Dashboard"/>
    <div style={{padding:"2rem",width:"100%", marginTop:"5rem"}}>
        
        <div style={{padding:"1rem", width:"100%"}}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid xs={12} style={{marginBottom:"2rem"}}> <DashGraph subjects={subjects}/></Grid>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5">View detailed results</Typography>
        </Box>
                  
                <Grid  xs={12}  style={{marginBottom:"2rem"}}>
                <Link to ="/results" style={{textDecoration:"none"}}>
                <RootStyle className="pop gradient" style={{color:"#ffffff"}}>
                {/* <IconWrapperStyle>
                    <Icon icon={bugFilled} width={24} height={24} />
                </IconWrapperStyle> */}
                <Typography variant="h3">All Results</Typography>
                {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                    {props.obj.name}
                </Typography> */}
                </RootStyle>
                </Link>
                </Grid>
                
        
        {/* <Box sx={{ pb: 5 }}>
          <Typography variant="h5">View detailed results</Typography>
        </Box>
        <Grid container spacing={3}>
            {subjects.map((subject)=>(
                
                <Grid item xs={12} sm={6} md={3}>
                <Link to ={`subject/${subject.code}`} style={{textDecoration:"none"}}>
                <SubjectCard obj={subject}/>
                </Link>
                </Grid>
                
            ))}
        </Grid> */}
        </div>
    </div>
    </div>
)
}

export default Dashboard;