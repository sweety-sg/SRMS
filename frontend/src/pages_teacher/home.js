import React, {useRef} from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@material-ui/core';
import MyAppBar from '../components/Myappbar';
import '../components/style.css';
import UpcomingExams from './upcomingExams';
import { Box } from '@mui/system';

const Home = ()=>{
    const [user, setUser] = React.useState({});
    const [subs, setSubs] = React.useState([]);
    async function fetchUserDetails(){
        axios
        .get("http://127.0.0.1:3000/srm/user/data")
        .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setSubs(res.data.subs);
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
        <MyAppBar/>
        <div style={{padding:"2rem", maxWidth:"100vw"}}>
        <div style={{padding:"1rem",maxWidth:"100vw", marginTop:"5rem",display:"flex",flexDirection:"column",alignContent:"center"}}>
           <Grid xs={12} style={{marginBottom:"4rem"}}>
           <Card>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    SK
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={user.full_name}
                subheader=
                {subs.map((sub)=>(
                    sub.code + " "
                ))}
            />
            
            <CardContent>
            {subs.map((sub)=>(
                    <Typography variant="body2" color="text.secondary">
                    {sub.name} ({sub.code}) :  {sub.wiki}
                    </Typography>
                ))}
            </CardContent>
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
            </CardActions> */}
            </Card>
            </Grid> 
            <Box sx={{ pb: 5 }}>
            <Typography variant="h5">Upcoming exams</Typography>
            </Box>
            
            <Grid xs={12} style={{marginBottom:"2rem"}}>
                <UpcomingExams/>
            </Grid>
        </div>
        </div>
        </div>
    );
}
export default Home;