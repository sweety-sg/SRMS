import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import Page from '@material-ui/core';
import React, {useRef} from 'react';
import axios from "axios";
import "../components/style.css";
import { Dialog } from '@mui/material';
import Grow from "@material-ui/core/Grow";
import Cookies from 'js-cookie';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
// import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import AddResult from './addresult';
//
// import USERLIST from '../_mocks_/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'enrolment', label: 'Enrolment', alignRight: false },
  { id: 'department', label: 'Department', alignRight: false },
  { id: 'marks', label: 'Marks', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ExamResult(props) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [max,setMax]=useState("100vh");
  const [results, setResults] = React.useState([]);
  const [subject, setSubject] = React.useState(-1);
  const [openres, setOpenres] = React.useState(false);
  const id = props.match.params.code
  const isteacher = ()=>{
      return(Cookies.get("teacher"))
  }
  
    async function fetchResultDetails(){
        axios
        .get("http://127.0.0.1:3000/srm/exam/" + id + "/results")
        .then((res) => {
        // setName(res.data.resultsOfexam.student.full_name);
        // setEnrol(res.data.resultsOfexam.student.username);
        // setDepartment(res.data.resultsOfexam.student.department);
        // setMarks(res.data.resultsOfexam.marks);
        setSubject(res.data.subject.id);
        setResults(res.data.resultsOfexam);
        console.log("yes");
        })
        .catch((err) => {
        console.log(err);
        console.log("no");
        });
    }
React.useEffect(() => {
    fetchResultDetails();
},[]);
  
  var USERLIST =[
  ]
  var st;
  for(var i=0;i<results.length;i++){
      if(results[i].marks >= 35){
          st= "Passed";
      }
      else{
          st= "Failed";
      }
      var obj ={
          id: results[i].id,
          studentId : results[i].student.id,
          exam: results[i].exam.id,
          name: results[i].student.full_name,
          enrolment: results[i].student.username,
          department: results[i].student.department,
          marks: results[i].marks,
          status: st
      };
      USERLIST.push(obj);
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleOpen = () => setOpenres(true);
  const handleClose = () => setOpenres(false);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    if(parseInt(event.target.value, 10)==25){
        setMax("240vh");
    }
    else if(parseInt(event.target.value, 10)==5){
        setMax("50vh");
    }
    else{
        setMax("100vh");
    }
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    // <Page title="User | Minimal-UI">
    (isteacher()) &&
        <>
      <Container  style={{maxHeight:"120vh"}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{padding:"2rem", margin:"2rem"}}>
          <Typography variant="h4" gutterBottom>
            RESULTS
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Add result
          </Button>
        </Stack>
        <Dialog
        open={openres}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        className= "modalclass"
        style={{height:"500px",  padding:"0rem"}}
        TransitionComponent={Grow}
      >
          <AddResult examId={id} subjectId={subject} style={{height:"500px", padding:"1rem"}} />
      </Dialog>
        <Card className="dark-shadow">
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar style={{maxHeight: max}}>
            <TableContainer sx={{ minWidth: 800 }} style={{margin:"1px"}}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, department, status, enrolment, avatarUrl, marks , exam,studentId} = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" style={{fontWeight:"bold"}} noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{enrolment}</TableCell>
                          <TableCell align="left">{department}</TableCell>
                          <TableCell align="left">{marks}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'Failed' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu id={id} name={name} marks={marks} exam={exam} student={studentId}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>


                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>

            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
         </>       
                
    // </Page>
  );
}