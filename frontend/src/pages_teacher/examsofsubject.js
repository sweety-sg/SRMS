import React, {useRef} from 'react';
import axios from "axios";
import { useTheme, makeStyles, createTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  function createData(subject,exam,percentage, examID) {
    return { subject,exam,percentage, examID };
  }
  
  
const ExamsofSub = (props) =>{
    const [subject, setSubject] = React.useState({});
    const [id, setID] = React.useState();
    const [exams, setExams] = React.useState([]);
    const code = props.match.params.code
    function fetchsubject(){
        axios
        .get("http://127.0.0.1:3000/srm/subject/"+ code)
        .then((res) => {
        setSubject(res.data);
        setID(res.data.id);
        setExams(res.data.examOfsub)
        console.log(res.data);
        // fetchResOfsub(res.data.id);
        })
        .catch((err) => {
        console.log(err);
        console.log("no");
        });
    }
    // function fetchResOfsub(id){
       
    //     axios
    //     .get("http://127.0.0.1:3000/srm/subject/"+id+"/result")
    //     .then((res) => {
    //     setResults(res.data);
    //     console.log("yes");
    //     })
    //     .catch((err) => {
    //     console.log(err);
    //     console.log("no");
    //     });
    
    // }
    React.useEffect(() => {
        fetchsubject();
        
        
    },[]);
    var rows = [
        // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        // createData('Eclair', 262, 16.0, 24, 6.0),
        // createData('Cupcake', 305, 3.7, 67, 4.3),
        // createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
    //   for(var i=0; i< results.length;i++){
    //       rows.push(createData(results[i].subject.code, results[i].exam.name,results[i].marks, results[i].exam.id))
    //   }
    return(
        <div className="flex-row">
        <MyAppBar title="Subjects"/>
        <div style={{padding:"2rem",width:"100%", marginTop:"5rem"}}>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5">Exams of {subject.code}</Typography>
        </Box>
        <Grid container spacing={3}>
            {exams.map((exam)=>(
                
                <Grid item xs={12} sm={6} md={3}>
                <Link to ={`/exam/${exam.id}/results`} style={{textDecoration:"none"}}>
                <SubjectCard obj={exam} isExam={true}/>
                </Link>
                </Grid>
                
            ))}
        </Grid>
        </div>
    </div>
    );

}
export default ExamsofSub;