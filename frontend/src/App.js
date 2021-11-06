import logo from './logo.svg';
import axios from "axios";
import './App.css';
import {Route, Switch} from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import MyAppBar from './components/Myappbar';
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard';
import Page404 from './pages/error';
import SubjectPage from './pages/subjectPage';
import AllResults from './pages/AllResults';
import Allsubjects from './pages/Allsubjects';
import Cookies from 'js-cookie';
import ExamResult from './pages_teacher/examresult';
import Home from './pages_teacher/home';
import SubjectsTeached from './pages_teacher/subjects';
import ExamsofSub from './pages_teacher/examsofsub';
import AllExams from './pages_teacher/Allexams';
// function loggedIn() {
//   return false
// }
// function requireAuth(nextState, replace) {
//   if (!loggedIn()) {
//     replace({
//       pathname: '/'
//     })
//   }
// }
function App() {
  const [isTeacher, SetTeacher]= useState(false);
  const [user, setUser] = React.useState({});
  // const cookies = new Cookies();
    async function fetchUserDetails(){
        axios
        .get("http://127.0.0.1:3000/srm/user/data")
        .then((res) => {
        console.log(res.data);
        setUser(res.data);
        Cookies.set("teacher",res.data.is_teacher, { path: '' })
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
  return (
    <>
    <div>
    <Route exact path="/dashboard">
      
        <Dashboard />
      </Route>
      <Route exact path="/">
        <LoginPage/>
      </Route>
      <Route exact path="/404">
        <Page404/>
      </Route>
      <Route exact path="/subject/:code" component={SubjectPage} />
      <Route exact path="/results" component={AllResults} />
      <Route exact path="/subjects" component={Allsubjects} />
      <Route exact path="/exam/:code/results" component={ExamResult} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/subjectsTeached" component={SubjectsTeached} />
      <Route exact path="/subject/:code/exams" component={ExamsofSub} />
      <Route exact path="/exams" component={AllExams} />
      
    </div>
    </>
  );
}

export default App;
