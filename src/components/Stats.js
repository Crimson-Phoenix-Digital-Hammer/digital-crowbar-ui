import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Container, Divider, Grid, Paper, Button } from '@mui/material'
import { ModeCommentOutlined, NotesOutlined, PhotoOutlined, BarChartOutlined, SettingsOutlined, HelpCenterOutlined, LogoutOutlined, Autorenew } from '@mui/icons-material'
import logo from '../assets/images/dc-logo.png'
import { useTheme } from '@mui/material/styles';
import './Stats.css';

function Stats() {
    const [stats, setStats] = useState([])
    const [reqTimes, setReqTimes] = useState([])
    // const [chatGPT, setChatGPT] = useState(0);


    const getTotalReqs = () => {
        const getchatGPT = JSON.parse(localStorage.getItem("chatGPT")) || [];
        const getTextSearch = JSON.parse(localStorage.getItem("Text Search")) || [];
        const getImageSearch = JSON.parse(localStorage.getItem("Image Search")) || [];
        const getObfuscateText = JSON.parse(localStorage.getItem("Obfuscate Text")) || [];
        const getObfuscateImage = JSON.parse(localStorage.getItem("Obfuscate Image")) || [];
        setStats([...stats, 
            { label: 'chatGPT', value: getchatGPT.length }, 
            { label: 'Text Search', value: getTextSearch.length }, 
            { label: 'Image Search', value: getImageSearch.length }, 
            { label: 'Obfuscate Text', value: getObfuscateText.length }, 
            { label: 'Obfuscate Image', value: getObfuscateImage.length }
        ])
    }
    const getReqTimes = () => {
        const getchatGPT = JSON.parse(localStorage.getItem("chatGPT reqTime")) || [];
        const getTextSearch = JSON.parse(localStorage.getItem("Text Search ReqTime")) || [];
        const getImageSearch = JSON.parse(localStorage.getItem("Image Search ReqTime")) || [];
        const getObfuscateText = JSON.parse(localStorage.getItem("Obfuscate Text ReqTime")) || [];
        const getObfuscateImage = JSON.parse(localStorage.getItem("Obfuscate Image ReqTime")) || [];
        console.log("getchatGPT: ", getchatGPT);
        const chatGPT = getchatGPT.reduce((a, b) => a + b, 0) / getchatGPT.length;
        const textSearch = getTextSearch.reduce((a, b) => a + b, 0) / getTextSearch.length;
        const imageSearch = getImageSearch.reduce((a, b) => a + b, 0) / getImageSearch.length;
        const obfuscateText = getObfuscateText.reduce((a, b) => a + b, 0) / getObfuscateText.length;
        const obfuscateImage = getObfuscateImage.reduce((a, b) => a + b, 0) / getObfuscateImage.length;
        console.log("chatGPT: ", chatGPT);
        setReqTimes([...reqTimes, 
            { label: 'chatGPT', value: chatGPT }, 
            { label: 'Text Search', value: textSearch }, 
            { label: 'Image Search', value: imageSearch }, 
            { label: 'Obfuscate Text', value: obfuscateText }, 
            { label: 'Obfuscate Image', value: obfuscateImage }
        ])
    }
    const total = stats.reduce((a, b) => a + b.value, 0);
    // const average = reqTimes[0].value / 1000;
    // console.log("average: ", average);
    
    // console.log("stats: ", stats);
    // console.log("Total Api Request: ", total);
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
                <PieCenterLabel>{total} Total API Requests</PieCenterLabel>
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
        <div className='main-menu'>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/"><ModeCommentOutlined fontSize='large' /><span>AI Obfuscation Helper</span></NavLink>
              </li>
              <li>
                <NavLink to="/text-search"><NotesOutlined fontSize='large' /><span>Text Search</span></NavLink>
              </li>
              <li>
                <NavLink to="/image-search"><PhotoOutlined fontSize='large' /><span>Image Search</span></NavLink>
              </li>
              <li>
                <NavLink to="/stats"><BarChartOutlined fontSize='large' /><span>Statistics</span></NavLink>
              </li>
              <li>
                <NavLink to="/settings"><SettingsOutlined fontSize='large' /><span>Settings</span></NavLink>
              </li>
              <li>
                <NavLink to="/updates-and-faq"><HelpCenterOutlined fontSize='large' /><span>Updates & FAQ</span></NavLink>
              </li>
            </ul>
          </nav>
          <footer className='sidebar-footer'>
            <Divider light={true} />
            <Link to="/log-out"><span>Log Out</span><LogoutOutlined fontSize='large' /></Link>
          </footer>
        </div>
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
                                <ReqTimesPieChart />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <div className='stats-footer'>
                    
                </div>
            </div>
        </div>
      </Grid>
      
    </Grid>
  )
}
export default Stats