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
  
  
const AllResults = (props) =>{
    const [subject, setSubject] = React.useState({});
    const [id, setID] = React.useState();
    const [results, setResults] = React.useState([]);
    const code = props.match.params.code
    
    async function fetchResults(){
       
        axios
        .get("http://127.0.0.1:3000/srm/user/results")
        .then((res) => {
        setResults(res.data);
        console.log("yes");
        })
        .catch((err) => {
        console.log(err);
        console.log("no");
        });
    
    }
    React.useEffect(() => {
        fetchResults();
        
        
    },[]);
    var rows = [
        // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        // createData('Eclair', 262, 16.0, 24, 6.0),
        // createData('Cupcake', 305, 3.7, 67, 4.3),
        // createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
      for(var i=0; i< results.length;i++){
          rows.push(createData(results[i].subject.code, results[i].exam.name,results[i].marks, results[i].exam.id))
      }
    return(
        <div style={{display:"flex", height:"1000px"}}>
    <MyAppBar title="Result"/>
    <div style={{padding:"2rem",width:"100%", marginTop:"5rem"}}>
        <div style={{padding:"1rem", width:"100%"}}>
        {/* <Box sx={{ pb: 5 }}>
          <Typography variant="h4">{subject.code}</Typography>
          <Typography variant="subtitle1">{subject.name}</Typography>
        </Box> */}
        <Grid xs={12} style={{marginBottom:"2rem"}}></Grid>
        {results.length!= 0 &&
        <Grid xs={12} style={{marginBottom:"2rem"}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell align="right">Exam</StyledTableCell>
            <StyledTableCell align="right">Percentage&nbsp;%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.examID}>
              <StyledTableCell component="th" scope="row">
                {row.subject}
              </StyledTableCell>
              <StyledTableCell align="right">{row.exam}</StyledTableCell>
              <StyledTableCell align="right">{row.percentage}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
}
{results.length== 0 && 
<div style={{margin:"auto",padding:"1px", textAlign:"center"}}>
    <Typography variant="subtitle1" >No exams taken yet</Typography>
    </div>
}

        </div>
        </div>
        </div>
    );

}
export default AllResults;