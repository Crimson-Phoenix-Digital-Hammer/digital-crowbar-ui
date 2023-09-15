import * as React from 'react';
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Grid, Paper, Button } from '@mui/material'
import { Autorenew } from '@mui/icons-material'
import './Stats.css';
import MainNav from './MainNav';

function Stats() {
  const [stats, setStats] = useState([])
  const [reqTimes, setReqTimes] = useState([])
  // const [chatGPT, setChatGPT] = useState(0);


  const getTotalReqs = () => {
    const getchatGPT = JSON.parse(localStorage.getItem("chatGPT")) || [];
    const getTextSearch = JSON.parse(localStorage.getItem("Text Search")) || [];
    const getImageUpload = JSON.parse(localStorage.getItem("Image Upload")) || [];
    const getObfuscateText = JSON.parse(localStorage.getItem("Obfuscate Text")) || [];
    const getObfuscateImage = JSON.parse(localStorage.getItem("Obfuscate Image")) || [];
    setStats([...stats,
    { label: 'chatGPT', value: getchatGPT.length },
    { label: 'Text Search', value: getTextSearch.length },
    { label: 'Image Search', value: getImageUpload.length },
    { label: 'Obfuscate Text', value: getObfuscateText.length },
    { label: 'Obfuscate Image', value: getObfuscateImage.length }
    ])
  }
  const getReqTimes = () => {
    const getchatGPT = JSON.parse(localStorage.getItem("chatGPT reqTime")) || [];
    const getTextSearch = JSON.parse(localStorage.getItem("Text Search reqTime")) || [];
    const getImageUpload = JSON.parse(localStorage.getItem("Image Upload reqTime")) || [];
    const getObfuscateText = JSON.parse(localStorage.getItem("Obfuscate Text reqTime")) || [];
    const getObfuscateImage = JSON.parse(localStorage.getItem("Obfuscate Image reqTime")) || [];
    // console.log("getchatGPT: ", getchatGPT);
    const chatGPT = getchatGPT.reduce((a, b) => a + b, 0) / getchatGPT.length;
    const textSearch = getTextSearch.reduce((a, b) => a + b, 0) / getTextSearch.length;
    const ImageUpload = getImageUpload.reduce((a, b) => a + b, 0) / getImageUpload.length;
    const obfuscateText = getObfuscateText.reduce((a, b) => a + b, 0) / getObfuscateText.length;
    const obfuscateImage = getObfuscateImage.reduce((a, b) => a + b, 0) / getObfuscateImage.length;
    // console.log("chatGPT: ", chatGPT);
    setReqTimes([...reqTimes,
    { label: 'chatGPT', value: chatGPT },
    { label: 'Text Search', value: textSearch },
    { label: 'Image Search', value: ImageUpload },
    { label: 'Obfuscate Text', value: obfuscateText },
    { label: 'Obfuscate Image', value: obfuscateImage },
    ])
  }
  const calculateAverageReqTime = () => {
    const totalReqTimes = reqTimes.reduce((acc, curr) => acc + curr.value, 0);
    const averageReqTime = totalReqTimes / reqTimes.length;
    return isNaN(averageReqTime) ? 0 : averageReqTime;
  };

  const total = stats.reduce((a, b) => a + b.value, 0);
  const pullStats = () => {
    getTotalReqs();
    getReqTimes();
  }


  const size = {
    width: 400,
    height: 200,
  };

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 14,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const TotalReqsPieChart = () => {
    const data = [...stats];
    return <PieChart series={[
      {
        paddingAngle: 1,
        innerRadius: 60,
        outerRadius: 80,
        data,
      },
    ]}
      margin={{ right: 5 }}
      width={400}
      height={200}
      legend={{ hidden: true }} >
      <PieCenterLabel>{total} API Requests</PieCenterLabel>
    </PieChart>
  }

  const ReqTimesPieChart = () => {
    const data = [...reqTimes];
    return <PieChart series={[
      {
        paddingAngle: 1,
        innerRadius: 60,
        outerRadius: 80,
        data,
      },
    ]}
      margin={{ right: 5 }}
      width={400}
      height={200}
      legend={{ hidden: true }} >
      <PieCenterLabel> Avg Req Time</PieCenterLabel>
    </PieChart>
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <MainNav />
      </Grid>
      <Grid item md={9} xs={12}>
        <div className='main-content'>
          <div className='stats-container'>
            <div className="stats-header">
              <h2>Statistics</h2>
              <div className="stats-utils">
                <Button className='stats-button' onClick={pullStats}><Autorenew /></Button>
              </div>
            </div>
            <div className='stats-body'>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item md={5} xs={12}>
                  <Paper elevation={1} className='stats-paper'>
                    <TotalReqsPieChart />
                  </Paper>
                </Grid>
                <Grid item md={5} xs={12}>
                  <Paper elevation={1} className='stats-paper'>
                    {/* <span>Avg Req Time: {calculateAverageReqTime()} ms</span> */}
                    <ReqTimesPieChart />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}
export default Stats