import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import React, {useRef} from 'react';
import axios from "axios";

// ----------------------------------------------------------------------

// const users = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.company.companyName(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer'
//   ])
// }));
const Users = (props)=>{
    const [name, setName] = React.useState("");
    const [enrol, setEnrol] = React.useState("");
    const [department, setDepartment] = React.useState("");
    const [marks, setMarks] = React.useState(-1);
    const [results, setresults] = React.useState([]);
    async function fetchUserDetails(){
        axios
        .get("http://127.0.0.1:3000/srm/exam/" + props.id + "/results")
        .then((res) => {
        // setName(res.data.resultsOfexam.student.full_name);
        // setEnrol(res.data.resultsOfexam.student.username);
        // setDepartment(res.data.resultsOfexam.student.department);
        // setMarks(res.data.resultsOfexam.marks);
        setresults(res.data.resultsOfexam);
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
// const USERLIST =[
//     results.map((result)=>(
        
//     ))
// ]

}
export default Users;