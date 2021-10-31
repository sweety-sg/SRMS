import React, {useRef} from 'react';
import axios from "axios";
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
// import { fNumber } from '../../../utils/formatNumber';
// //
// import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------



export default function DashGraph(props) {
    const subjects= props.subjects
    const [results, setResults] = React.useState([]);
    async function fetchUserResult(){
        axios
        .get("http://127.0.0.1:3000/srm/user/results")
        .then((res) => {
        console.log(res.data);
        setResults(res.data);
        console.log("yes");
        })
        .catch((err) => {
        console.log(err);
        console.log("no");
        });
    }
React.useEffect(() => {
    fetchUserResult();
},[]);
    var arr = []
    for(var i=0; i< subjects.length;i++){
        var c=0;
        var total=0;
        for(var j=0;j<results.length;j++){
            if(subjects[i].id==results[j].id){
                total+= results[j].marks;
                c ++;
            }
        }
        if(c!=0){
            arr.push(total/c);
        }
        else{
            arr.push("Not conducted")
        }
    }
    const CHART_DATA = [{ data: arr }];
    const chartOptions = {
    // tooltip: {
    //   marker: { show: false },
    //   y: {
    //     formatter: (seriesName) => fNumber(seriesName),
    //     title: {
    //       formatter: (seriesName) => `#${seriesName}`
    //     }
    //   }
    // },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: subjects.map((subject)=>(
          subject.code
      ))
    
    }
  };

  return (
    <Card>
      <CardHeader title="Your Performance" subheader="subject-wise" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}