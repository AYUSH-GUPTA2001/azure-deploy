import { useEffect, useState } from "react";
import './Dashboard.css'
import { axisClasses } from '@mui/x-charts';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PieChart } from '@mui/x-charts/PieChart'
import { ChartsYAxis } from "@mui/x-charts";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import Collapse from '@mui/material/Collapse';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import HelpIcon from '@mui/icons-material/Help';
import lowRisk from '../../assets/low_risk.jpg'
import highRisk from '../../assets/high_risk.jpg'
import mediumRisk from '../../assets/medium_risk.jpg'
import { BarChart } from '@mui/x-charts/BarChart';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import image2 from '../../assets/animation.gif'
import image3 from '../../assets/seconds.gif'
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridRowEditStopReasons } from "@mui/x-data-grid";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import image from '../../assets/download.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import * as React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Alert, Skeleton } from "@mui/lab";
import Card from "../Card/Card";
import { LineChart } from '@mui/x-charts/LineChart';
import { useStaticPicker } from "@mui/x-date-pickers/internals";


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function Dashboard() {
  // debugger
  const [sessionModalOpen,setSessionModalOpen]=useState(false)
  const handleSessionModalClose = (event,reason) => {
    if (reason !== 'backdropClick') {
      setSessionModalOpen(false)
    }
   };
   const [timerModalOpen,setTimerModalOpen]=useState(false)
   const handleTimerModalClose = (event,reason) => {
    if (reason !== 'backdropClick') {
      setTimerModalOpen(false)
    }
   };
   let countdown;
   let leftTime,expirationTime,timeInSeconds;
   
   let splitarray = window.location.pathname.split('/');
   let _clientID= splitarray[splitarray.length-1];
   let storage = JSON.parse(localStorage.getItem(_clientID));

   function startTimer() {
    updateTimer();
    countdown = setInterval(updateTimer, 1000);
  }
  
  function stopTimer() {
      clearInterval(countdown);
  }

  function updateTimer() {
    // //debugger
    if(!localStorage.getItem(_clientID))
    {
       stopTimer();
       navigate('/investor')
    }
    else
    {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      if(timeInSeconds>0) {
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      let timer=document.getElementById('timer')
      if(timer)timer.innerText = formattedTime;
    }
     
    
      if(timeInSeconds===0){
        stopTimer()
        setTimerModalOpen(true)
        // handleLogout()
      }
      else {
          // setTimeInSeconds(timeInSeconds--);
          storage.TimeLeft = --timeInSeconds;
          localStorage.setItem(_clientID,JSON.stringify(storage));
      }
    }
    
}

 
  const [dashboardLoading,setDashboardLoading]=useState(true)
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName]=useState('')
  const [loading,setLoading]=useState(true)
//   const [timerModalOpen,setTimerModalOpen]=useState(false)
//   const handleTimerModalClose = (event,reason) =>{ 
//      if (reason !== 'backdropClick') {
//       setTimerModalOpen(false)
//     }
// };
//   let countdown;
//   let [timeInSeconds,setTimeInSeconds]=useState(10)

//   function startTimer() {
//       countdown = setInterval(updateTimer, 1000);
//   }

//   function stopTimer() {
//       clearInterval(countdown);
//   }

//   function updateTimer() {
     
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     if(timeInSeconds>0){
//     const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     document.getElementById('timer').innerText = formattedTime;
//   }

//     if (timeInSeconds === 5) {
//         // stopTimer();
//         // alert('Time is up!');
//         stopTimer()
//         // setTimerModalOpen(true)
//         return
//     } 
//     if(timeInSeconds===0){
//       stopTimer()
//       handleLogout()
      
//     }
//     else {
//         setTimeInSeconds(timeInSeconds--);
//     }
// }

const timerModalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 580,
  bgcolor: '#e4f1ff',
  borderRadius:'2px',
  boxShadow: 24,
  p: 4,
};
const handleSessionYes=()=>{
  var user={
    userId:clientId,
    timestamp:new Date().getTime()
  }
  localStorage.setItem('user', JSON.stringify(user));
  // timeInSeconds=1800
  setSessionModalOpen(false)

}
const handleSessionNo=()=>{
    setSessionModalOpen(false)
}
  
  useEffect(()=>{
    // startTimer()

    if(!storage){
      // Add popup and with settimeout will natigate to advisor path
      navigate('/investor')
    }
    else{
       leftTime = storage.TimeLeft;
       expirationTime = storage.Expirationtimestamp;
      if(!leftTime // Or current time is greater then Expirationtimestamp or storage is null or empty
      )
      {
        // Logout if left time is empty
      }
      // let [timeInSeconds,setTimeInSeconds]=useState(leftTime)
       timeInSeconds = leftTime;
       startTimer()
    }


    const body = document.querySelector("body");
    const sidebar = body.querySelector(".sidebar");
    const toggle = body.querySelector(".toggle");
    // const searchBtn = body.querySelector(".search-box");
    const content = body.querySelector(".content");
    const materialicons = body.querySelectorAll(".Customicons");
    const navLinks = document.querySelectorAll('.nav-link a span')
    // const modeText = body.querySelector(".mode-text");
    // 
    
    
    toggle.addEventListener("click", () => {
       sidebar.classList.toggle("close");
       content.classList.toggle("inc-m-l");
       for (const icons of materialicons) {
        icons.classList.toggle(
          'icon-toggle'
        );
      }
      for (const icons of navLinks) {
        icons.classList.toggle(
          'sidebarAnchor'
        );
      }
    });
    

  axios({
    method: 'get',
    url: `https://investmentportal.azurewebsites.net/api/ClientSignUp/${clientId}?api-version=1`
  }).then((response) => {
    setFirstName(response.data.client.firstName)
    setLastName(response.data.client.lastName)
    setLoading(false)
    setDashboardLoading(false)
  }, (error) => {
       setLoading(false)
       setDashboardLoading(false)
  })},[])

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [selectedOption, setSelectedOption] = useState('Portfolio');
  // const handleNo=()=>{
  //   timeInSeconds=4
  //   startTimer()

  //   setTimerModalOpen(false)
  // }
  // const handleYes=()=>{
     
  //   timeInSeconds=20
  //   setTimerModalOpen(false)
  //   startTimer()
  // }
  const handleLogout = () => {
    // stopTimer()
    localStorage.removeItem(_clientID)
  
    navigate('/investor')

  }
  return (<>
   {dashboardLoading? <Box sx={{ width: '100%' }}>
      <LinearProgress color='error' />
    </Box>:''}
    <div className="investorDashboard">
    
      
<div class="div-sidebar">
<nav class="sidebar">
    <header>
    <div class="image-text">
          <div class="img bg-wrap text-center py-4 bg1" >
          <p id='time'>Session Time: <span id='timer'></span></p>
          <Modal
           
        open={timerModalOpen}
        onClose={handleTimerModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={timerModalStyle} >
          
          <Typography  color='#4b49ac' id="modal-modal-title" variant="h6" component="h2">
          Your Session has Expired. Please Re-Login to Continue.
          </Typography>
          <div className='modaldiv'>
           <Button onClick={()=>{handleLogout()}} className='flexend SixthCard' variant='contained' >Go to LoginPage</Button>
           </div>
        </Box>
      </Modal>
          <div class="user-logo">
          <div class="img bg2" ></div>
          {loading?<div class="text header-text">
            <Skeleton  variant="text" sx={{ marginLeft:"60px", marginTop:'0px' , bgcolor:'#fff',  width:'160px', fontSize: '3rem' }} />
            </div>:<div class="text header-text">
                <span class="name">{firstName + ' '+ lastName}</span>
                <span class="profession">Client:{clientId}</span>
            </div>}
          </div>
          </div>
            
        </div>
        <i class="bx bx-chevron-right toggle"></i>
    </header>

    <div class="menu-bar">
        <div class="menu">
            <ul class="menu-links">
            <li class="nav-link">
                <a  id={selectedOption === 'Portfolio' ? 'iactiveanchor' : ''} className="sidebarAnchor" onClick={() => handleOptionClick('Portfolio')}>
                <i id={selectedOption === 'Portfolio' ? 'iactive' : ''} className="material-icons Customicons">pie_chart</i>
                <span  id={selectedOption === 'Portfolio' ? 'iactiveli' : ''} class="text nav-text">Portfolio</span>
              </a>
            </li>
            <li class="nav-link">
                <a id={selectedOption === 'pastRequests' ? 'iactiveanchor' : ''} className="sidebarAnchor" onClick={() => handleOptionClick('pastRequests')}>
                  <i id={selectedOption === 'pastRequests' ? 'iactive' : ''} className="material-icons Customicons">swap_horiz</i>
                  <span  id={selectedOption === 'pastRequests' ? 'iactiveli' : ''}  class="text nav-text">Past Investments</span>
                </a>
            </li>
            <li class="nav-link">
                <a id={selectedOption === 'New Investment' ? 'iactiveanchor' : ''} className="sidebarAnchor" onClick={() => handleOptionClick('New Investment')}>
                <i id={selectedOption === 'New Investment' ? 'iactive' : ''} className="material-icons Customicons">description</i>
              <span   id={selectedOption === 'New Investment' ? 'iactiveli' : ''} class="text nav-text">New Investment</span>
              </a>
            </li>
            <li class="nav-link">
                <a id={selectedOption === 'Settings' ? 'iactiveanchor' : ''} className="sidebarAnchor"  onClick={() => handleOptionClick('Settings')}>
                <i id={selectedOption === 'Settings' ? 'iactive' : ''} className="material-icons Customicons">settings</i>
              <span  id={selectedOption === 'Settings' ? 'iactiveli' : ''} class="text nav-text">Settings</span>
              </a>
            </li>
            <li class="nav-link">
            <a  onClick={()=>handleLogout()}>
                <i  className="material-icons Customicons">logout</i>
                <span   class="text nav-text">Logout</span>
                </a>
              
            </li>
            </ul>
        </div>

        
    </div>
</nav>
</div>



      <div className="content inc-m-l">
        {selectedOption === 'Portfolio' && <PortfolioContent clientId={clientId}
         setDashboardLoading={setDashboardLoading} setSessionModalOpen={setSessionModalOpen} />}
        {selectedOption === 'pastRequests' && <PastRequestsContent clientId={clientId} 
         setDashboardLoading={setDashboardLoading} setSessionModalOpen={setSessionModalOpen}/>}
        {selectedOption === 'New Investment' && <InvestmentContent clientId={clientId} 
         setDashboardLoading={setDashboardLoading} setSessionModalOpen={setSessionModalOpen}/>}
        {selectedOption === 'Settings' && <SettingsContent clientId={clientId}
         setDashboardLoading={setDashboardLoading} setSessionModalOpen={setSessionModalOpen} />}
      </div>
    </div>
  </>
  );
}

function PortfolioContent({ clientId ,setDashboardLoading , setSessionModalOpen}) {
  // const valueFormatter = (value) => `Rs.${value}`;
  const [sixNetWorth,setSixNetWorth]=useState(0)
  const [oneNetWorth,setOneNetWorth]=useState(0)
  const [threeNetWorth,setThreeNetWorth]=useState(0)
  const [fiveNetWorth,setFiveNetWorth]=useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const chartsParams = {
    margin: { left: 100},
    height: 260,
    width:420,
    
  };
  const xLabels = [
    '2024',
    '2025',
    '2027',
    '2029'
   
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [listOfStratgies, setListOfStrategies] = useState([])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listOfStratgies.length) : 0;
const [loading,setLoading]=useState(true)


  const [open, setOpen] = useState(false);
  const [pieData,setPieData]=useState([])
  const [TotalInv, setTotalInv] = useState(0);
  const [TotalinvAmount, SetTotalInvAmount] = useState(0);
  const [TotalExeAmount, SetTotalExeAmount] = useState(0);
  const navigate = useNavigate()
  const [lineData,setLineData]=useState([])
 
 
  useEffect(() => {
   
  

 
    setDashboardLoading(true)
    axios({
      method: 'get',
      // url: `https://investmentportal.azurewebsites.net/api/strategies/${clientId}/By-ClientId?api-version=1`
      url:`https://investmentportal.azurewebsites.net/api/strategies/${clientId}/All-Strategy?api-version=1`
    }).then(function (response) {
      debugger
      let _lineData=[]
      setDashboardLoading(false)
      const list = response.data.strategies;
      console.log(list)
      // setPieData
      // const demoArray = [
      //   { strategyId: 'STR0001', investmentId: 'INV0001', investmentAmount: 400, expectedAmount: 342.05, investmentName: 'BMW' },
      //   { strategyId: 'STR0002', investmentId: 'INV0002', investmentAmount: 400, expectedAmount: 342.05, investmentName: 'DOMS' }
      // ];
      
      // Count occurrences of each investmentName
      const investNameCount = {};
      list.forEach(item => {
        if(item.status==='Funded'){
        const investName = item.industry;
        investNameCount[investName] = (investNameCount[investName] || 0) + 1;
      }
      });
      
      // Create array with 'label' and 'count'
      const resultArray = Object.keys(investNameCount).map(investName => ({
        label: investName,
        value: investNameCount[investName]
      }));
      
      setPieData(resultArray);
      
      setTotalInv(list.filter(x=>x.status==="Funded").length);
      SetTotalInvAmount(list.map(x=>x.status==="Funded"? x.investmentAmount:0).reduce(function(a, b){
        return a + b;
      }));
      let _sixNetWorth=list.map(x=>x.status==="Funded"&&x.timePeriod==="6 months"? x.expectedAmount:0).reduce(function(a, b){
        return a + b;
      })
      let _oneNetWorth=list.map(x=>x.status==="Funded"&&x.timePeriod==="1 year"? x.expectedAmount:0).reduce(function(a, b){
        return a + b;
      })
      // setSixNetWorth(list.map(x=>x.status==="Funded"&&x.timePeriod==="6 months"? x.expectedAmount:0).reduce(function(a, b){
      //   return a + b;
      // }));
      // setOneNetWorth(list.map(x=>x.status==="Funded"&&x.timePeriod==="1 year"? x.expectedAmount:0).reduce(function(a, b){
      //   return a + b;
      // }));
      let _threeNetWorth=list.map(x=>x.status==="Funded"&&x.timePeriod==="3 year"? x.expectedAmount:0).reduce(function(a, b){
        return a + b;
      })
      // setThreeNetWorth(list.map(x=>x.status==="Funded"&&x.timePeriod==="3 year"? x.expectedAmount:0).reduce(function(a, b){
      //   return a + b;
      // }))
      let _fiveNetWorth=list.map(x=>x.status==="Funded"&&x.timePeriod==="5 year"? x.expectedAmount:0).reduce(function(a, b){
        return a + b;
      })
     if(_sixNetWorth!==0){
        _lineData.push(_sixNetWorth.toFixed(2))
     }
     else{
      _lineData.push(0)
     }
     if(_oneNetWorth!==0){
      //  if(sixNetWorth)
      _lineData.push((_oneNetWorth+_sixNetWorth).toFixed(2))
   }
   else{
    _lineData.push(_sixNetWorth+_sixNetWorth*0.1)
   }
   if(_threeNetWorth!==0){
    _lineData.push((_oneNetWorth+_sixNetWorth+_threeNetWorth).toFixed(2))
 }
 else{
  _lineData.push(_sixNetWorth+_sixNetWorth*0.1+_sixNetWorth*0.15+_oneNetWorth*0.1)
 }
 if(_fiveNetWorth!==0){
  _lineData.push((_oneNetWorth+_sixNetWorth+_threeNetWorth+_fiveNetWorth).toFixed(2))
}
else{
_lineData.push(_sixNetWorth+_sixNetWorth*0.1+_sixNetWorth*0.15+_sixNetWorth*0.20+_oneNetWorth*0.1+
  _oneNetWorth*0.15+_threeNetWorth*0.20
  )
}

setLineData(_lineData)
      // setFiveNetWorth(list.map(x=>x.status==="Funded"&&x.timePeriod==="5 year"? x.expectedAmount:0).reduce(function(a, b){
      //   return a + b;
      // }))
      SetTotalExeAmount(list.map(x=>x.status==="Funded"?x.expectedAmount:0 ).reduce(function(a, b){
        return a + b;
      }));
      setLoading(false)
      setListOfStrategies(list.filter(x => x.status === "Approved" || x.status === "Funded"));

      console.log(list)

    },
      function (error) {
        console.log(error)
        setLoading(false)
        setListOfStrategies([])
        setDashboardLoading(false)
        
      })
  }, [])

  const [coll,setColl]=useState('')
  function collapseRow(the)
  {
    // ;
    let _strategyId = the.row.strategyId;
    //setOpen(!open);
    if(coll === _strategyId)
      _strategyId='';
    setColl(_strategyId);
  }

  const valueFormatter = (value) => `Rs.${value}`;
  const chartFormatter = (value) => `Rs.${value}`;
  return (
    <div className="portfolio">

      {
        loading?
        <>
        <div className='card-container'>
                    <Card  color="fourthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                     number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                    <Card   color="fifthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                     number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                    <Card  color="SixthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                    number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                  </div>
        <div className="rectangle-div">
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div> </>:(<>
                  <div className='card-container'>
                    <Card  color="fourthCard" heading="Number of Holdings" number={TotalInv}/>
                    <Card   color="fifthCard" heading="Total Invested Amount" number={`Rs.${TotalinvAmount}`}/>
                    {/* <Card  color="SixthCard" heading="Total Expected Amount" number={`Rs.${TotalExeAmount.toFixed(2)}`}/> */}
                  </div>
                  <div className="rectangle-div">
                    <div className="visContainer">
                  
    <div className="LineChart">  
          <h1 className="netWorth">Total Net Worth</h1>  
             
{TotalInv===0?<div className="noChart"><p>No Funded Investment</p></div>:<LineChart
        {...chartsParams}
     
        series={[
          {
            data:lineData,
            
            id: 'pvId',
            connectNulls: false,
            color:'#4b49ac',
            chartFormatter
          },
          
        ]}
 
        xAxis={[{ scaleType: 'point',data: xLabels , label:'Estimated Total Net Worth by 2029' , fontWeight:'16' ,fontSize:'16' }]}
        sx={{
          '.MuiLineElement-root, .MuiMarkElement-root': {
            strokeWidth: 1,
          },
          '.MuiLineElement-series-pvId': {
            strokeDasharray: '5 5',
          },
        
          '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
            fill: '#fff',
          },
          '& .MuiMarkElement-highlighted': {
            stroke: 'none',
          },
        }}
      />}
      </div>
      <div className="bgWhitePie">
      <h1 className="netWorth">Industries Wise Allocation</h1> 
      {TotalInv===0?<div className="noChart"><p>No Funded Investment</p></div>:  <PieChart
    
  series={[
    {
      data:pieData
      // data: [
      //   { value: 10, label: 'Information Technology' },
      //   {  value: 15, label: 'Industrials' },
      //   { value: 20, label: 'Automobile' },
      // ],
    },
  ]}
  // sx={{marginTop:'3px'}}
  
  width={500}
  height={300}
/>}</div>
      </div>
          <TableContainer component={Paper}>
            
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }} />
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Name</TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Original Amount(Rs.)</TableCell> */}
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Amount(Rs.)</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Expected Amount(Rs.)</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                listOfStratgies.length===0
                ?
                <React.Fragment >
                <TableRow>
                  <TableCell
                  sx={{ textAlign: "center"}} 
                   colSpan={6}>No Investment Created</TableCell>
                </TableRow>
              </React.Fragment> 
                : (rowsPerPage > 0
                  ? listOfStratgies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : listOfStratgies
                )?.map((row) => 
                  
                      <React.Fragment >
                        <TableRow>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => collapseRow({row})}
                            >
                              {coll == row.strategyId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell>{row.investmentName}</TableCell>
                          {/* <TableCell>{row.amount}</TableCell> */}
                          <TableCell>{row.investmentAmount}</TableCell>
                          <TableCell>{row.expectedAmount}</TableCell>
                          <TableCell>{row.timePeriod}</TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingRight: 10, paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={coll == row.strategyId }    
                            //  style={{ marginLeft : '120px'}} 
                             timeout="auto" unmountOnExit>
                              <Box  sx={{ margin: 0 ,display:'flex' }}>
                              {/* <LineChart width={600} height={300} data={[
  { name: '6m', priceChange: 10 },
  { name: '1yr', priceChange: 20 },
  { name: '3yr', priceChange: -5 },
  { name: '5yr', priceChange: 15 },
]}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="priceChange" stroke="#8884d8" />
    </LineChart> */}
                        {/* <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ],
    },
  ]}
  sx={{marginTop:'55px'}}
  
  width={400}
  height={250}
/> */}
                                <BarChart
                                  xAxis={[
                                    {
                                      id: 'barCategories',
                                      data: ['Invested ', 'Expected',],
                                      scaleType: 'band',
                                      label: 'Amount'
                                    },
                                  ]}


                                  series={[
                                    {
                                      color: '#b7d9ff',
                                      data: [row.investmentAmount, row.expectedAmount],
                                      label: 'Amount',
                                      valueFormatter
                                    },
                                  ]}
                                  width={400}
                                  height={300}
                                /> 
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                        
                      </React.Fragment>
                  // Exclude rows with status other than "pending"
                )}
              </TableBody>
            { listOfStratgies.length!==0 ?<><TableFooter>
          
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={listOfStratgies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter></>:''}
              </Table></TableContainer>

        </div></>)
      }


    </div>
  );
}

function PastRequestsContent({ clientId , setDashboardLoading ,setSessionModalOpen }) {
  const navigate = useNavigate()
  const columns = [
    { field: 'investmentID', headerName: '#',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header', },
    { field: 'date', width:170 , headerName: 'Created Date',headerClassName: 'super-app-theme--header', },
    { field: 'investmentAmount',width:170 , headerName: 'Amount(Rs.)' ,headerClassName: 'super-app-theme--header', },
    {
      field: 'timePeriod',
      width:170 ,
      headerName: 'Time Period',
     
      headerClassName: 'super-app-theme--header',
     
      
    },
    {field: 'image',
    headerName: 'Type',
    headerClassName: 'super-app-theme--header',
    disableColumnMenu:true ,
    sortable: false,
    width: 80,
    editable: true,
    renderCell: (params) =>params.row.investmentType==='Low Risk'?<Tooltip title='Low Risk' placement='right-end'>
    <img className='table-img' src={lowRisk}/></Tooltip>
                      :(params.row.investmentType==='High Risk'?<Tooltip title='High Risk' placement='right-end'>
    <img className='table-img' src={highRisk}/></Tooltip>
                      :(params.row.investmentType==='Medium Risk'?<Tooltip title='Medium Risk' placement='right-end'>
    <img className='table-img' src={mediumRisk}/></Tooltip>
                      :<Tooltip title='Need Consultation' placement='right-end'>
    <HelpIcon className='table-img green' ></HelpIcon></Tooltip>)
                       )
    },
    { field: 'status', width:200 , headerName: 'Status' ,headerClassName: 'super-app-theme--header', },
  ];
  const [listOfPastRequests, setListOfPastRequests] = useState([])
  const [totalRequest,setTotalRequest]=useState(0)
  const [totalHighRiskRequest,setTotalHighRiskRequest]=useState(0)
  const [totalLowRiskRequest,setTotalLowRiskRequest]=useState(0)
  const [totalMediumRiskRequest,setTotalMediumRiskRequest]=useState(0)
  const [totalConsultationRequest,setTotalConsultationRequest]=useState(0)
 const [loading,setLoading]=useState(true)

let flag=[]

const handleInvestmentCall = () => {
  setDashboardLoading(true)
  axios({
    method: 'get',
    url: `https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
  }).then(function (response) {
    
    let list = response.data
    list = list.map(obj => {
      return { ...obj, date : `${obj.createdDate.slice(0,10)}` };
     }
    //  {}
  );
    console.log(list)
    setListOfPastRequests(list)
    let _highRisk = list.filter(x=>x.investmentType==="High Risk").length;
    let _lowRisk = list.filter(x=>x.investmentType==="Low Risk").length;
    let _mediumRisk = list.filter(x=>x.investmentType==="Medium Risk").length;
    let _needConsultation = list.filter(x=>x.investmentType==="Need Consultation").length;
  setDashboardLoading(false)
    setTotalRequest(list.length)
    setTotalLowRiskRequest(_lowRisk)
    setTotalHighRiskRequest(_highRisk)
    setTotalMediumRiskRequest(_mediumRisk)
    setTotalConsultationRequest(_needConsultation)
    setLoading(false)

    if(_highRisk > 0)
    {   const _fourthCard=document.querySelector('.fourthCard')
   
    !!_fourthCard && (_fourthCard.classList.add('addPointer') ||  
    _fourthCard.addEventListener('click',function() {
        
      _fourthCard.classList.toggle("addBorder");
        if(!flag.includes("High Risk")){
          
          flag.push("High Risk");
          setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
        }
        else{
          flag = flag.filter(item => item !== "High Risk");
          
          if(flag.length === 0){
          setListOfPastRequests(list)
          }
          else{
          
          setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
        }
        }
    }))
    }

      
    if(_lowRisk > 0)
    { const _SixthCard=document.querySelector('.SixthCard')
    
       !!_SixthCard && ( _SixthCard.classList.add('addPointer') ||  
       _SixthCard.addEventListener('click',function() {
            
        _SixthCard.classList.toggle("addBorder");
        if(!flag.includes("Low Risk")){
          
          flag.push("Low Risk");
          setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
        }
        else{
          flag = flag.filter(item => item !== "Low Risk");
          if(flag.length === 0)
          setListOfPastRequests(list)
          else
          setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
        }
    }))
    }

    if(_mediumRisk > 0){
      const _secondCard = document.querySelector('.secondCard')
       !!_secondCard && (_secondCard.classList.add('addPointer') ||
        _secondCard.addEventListener('click',function() {
            
        _secondCard.classList.toggle("addBorder");
        if(!flag.includes("Medium Risk")){
          
          flag.push("Medium Risk");
          setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
        }
        else{
          flag = flag.filter(item => item !== "Medium Risk");
          if(flag.length === 0)
          setListOfPastRequests(list)
          else
          setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
        }
    }))
    }
    if(_needConsultation > 0){
      const _thirdCard=document.querySelector('.thirdCard')
    
        !!_thirdCard && ( _thirdCard.classList.add('addPointer') || 
          _thirdCard.addEventListener('click',function() {
            
      document.querySelector('.thirdCard').classList.toggle("addBorder");
      if(!flag.includes("Need Consultation")){
        
        flag.push("Need Consultation");
        setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
      }
      else{
        flag = flag.filter(item => item !== "Need Consultation");
        if(flag.length === 0)
        setListOfPastRequests(list)
        else
        setListOfPastRequests(list.filter(x=> flag.includes(x.investmentType)))
      }
    }))
    }

    
  },
    function (error) {
      console.log(error)
      setLoading(false)
      setDashboardLoading(false)
    })
  }


    useEffect(() => {
      
      // // 
      handleInvestmentCall()
    }, [])    

  return (
    // loading
    <div className="portfolio">
      {loading?
      <>
       <div className='card-container'>
                <Card color="firstCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card  color="fourthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="SixthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="secondCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                
                <Card color="thirdCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
          </div>

      <div className="rectangle-div">
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div></>:( <>
                  <div className='card-container'>
                <Card color="firstCard"  heading="Number of Investments" number={totalRequest}/>
                <Card  color="fourthCard" heading="Total High Risk Investments" number={totalHighRiskRequest}/>
                <Card color="SixthCard" heading="Total Low Risk Investments" number={totalLowRiskRequest}/>
                <Card color="secondCard" heading="Total Medium Risk Investments" number={totalMediumRiskRequest}/>
                
                <Card color="thirdCard" heading="Total Consultation Investments" number={totalConsultationRequest}/>
 </div>
                
                <div className="rectangle-div">
{listOfPastRequests.length===0?<TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>

                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Created Date</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Amount(Rs.)</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Type</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Status</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
             
                      <React.Fragment >
                        <TableRow>
                          <TableCell
                          sx={{ textAlign: "center"}} 
                           colSpan={5}>No Request Created</TableCell>
                        </TableRow>
                      </React.Fragment> </TableBody></Table></TableContainer>
                      :
                <Box
                className='tableIcon'
      sx={{
        width: '100%',
        '& .super-app-theme--header': { 
          
          color: 'white', fontSize: '16px',
          fontWeight: 'bold',
           backgroundColor: '#4b49ac'
         },
      }}
    >
                <DataGrid
                disableColumnSelector
                disableRowSelectionOnClick
                getRowId={(listOfPastRequests) => listOfPastRequests.investmentID}
        rows={listOfPastRequests}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      </Box>}
        {/* <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>

                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Created Date</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Amount(Rs.)</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Type</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Status</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {
              listOfPastRequests.length===0?
                      <React.Fragment >
                        <TableRow>
                          <TableCell
                          sx={{ textAlign: "center"}} 
                           colSpan={5}>No Request Created</TableCell>
                        </TableRow>
                      </React.Fragment> 

              :listOfPastRequests?.map((row) =>

                <React.Fragment >
                  <TableRow>
                    <TableCell>{row.investmentID}</TableCell>

                    <TableCell >{row.createdDate.slice(0, 10)}</TableCell>
                    <TableCell align='center' >{row.investmentAmount}</TableCell>
                    <TableCell >{row.timePeriod}</TableCell>
                    <TableCell align='center' sx={{padding:"0px"}}>
                  {row.investmentType==='Low Risk'?<Tooltip title='Low Risk' placement='right-end'><img className='table-img' src={lowRisk}/></Tooltip>
                  :(row.investmentType==='High Risk'?<Tooltip title='High Risk' placement='right-end'><img className='table-img' src={highRisk}/></Tooltip>
                  :(row.investmentType==='Medium Risk'?<Tooltip title='Medium Risk' placement='right-end'><img className='table-img' src={mediumRisk}/></Tooltip>
                  :<Tooltip title='Need Consultation' placement='right-end'><HelpIcon className='table-img' sx={{color:'green'}}></HelpIcon></Tooltip>)
                   )}</TableCell>
<TableCell align='center' className={row.status} sx={{padding:'0px',width:'108px'}}>{row.status}</TableCell>
                  </TableRow>
                </React.Fragment>

              )

              }
            </TableBody>
          </Table>
        </TableContainer> */}
      </div></>)}
    </div>
  );
}

function InvestmentContent({ clientId , setDashboardLoading ,setSessionModalOpen}) {
  // const handleRowEditCommit = (e)=>{
  //   debugger
  //   console.log(e)
  // }
  let [arr,setArr]=useState([])
  const processRowUpdate = (newRow) => {
    debugger
    // console.log(fields)
    if(newRow.investmentAmount===''){
      handleRecommendationsClose()
      alert('Amount Field should not be empty')
      return
    }
    setArr([...arr,newRow.investmentAmount])
    // arr.push(newRow.investmentAmount)
    console.log(newRow.investmentAmount);
};
// const useFakeMutation = () => {
//   return React.useCallback(
//     (user) =>
//       new Promise((resolve, reject) => {
//         setTimeout(() => {
//           if (user.name?.trim() === '') {
//             reject(new Error("Error while saving user: name can't be empty."));
//           } else {
//             resolve({ ...user, name: user.name?.toUpperCase() });
//           }
//         }, 200);
//       }),
//     [],
//   );
// }

// const mutateRow = useFakeMutation();

// const [snackbar, setSnackbar] = React.useState(null);

// const handleCloseSnackbar = () => setSnackbar(null);

// const processRowUpdate = React.useCallback(
//   async (newRow) => {
//     // Make the HTTP request to save in the backend
//     const response = await mutateRow(newRow);
//     setSnackbar({ children: 'User successfully saved', severity: 'success' });
//     return response;
//   },
//   [mutateRow],
// );

// const handleProcessRowUpdateError = React.useCallback((error) => {
//   setSnackbar({ children: error.message, severity: 'error' });
// }, []);
  const columns = [
    { field: 'strategyId', width:200, headerName: '#',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header',
    renderCell: (params) =>params.row.strategyId.replace('STR', 'STO')},
    { field: 'investmentName', width:160 , headerName: 'Stock Name',headerClassName: 'super-app-theme--header', },
    { field: 'investmentAmount',width:150 ,editable:true, headerName: 'Amount(Rs)' ,headerClassName: 'super-app-theme--header', },
    // { field: 'expectedAmount',width:203, headerName: 'Expected Amount(Rs)',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header', },
    { field: 'returnPercentageAfter6months', width:150 , headerName: '6M Return(%)',headerClassName: 'super-app-theme--header', },
    { field: 'returnPercentageAfter1year',width:140 , headerName: '1Y Return(%)' ,headerClassName: 'super-app-theme--header', },
    { field: 'returnPercentageAfter3year',width:140, headerName: '3Y Return(%)',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header', },
    { field: 'returnPercentageAfter5year', width:129 , headerName: '5Y Return(%)',headerClassName: 'super-app-theme--header', },
  //   {field: 'image',
  //   headerName: 'Action',
  //   headerClassName: 'super-app-theme--header',
  //   disableColumnMenu:true ,
  //   sortable: false,
  //   width: 127,
  //   editable: true,
  //   renderCell: (params) =><FormControl required fullWidth>
  //   <InputLabel id="demo-simple-select-label">Status</InputLabel>
  //   <Select
  //     size="small"
  //     margin="normal"
  //     labelId="demo-simple-select-label"
  //     id="demo-simple-select"
  //     label="Status"
  //     // value={Status}
    
  //     onChange={e=>{handleChange(params.row.strategyId,e.target.value)}}
  //   >
  //     <MenuItem value={'Approved'}>Approve</MenuItem>
  //     <MenuItem value={'Rejected'}>Reject</MenuItem>


  //   </Select>
  // </FormControl>
  //   },
  ]

//   const onCellEditCommit= (cellData) => {
//     debugger
//     const { id, field, value } = cellData;
//     console.log(cellData)
// }

  const [strategyLoading,setStrategyLoading]=useState(false)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investmentType, setInvestmentType] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const navigate = useNavigate()
  const [Status, setStatus] = useState('')
  const [investmentAmountError, setInvestmentAmountError] = useState(false)
  const [investmentTypeError, setInvestmentTypeError] = useState(false)
  const [timePeriodError, setTimePeriodError] = useState(false)
  const [loading,setLoading]=useState(false)
  const [actionArray,setActionArray]=useState([])
  const [message, setMessage] = useState("")
  const [advisorId, setAdvisorId] = useState("")
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackInvOpen, setSnackInvOpen] = React.useState(false);
  const [visible,setVisible]=useState(false)
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleSnackInvClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackInvOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  const handleChange=(strategyId,status)=>{
        setVisible(true)
         const actionObj ={
          strategyId:strategyId,
          status:status,
          remarks:'string'
         }
         setActionArray([...actionArray,actionObj])
      
    
  }


  const worldElectricityProduction =[
    {
      "date": "2001",
      "price": "102.50",
      "secondField": "103.70",
      "thirdField": "101.30"
    },
    {
      "date": "2002",
      "price": "97.16",
      "secondField": "99.84",
      "thirdField": "94.95"
    },
    {
      "date": "2003",
      "price": "101.55",
      "secondField": "104.45",
      "thirdField": "97.71"
    },
    {
      "date": "2004",
      "price": "95.39",
      "secondField": "97.04",
      "thirdField": "92.30"
    },
    {
      "date": "2005",
      "price": "101.73",
      "secondField": "106.52",
      "thirdField": "99.48"
    },
    {
      "date": "2006",
      "price": "98.80",
      "secondField": "100.62",
      "thirdField": "95.59"
    },
    {
      "date": "2007",
      "price": "103.53",
      "secondField": "105.99",
      "thirdField": "98.72"
    },
    {
      "date": "2008",
      "price": "99.78",
      "secondField": "100.74",
      "thirdField": "96.05"
    },
    {
      "date": "2009",
      "price": "103.51",
      "secondField": "104.54",
      "thirdField": "100.05"
    },
    {
      "date": "2010",
      "price": "99.71",
      "secondField": "104.17",
      "thirdField": "95.97"
    },
    {
      "date": "2011",
      "price": "102.93",
      "secondField": "103.57",
      "thirdField": "101.15"
    },
    {
      "date": "2012",
      "price": "95.89",
      "secondField": "96.38",
      "thirdField": "93.46"
    },
    {
      "date": "2013",
      "price": "101.06",
      "secondField": "101.24",
      "thirdField": "97.08"
    },
    {
      "date": "2014",
      "price": "95.36",
      "secondField": "98.75",
      "thirdField": "94.39"
    },
    {
      "date": "2015",
      "price": "103.60",
      "secondField": "104.24",
      "thirdField": "102.14"
    },
    {
      "date": "2016",
      "price": "98.48",
      "secondField": "102.49",
      "thirdField": "97.51"
    },
    {
      "date": "2017",
      "price": "100.07",
      "secondField": "101.53",
      "thirdField": "95.91"
    },
    {
      "date": "2018",
      "price": "98.03",
      "secondField": "100.14",
      "thirdField": "93.78"
    },
    {
      "date": "2019",
      "price": "102.85",
      "secondField": "106.27",
      "thirdField": "98.80"
    },
    {
      "date": "2020",
      "price": "98.76",
      "secondField": "100.78",
      "thirdField": "97.38"
    },
    {
      "date": "2021",
      "price": "102.29",
      "secondField": "104.64",
      "thirdField": "98.65"
    },
    {
      "date": "2022",
      "price": "97.11",
      "secondField": "97.83",
      "thirdField": "93.05"
    },
    {
      "date": "2023",
      "price": "102.34",
      "secondField": "106.56",
      "thirdField": "98.09"
    }
  ]

const keyToLabel = {
  price: 'Ambuja Returns(%)',
  secondField:"BMW Returns(%)",
  thirdField:"TCS Returns(%)"
};

const colors = {
  price: 'lightgray',
 
};

const stackStrategy = {
  stack: 'total',
  
  stackOffset: 'none', // To stack 0 on top of others
};

const customize = {
  width:800,
  height: 300,
  legend: { hidden: true },
  margin: { top: 30 ,left:70},
  stackingOrder: 'descending',
};

  const [statusId,setStatusId]=useState('')  
  let [statusArr,setStatusArr]=useState([])
  // let [strArray,setStrArray]=useState([])
  // let statusObj=[]
  const handleStatusData=(investmentId,fields,statusData)=>{
    // debugger
    // let id=statusObj[0].investmentId;
    console.log(fields)
   setStatusId(investmentId)
    if(statusArr.length!==0){
      
      statusArr.pop()
     setStatusArr([...statusArr,{
      'investmentId':investmentId,
      'status':statusData
     }]) 
    }else{
      setStatusArr([...statusArr,{
        'investmentId':investmentId,
        'status':statusData
       }]) 
      }
  }
  const handleStatusSubmit=(fields)=>{
    debugger
    let returner=false
    let strategies=fields.strategies
    // list.map(x=>x.status==="Funded"? x.investmentAmount:0).reduce()
   let sum = strategies.map(e=>e.investmentAmount).reduce(function(a, b){
      return a + b;
    })
    
    if(arr.length!==0){
      let arraySum=arr.reduce((accumulator, current) => accumulator +  parseInt(current, 10), 0)
      // for(i=0;i<arr.length;)
    
  if(arr.length!==strategies.length){
    alert(`sum of investment Amount should be equal to ${sum}`)
    // setArr([])
    handleRecommendationsClose()
    return
  }
  if(arraySum!=sum){
    alert(`sum of investment Amount should be equal to ${sum}`)
    handleRecommendationsClose()
    // setArr
    return
  }else{
    let strArray=[];
    debugger
    arr.map((ele,index)=>{
    let _time;
    let timePeriod= strategies[0].timePeriod
    let _rate;
    if(timePeriod.includes('6')){
      // document.getElementById('6m').classList.add("termSelected")
      _rate=  +strategies[index].returnPercentageAfter6months 
      _time=  0.5
    }
    if(timePeriod.includes('1')){
      // document.getElementById('1yr').classList.add("termSelected")
      _rate=  +strategies[index].returnPercentageAfter1year
      _time=  1
    }
    if(timePeriod.includes('3')){
      // document.getElementById('3yr').classList.add("termSelected")
      _rate=  +strategies[index].returnPercentageAfter3year 
      _time=  3    }
    if(timePeriod.includes('5')){
      // document.getElementById('5yr').classList.add("termSelected")
      _rate=  +strategies[index].returnPercentageAfter5year
      _time=  5
    }
    strArray.push({
     
      'strategyId':strategies[index].strategyId,
      'investmentAmount':ele,
      'expectedAmount':(+ele*(Math.pow((1 + _rate/100),_time))).toFixed(2)
    })})
   const updatedData= {
      "investmentId": fields.investmentId,
      "strategies": strArray
      
    }
   axios({
    method:'put',
    url:`https://investmentportal.azurewebsites.net/api/strategies/${clientId}/Update-InvestmentBundle?api-version=1`,
    data:updatedData
   }).then((response)=>{
    console.log(response.data)
  //  alert('everything is fine')
   if(statusArr.length===0){
    // setStatusMessage
    return
   }
  //  if(returner){
  //   return
  //  }
   if(statusArr[0].investmentId===fields.investmentId){
    setActionLoading(true)
    axios({
      method:'put',
      url:`https://investmentportal.azurewebsites.net/api/investments/Update-Investment-Status?api-version=1`,
      data:statusArr
    }).then((response)=>{
      debugger
      setSnackOpen(true)
      setTimeout(handleSnackClose,5000)
      setActionLoading(false)
      setArr([])
      handleStrategyCall()
      handleRecommendationsClose()
    },(error)=>{
      setActionLoading(false)
      setArr([])
    })
   }
  
  return
   },(error)=>{
console.log(error)
returner=true
// alert('something is wrong')
return
   })

  }
  return
    }
    if(statusArr.length===0){
      // setStatusMessage
      return
     }
    //  if(returner){
    //   return
    //  }
     if(statusArr[0].investmentId===fields.investmentId){
      setActionLoading(true)
      axios({
        method:'put',
        url:`https://investmentportal.azurewebsites.net/api/investments/Update-Investment-Status?api-version=1`,
        data:statusArr
      }).then((response)=>{
        setSnackOpen(true)
        setTimeout(handleSnackClose,5000)
        setActionLoading(false)
        setArr([])
        handleStrategyCall()
        handleRecommendationsClose()
      },(error)=>{
        setActionLoading(false)
        setArr([])
      })
     }

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#e4f1ff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  const recommendationStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    // height:'800px',
    transform: 'translate(-50%, -50%)',
    width: '1267px',
    bgcolor: '#e4f1ff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 1,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event,reason) => {
    if(reason!=='backdropClick'){
    setOpen(false)
    setMessage("")
    setInvestmentAmount('')
    setTimePeriod('')
    setInvestmentType('')
    setInvestmentAmountError(false)
    setInvestmentTypeError(false)
    setTimePeriodError(false)
    }
  };


  const [listOfStratgies, setListOfStrategies] = useState([])

  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const handleRecommendationsOpen = () => setRecommendationsOpen(true);
  const handleRecommendationsClose = (event,reason) => {
    if(reason!=='backdropClick'){
    setRecommendationsOpen(false)
      setListOfStrategies([])
      setStatus("")
      setStatusId('')
      // setStrArray([])
      setStatusArr([])
      setArr([])
      setActionArray([])
    }
  };
const handleSave=()=>{
setActionLoading(true)
axios({
  method:'put',
  url:`https://investmentportal.azurewebsites.net/api/strategies/Update-Multiple-by-Client?api-version=1`,
  data:actionArray
}).then((response)=>{
console.log(response)
setActionLoading(false)

setVisible(false)
setSnackOpen(true)
setTimeout(handleSnackClose,5000)
handleRecommendationsClose()
},(error)=>{
console.log(error)
setVisible(false)
setActionLoading(false)

})

}
const [newLoading,setNewLoading]=useState(false)
const [value,setValue]=useState(false)
  useEffect(() => {
   
    setDashboardLoading(true)
    setNewLoading(true)
    handleStrategyCall()
    
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
    }).then((response) => {
      setDashboardLoading(false)
      setNewLoading(false)
      response.data.map((e) => setAdvisorId(e.advisorId))

    }, (error) => { 
      setDashboardLoading(false)
      setNewLoading(false)
    })


  
      
     
    
    

  },[])


  //   const handleOptionClick = (option) => {
  //     setSelectedOption(option);
  //   };

  // const handleModalOpen=(value)=>{
  //   handleOpen()
  //   handleOptionClick(value)
  // }
  const handleModalSubmit = () => {
    
    setInvestmentAmountError(false)
    setInvestmentTypeError(false)
    setTimePeriodError(false)

    let count=0;
    if (investmentAmount === "") {
      setInvestmentAmountError(true)
      count++
    }
    if (investmentType === "") {
      setInvestmentTypeError(true)
      count++
    }
    if (timePeriod === "") {
      setTimePeriodError(true)
      count++
      
    }
    if(count>0){
      return
    }

    const investmentData = {



      "investmentID": "string",
      "clientId": clientId,
      "advisorId": "string",
      "investmentAmount": investmentAmount,
      "investmentType": investmentType,
      "timePeriod": timePeriod,
      "createdDate": "2023-10-26T13:58:26.103Z",
      'status':'string'



    }
    setLoading(true)
    axios({
      method: 'post',
      url: `https://investmentportal.azurewebsites.net/api/investments/New Investment?api-version=1`,
      data: investmentData
    }).then((response) => {
      console.log(response)
      setLoading(false)
      setSnackInvOpen(true)
      setTimeout(handleSnackInvClose,5000)
      if (response.data.message === "Investment Successfully Generated") {
        setAdvisorId(response.data.investment.advisorId)
        // setMessage("Investment Request Created.Soon Advisor Will Create Strategy For You.")
        handleClose()
      }
      setInvestmentAmount("")
      setInvestmentType("")
      setTimePeriod("")
    }, (error) => {
      console.log(error)
      setMessage(error.response.data)
      setInvestmentAmount("")
      setInvestmentType("")
      setTimePeriod("")
      setLoading(false)

    })
  }
 const [actionLoading,setActionLoading]=useState(false)

  function ChildModal({strategyId}) {
    const [investmentId, setInvestmentId] = useState('')
    
   
    const [investmentIdError, setInvestmentIDError] = useState(false)
    const [statusError, setStatusError] = useState(false)
    const [action,setAction]=useState(false)
    const [childOpen, setChildOpen] = useState(false)
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = (event,reason) =>{
      if(reason!=='backdropClick'){
      setChildOpen(false)}};

    const handleApprove = (strategyId) => {
      handleChildOpen()
      setInvestmentId(strategyId)
    }
    const handleChildSubmit = () => {
      if (investmentId === "") {
        setInvestmentIDError(true)
        return
      }
      if (Status === "") {
        setStatusError(true)
        return
      }
      const investmentData = {
        status: Status,
        remarks: ""
      }
setActionLoading(true)
      axios({
        method: 'put',
        url: `https://investmentportal.azurewebsites.net/api/strategies/${investmentId}/Update-by-Client?api-version=1`,
        data: investmentData
      }).then((response) => {
        console.log(response)
        setActionLoading(false)
        handleChildClose()
        setAction(true)
      }, (error) => {
        console.log(error)
        setActionLoading(false)
      }


      )

    }

    return (<>
      {action?<Button className={Status} variant='contained'>{Status}</Button>
        :<Button variant='contained' className="action" onClick={()=>handleApprove(strategyId)}>Action</Button>}
      <Modal
        open={childOpen}
        onClose={handleChildClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <CloseIcon sx={{color:'#4b49ac'}} onClick={handleChildClose} style={{ cursor: 'pointer',position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose Investment
          </Typography>
          <TextField sx={{color:'#4b49ac'}}
            size="small"
            margin="normal"
            autoComplete="given-name"
            name="investmentId"
            required
            disabled
            fullWidth
            value={investmentId}
            error={investmentIdError}
            onChange={e => setInvestmentId(e.target.value)}
            id="InvestmentId"
            label="Strategy Id"
            autoFocus
          />


          <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              margin="normal"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              
              error={statusError}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={'Approved'}>Approve</MenuItem>
              <MenuItem value={'Rejected'}>Reject</MenuItem>


            </Select>
          </FormControl>

          {actionLoading?<Button  sx={{backgroundColor:'#4b49ac',marginTop:'5px'}} variant="contained" > Submitting... 
          <i class="fa fa-spinner fa-spin"></i></Button>
          :
          <Button  sx={{backgroundColor:'#4b49ac',marginTop:'5px'}} variant="contained" onClick={handleChildSubmit}>Submit</Button>}
        </Box>
      </Modal></>

    )
  }

  const [investmentBundle,setInvestmentBundle]=useState([])
  const handleRecommendations = () => {
    
    handleRecommendationsOpen()
    console.log("advisorId:" + advisorId)
    setStrategyLoading(true)
  handleStrategyCall()
    


  }
  const handleStrategyCall=()=>{
    axios({
      method: 'get',
      // url: `https://investmentportal.azurewebsites.net/api/strategies/${clientId}/By-ClientId?api-version=1`
      url:`https://investmentportal.azurewebsites.net/api/strategies/${clientId}/Newly-Proposed?api-version=1`
    }).then((response) => {
      // let data = response.data.strategies
      let data=response.data.investmentBundles
      setInvestmentBundle(data)
      // let list= data.filter(x=> x.status== 'Pending');
      setStrategyLoading(false)
      // list.map((e)=>setData([e.investmentAmount,e.expectedAmount,e.amount,e.returnPercentage]))
      // setListOfStrategies(list)
      // setValue(list.length===0)
      console.log(response)

    }, (error) => { 
      setValue(listOfStratgies.length===0)
      setStrategyLoading(false)
      
    })
  }
  return (
    <div className="InvestmentContent">
      <div className="rectangle-div-investment">
    {newLoading?<>
      <div class="Investmentcontainer">
    <Skeleton variant="rectangular" className="skeleton" width={280} height={250} />
    <Skeleton variant="rectangular" className="skeleton" width={280} height={250} />
    </div>
    </>
        :<><div class="Investmentcontainer">
          <img src={image2} alt='' class="investmentbox" />
          <img src={image3} alt='' class="investmentbox" />

        </div>
        <div class="button-container">
          <button class="my-button" onClick={handleOpen}><Tooltip title='Click to make Investment request'>Investment Requests</Tooltip></button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >

            <Box sx={style} >
              <CloseIcon sx={{color:'#4b49ac'}} onClick={handleClose} style={{cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
              <Typography color="#4b49ac" id="modal-modal-title" variant="h6" component="h2">
                Please Fill Mandatory Fields For Getting Recommendations
              </Typography>

              <TextField sx={{color:'#4b49ac'}}

                margin="dense"
                autoComplete="given-name"
                name="investmentAmount"
                required
                fullWidth
                type="number"
                value={investmentAmount}
                error={investmentAmountError}
                onChange={e => setInvestmentAmount(e.target.value)}
                id="Investment Amount"
                label="Investment Amount(Rs.)"
                autoFocus
              />
              <Grid sx={{ mt: 1 }}>
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Time Period"
                    value={timePeriod}
                    error={timePeriodError}
                    onChange={e => setTimePeriod(e.target.value)}
                  >
                    <MenuItem value={'6 months'}>6 months</MenuItem>
                    <MenuItem value={'1 year'}>1 year</MenuItem>
                    <MenuItem value={'3 year'}>3 year</MenuItem>
                    <MenuItem value={'5 year'}>5 year</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={{
                mt: 1
              }}>
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-label">Investment Type</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Risk Capacity"
                    value={investmentType}
                    error={investmentTypeError}
                    onChange={e => setInvestmentType(e.target.value)}
                  >
                    <MenuItem value={'Low Risk'}>Low Risk</MenuItem>
                    <MenuItem value={'High Risk'}>High Risk</MenuItem>
                    <MenuItem value={'Medium Risk'}>Medium Risk</MenuItem>
                    <MenuItem value={'Need Consultation'}>Need Consultation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {loading?
              <Button sx={{backgroundColor:'#4b49ac',marginTop:'5px'}} variant="contained">Creating...<i class="fa fa-spinner fa-spin"></i> </Button>
              :
              <Button sx={{backgroundColor:'#4b49ac', marginTop:'5px'}}  variant='contained'
               onClick={handleModalSubmit}>Create</Button>}

            </Box>


            {/* {selectedOption==='2'&& <TextField sx={{color:'#4b49ac'}}
                
                margin="dense"
                autoComplete="given-name"
                name="investmentAmount"
                required
                fullWidth
                // value={investmentAmount}
                // error={investmentAmountError}
                // onChange={e => setInvestmentAmount(e.target.value)}
                id="Investment Amount"
                label="Investment Amount"
                autoFocus
              />} */}
          </Modal>

          <Tooltip title={value?"No Pending Strategy Available.Create Investment Request to get Customized Strategies by Financial Experts.":"Click here to see investment strategies from advisor"} > <button disabled={value} class={value?'addDisabled my-button':'my-button'} onClick={handleRecommendations} >Strategies</button></Tooltip>
          <Modal
            open={recommendationsOpen}
            onClose={handleRecommendationsClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          ><Box sx={recommendationStyle} >
              <CloseIcon sx={{color:'#4b49ac'}} onClick={handleRecommendationsClose} style={{cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
              {strategyLoading? <div >
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div>:(
                <React.Fragment>
                {
                  investmentBundle.length===0
                // listOfStratgies.length===0
                ?   <TableContainer component={Paper} sx={{ overflowY: 'auto' }}>

<Table size="small" aria-label="simple table">
  <TableHead>
    <TableRow size='small' >
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Strategy Name</TableCell>
     
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Amount(Rs.)</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Expected Amount(Rs.)</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>6 Months Return(%)</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>1 year Return(%)</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>3 year Return(%)</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>5 year Return(%)</TableCell>
      <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Approve/Reject</TableCell>
     
    </TableRow>
  </TableHead>
  <TableBody>
  
      <React.Fragment >
      <TableRow>
        <TableCell
        sx={{ textAlign: "center"}} 
         colSpan={9}>No Pending Strategy Available.Create Investment Request to get Customized Strategies by Financial Experts.</TableCell>
      </TableRow>
    </React.Fragment> </TableBody></Table></TableContainer>:<>
    <span className='colorgreen'>* Double-Click on Amount Cell to Change the investment Amount in each Stock</span>
      <Box
      className='tableIcon'
sx={{
width: '100%',
height:'490px',
overflow:'auto',
'& .super-app-theme--header': { 

color: 'white', fontSize: '16px',
fontWeight: 'bold',
 backgroundColor: '#4b49ac'
},
}}
>

   { investmentBundle.map((fields)=>
    
    <div className="datagrid"> 

      <DataGrid
    //  onRowEditStop={(params, event) => {
    //   console.log(params.row)
    //   console.log(event.target.value)
    // }}
    // onRowEditCommit={(params,event)=>console.log(params.row)}
      //  onCellEditStop={handleRowEditCommit}
      // height={50}
      editMode="row"
      processRowUpdate={processRowUpdate}



    experimentalFeatures={{ newEditingApi: true }}
      // onCellEditStop={onCellEditCommit}
      // processRowUpdate={(updatedRow, originalRow) =>
      //   mySaveOnServerFunction(updatedRow)
      // }
      // onProcessRowUpdateError={handleProcessRowUpdateError}
      autoHeight
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      getRowId={(fields)=>fields.strategyId}
      // getRowId={(listOfStratgies) => listOfStratgies.strategyId}
// rows={listOfStratgies}
rows={fields.strategies}
columns={columns}
initialState={{
pagination: {
  paginationModel: { page: 0, pageSize: 5 },
},
}}
pageSizeOptions={[5]}
/>
{/* {!!snackbar && (<>
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
        </>)} */}
{/* <div className="chartDiv">
<LineChart
      xAxis={[
        {
          // id: 'Years',
          // data: years,
          // label:'Year',
          // scaleType: 'time',
          // valueFormatter: (date) => date.getFullYear().toString(),
          dataKey: 'date',
          valueFormatter: (v) => v.toString(),
          label:'Year',
          min: 2001,
          max: 2023,
        },
      ]}
      
      yAxis={[{
        label:'%age'
      }]}
      sx={ {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-25px, 0)',
        },
      }}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
       
        showMark: false,
       
      }))}
    
      dataset={worldElectricityProduction}
      {...customize}
    /> */}
    {/* <ChartsYAxis  label={{ value: 'Categories', position: 'insideBottom', offset: -10 }} /></LineChart> */}

    {/* <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ],
    },
  ]}
  sx={{marginTop:'55px'}}
  
  width={400}
  height={250}
/> */}
{/* </div> */}
<RadioGroup
// color="primary"
className="radiogroup"
    row
    aria-labelledby="demo-radio-buttons-group-label"
   
    // onChange={(e)=>setStatus(e.target.value)}
    onChange={(e)=>handleStatusData(fields.investmentId,fields,e.target.value)}
    name="radio-buttons-group"
  >
    <FormControlLabel className="green" id={fields.investmentId}   value="Approved" control={<Radio    />} label="Approve" />
    <FormControlLabel className="colorred" id={fields.investmentId}   value="Rejected" control={<Radio  />} label="Reject" />
    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */} 
 { fields.investmentId===statusId?
 <> {actionLoading? <Button variant="contained" sx={{bgcolor:'#4b49ac', marginTop:'5px'}} >
    Submitting...<i class="fa fa-spinner fa-spin"></i>
   </Button>
   :
    <Button variant="contained" onClick={()=>handleStatusSubmit(fields)} 
    sx={{bgcolor:'#4b49ac', marginTop:'5px'}} >Submit</Button>} </>:''}
  </RadioGroup>
 
  </div>

    )}
    </Box>
    </>
    //             <Box
    //             className='tableIcon'
    //   sx={{
    //     width: '100%',
    //     '& .super-app-theme--header': { 
       
    //       color: 'white', fontSize: '16px',
    //       fontWeight: 'bold',
    //        backgroundColor: '#4b49ac'
    //      },
    //   }}
    // >
    //             <DataGrid
    //             disableColumnMenu
    //             disableColumnSelector
    //             disableRowSelectionOnClick
    //             getRowId={(listOfStratgies) => listOfStratgies.strategyId}
    //     rows={listOfStratgies}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 5 },
    //       },
    //     }}
    //     pageSizeOptions={[5]}
    //   />
    //   </Box>
      }

                  {/* <TableContainer component={Paper} sx={{ overflowY: 'auto' }}>

                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow size='small' >
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Strategy Name</TableCell>
                       
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Amount(Rs.)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Expected Amount(Rs.)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>6 Months Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>1 year Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>3 year Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>5 year Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Approve/Reject</TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listOfStratgies.length===0?
                        <React.Fragment >
                        <TableRow>
                          <TableCell
                          sx={{ textAlign: "center"}} 
                           colSpan={9}>No Pending Strategy Available</TableCell>
                        </TableRow>
                      </React.Fragment> 
                      
                      
                     : listOfStratgies?.map((row) => {
                        if (row.status === 'Pending') {
                          return (
                            <React.Fragment key={row.strategyId}>
                              <TableRow>
                                <TableCell>{row.strategyId}</TableCell>
                                <TableCell>{row.investmentName}</TableCell>
                              
                                <TableCell>{row.investmentAmount}</TableCell>
                                <TableCell>{row.expectedAmount}</TableCell>
                                <TableCell>{row.returnPercentageAfter6months}</TableCell>
                                <TableCell>{row.returnPercentageAfter1year}</TableCell>
                                <TableCell>{row.returnPercentageAfter3year}</TableCell>
                                <TableCell>{row.returnPercentageAfter5year}</TableCell>
                                <TableCell><FormControl required fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              margin="normal"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              // value={Status}
            
              onChange={e=>{handleChange(row.strategyId,e.target.value)}}
            >
              <MenuItem value={'Approved'}>Approve</MenuItem>
              <MenuItem value={'Rejected'}>Reject</MenuItem>


            </Select>
          </FormControl></TableCell>                                
           <TableCell><ChildModal strategyId={row.strategyId} /></TableCell> 
<TableCell><Button sx={{ width: '100px', borderRadius: '20px' }} variant="contained" color={row.status === 'Pending' ? 'primary' : 'error'}>{row.status}</Button></TableCell> 
                              </TableRow>
                            </React.Fragment>
                          );
                        }
                        return null; // Exclude rows with status other than "pending"
                      })}
                      
                    </TableBody></Table>
                    
                    </TableContainer> */}
                    </React.Fragment> )}
             { visible? <>    {investmentBundle.length===0?'':<> {actionLoading?<Button sx={{backgroundColor:'#1BCFB4',marginTop:'10px', bottom: 0,
          left: '1058px',}} 
                    variant="contained" > 
                    Submitting... 
          <i class="fa fa-spinner fa-spin"></i></Button>
          :
          <Button  sx={{backgroundColor:'#1BCFB4',marginTop:'10px', bottom: 0,
          left: '1058px',
          }} variant="contained" onClick={()=>handleSave()}>Save Changes</Button>}</>}</>:''}
          
    
              </Box>
              
          </Modal>

        </div>
        </>}
      </div>
      <Snackbar 
      anchorOrigin={{  vertical: 'bottom',
      horizontal: 'right', }}
      open={snackOpen} 
      autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Changes Updated Successfully!
        </Alert>
      </Snackbar>
      <Snackbar 
      anchorOrigin={{  vertical: 'bottom',
      horizontal: 'right', }}
      open={snackInvOpen} 
      autoHideDuration={6000} onClose={handleSnackInvClose}>
        <Alert onClose={handleSnackInvClose} severity="success" sx={{ width: '100%' }}>
          Investment Successfully Generated! Soon Advisor Will Create Strategy for you.
        </Alert>
      </Snackbar>
    </div>
  );
}

function SettingsContent({clientId, setDashboardLoading , setSessionModalOpen}) {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [State, setState] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [bankName,setBankName]=useState('')
  const [accountNumber,setAccountNumber]=useState('')
  const [ifscCode,setIfscCode]=useState('')
  const [phoneHelperText,setphoneHelperText]=useState('')
  const phoneNumberPattern = /^\+[0-9](?:[0-9] ?|-){11,13}[0-9]$/;
  const [panNumber,setPanNumber]=useState('')
  const [message, setMessage] = useState('')
  const [backVisible,setBackVisible]=useState(true)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [bankNameError,setBankNameError]=useState(false)
  const [accountNumberError,setAccountNumberError]=useState(false)
  const [ifscCodeError,setIfscCodeError]=useState(false)
  const [panNumberError,setPanNumberError]=useState(false)
  const [bankHelperText,setBankHelperText]=useState('')
  const [accountNumberHelpertext,setAccountNumberHelperText]=useState('')
  const [ifscHelperText,setIfscHelperText]=useState('')
  const [panHelperText,setPanHelperText]=useState('')
  const bankPattern= /^[A-Za-z\s]+$/;
  const ifscPattern= /^[A-Z]{4}[0-9]{7}$/;
  const panPattern=/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const accountNumberPattern=/^[0-9]{14}$/;
  const [loading,setLoading]=useState(false)
  const [settingsLoading,setSettingsLoading]=useState(true)
  const [clientData,setClientData]=useState({})
  const [updatedClientData,setUpdatedClientData]=useState({})
  const [editVisible,setEditVisible]=useState(true)


  const handleMessage=()=>{
    setMessage("User Information Updated Successfully.")
     setTimeout(setMessage,5000,"")
  }
  const handleChange = (el) => {
    debugger
    let inputName = el.target.name;
    let inputValue = el.target.value;
   
    let statusCopy = Object.assign({}, updatedClientData);
    statusCopy[inputName] = inputValue;

    if(inputName==='bankName'){
      statusCopy.accountNumber = ''
      statusCopy.ifscCode = ''
     }
   
    setUpdatedClientData(statusCopy);
  }

  const ProfileBack = (el) => {
    setUpdatedClientData(clientData);
    
  }

  const handleBack=()=>{
    ProfileBack()
    setEditVisible(true)
    setDisabled(true)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setAddressError(false)
    setCityError(false)
    setStateError(false)
    setPhoneError(false)
    setPanNumberError(false)
   
    setIfscCodeError(false)
    setAccountNumberError(false)
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#e4f1ff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => {
    setModalOpen(true)
  };
  const handleClose = (event,reason) =>{ 
    if(reason!=='backdropClick'){
    setModalOpen(false)
  }
};

  useEffect(() => {
   
    // Inside the useEffect, you can make the axios request
    setDashboardLoading(true)
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/ClientSignUp/${clientId}?api-version=1`
    })
      .then((response) => {
        console.log(response.data.client)
        setClientData(response.data.client)
        setUpdatedClientData(response.data.client)
        setDashboardLoading(false)
        setSettingsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setDashboardLoading(false)
        setSettingsLoading(false)
      });
  }, []);


  const [disabled, setDisabled] = useState(true)
 const handleEdit = () => {
    setDisabled(false)
    setEditVisible(false)
  }

  const handleUpdate = () => {
    // console.log(1)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setPhoneError(false)
    setAddressError(false)
    setCityError(false)
    setStateError(false)
    setPasswordError(false)
    setBankNameError(false)
    setAccountNumberError(false)
    setIfscCodeError(false)
    setPanNumberError(false)
    setphoneHelperText('')
    setBankHelperText('')
    setAccountNumberHelperText('')
    setIfscHelperText('')
    setPanHelperText('')
    let count = 0;
    if (updatedClientData.firstName === '') {
      setFirstNameError(true)
      count++
    }
    if (updatedClientData.lastName === '') {
      setLastNameError(true)
      count++
    }
    if (updatedClientData.email === '') {
      setEmailError(true)
      count++
    }
    if (updatedClientData.phone === '') {
      setPhoneError(true)
      count++
    }
    if (updatedClientData.address === '') {
      setAddressError(true)
      count++
    }
    if (updatedClientData.city === '') {
      setCityError(true)
      count++
    }
    if (updatedClientData.State === '') {
      setStateError(true)
      count++
    }
    if (updatedClientData.bankName === '') {
      setBankNameError(true)
      count++
    }
    if (updatedClientData.accountNumber === '') {
      setAccountNumberError(true)
      count++
    }
    if (updatedClientData.ifscCode === '') {
      setIfscCodeError(true)
      count++
    }
    if (updatedClientData.panNumber === '') {
      setPanNumberError(true)
      count++
    }
    console.log(bankName)
    if (count > 0) {
      return
    }


      // if(!updatedClientData.phoneNumber.match(phoneNumberPattern)){
      //   setphoneHelperText('Invalid Mobile Number')
      //   return
      // }
    
    
    if (!updatedClientData.bankName.match(bankPattern)) {
      setBankNameError(true)
     
      setBankHelperText("Bank name should contain only letters and spaces");
    
      return 
  }
  if (!updatedClientData.accountNumber.match(accountNumberPattern)) {
    setAccountNumberError(true)
    setAccountNumberHelperText("Account number should be exactly 14 digits");
    return 
  }
  if (!updatedClientData.ifscCode.match(ifscPattern)) {
    setIfscCodeError(true)
    setIfscHelperText("IFSC code should be in the format: AAAA0123456");
    return 
  }
  
  if (!updatedClientData.panNumber.match(panPattern)) {
    setPanNumberError(true)
    setPanHelperText("PAN number should be in the format: ABCDE1234F");
    return 
  } 

    setBackVisible(false)
    setLoading(true)
      axios({
        method: 'put',
        url: `https://investmentportal.azurewebsites.net/api/ClientSignUp/update/${clientId}?api-version=1`,
        data:updatedClientData
      }).then((response) => {
        console.log(response)
        setLoading(false)
        if (response.data.message === "Client information updated successfully.") {
          
          setClientData(updatedClientData)
          setDisabled(true)
          setEditVisible(true)
          setBackVisible(true)
          handleMessage()
        }
  
  
      }, (error) => {
       setLoading(false)
       setBackVisible(true)
  
      })

    
    
  }
  return (<>

{settingsLoading?<div className="settings-container">
        {/* <LoadingSpinner /> */}
        <Skeleton variant="circular" width={100} height={100} />
<br></br>
<Skeleton variant="rectangular" width={400} height={100} />
<br></br>
<Skeleton variant="rounded" width={400} height={100} />
        </div>:
    <div className="settings-container">
      <h1 style={{ color: '#27005d' }}>Edit Profile details</h1>
      <div className="profile-section">
        <div className="profile-pic">
          <img src={image} style={{ height: '50px' }} />
        </div>

      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              InputProps={{
                disabled: disabled
                // readOnly:disabled
              }}
              value={updatedClientData.firstName}
              error={firstNameError}
              // onChange={e => setFirstName(e.target.value)}
              // onChange={e => setUpdatedAdvisorData({updatedAdvisorData: {firstName: e.target.value}})}
              onChange={e => handleChange(e)}
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              InputProps={{

                disabled: disabled
              }}
              value={updatedClientData.lastName}
              error={lastNameError}
              onChange={e => handleChange(e)}
              autoComplete="family-name"
            />
          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              autoComplete="given-name"
              name="email"
              required
              fullWidth
              InputProps={{

                disabled: true
              }}
              value={updatedClientData.email}
              error={emailError}
              onChange={e => handleChange(e)}
              id="email"
              label="Email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              required
              fullWidth
              id="phone"
              InputProps={{

                disabled: true
              }}
              helperText={phoneHelperText}
              label="Phone Number"
              name="phoneNumber"
              value={`+${updatedClientData.phoneNumber}`}
              error={phoneError}
              onChange={e => handleChange(e)}
              autoComplete="family-name"
            />
          </Grid>

        </Grid>

        <TextField sx={{color:'#4b49ac'}}
          size="small"
          margin="dense"
          autoComplete="given-name"
          name="address"
          required
          fullWidth
          InputProps={{

            disabled: disabled
          }}
          multiline
          maxRows={4}
          value={updatedClientData.address}
          error={addressError}
          onChange={e => handleChange(e)}
          id="address"
          label="Address"
          autoFocus
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              autoComplete="given-name"
              name="city"
              required
              InputProps={{

                disabled: disabled
              }}
              fullWidth
              value={updatedClientData.city}
              error={cityError}
              onChange={e => handleChange(e)}
              id="city"
              label="City"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              required
              fullWidth
              InputProps={{

                disabled: disabled
              }}
              id="state"
              label="State"
              name="state"
              value={updatedClientData.state}
              error={stateError}
              onChange={e => handleChange(e)}
              autoComplete="family-name"
            />
          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-label">Bank Name</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="bankName"
              required
              disabled= 
              {
                disabled
                
                }
              // InputProps=
                    label="Time Period"
                    value={updatedClientData.bankName}
                    error={bankNameError}
                    helperText={bankHelperText}
                    onChange={e => handleChange(e)}
                  >
                    <MenuItem value={'State Bank Of India'}>State Bank Of India</MenuItem>
                    <MenuItem value={'HDFC'}>HDFC</MenuItem>
                    <MenuItem value={'Bank Of India'}>Bank Of India</MenuItem>
                    <MenuItem value={'Punjab National Bank'}>Punjab National Bank</MenuItem>
                    <MenuItem value={'Axis Bank'}>Axis Bank</MenuItem>
                    <MenuItem value={'Canara Bank'}>Canara Bank</MenuItem>


                  </Select>
                </FormControl>
            {/* <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              autoComplete="given-name"
              name="bankName"
              required
              InputProps={{

                disabled: disabled
              }}
              fullWidth
              value={updatedClientData.bankName}
              error={bankNameError}
              helperText={bankHelperText}
              onChange={e => handleChange(e)}
              id="bank"
              label="Bank Name"
              autoFocus
            /> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              required
              fullWidth
              InputProps={{

                disabled: disabled
              }}
              inputProps={{ maxLength: 14,pattern: '[0-9]*' }}
              id="account"
              label="Account Number"
              name="accountNumber"
              value={updatedClientData.accountNumber.replace(/[^0-9]/g, '')}
              error={accountNumberError}
              helperText={accountNumberHelpertext}
              onChange={e => handleChange(e)}
              autoComplete="family-name"
            />
          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              autoComplete="given-name"
              name="ifscCode"
              required
              InputProps={{

                disabled: disabled
              }}
              fullWidth
              value={updatedClientData.ifscCode}
              error={ifscCodeError}
              helperText={ifscHelperText}
              onChange={e => handleChange(e)}
              id="ifsc"
              label="IFSC Code"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField sx={{color:'#4b49ac'}}
              size="small"
              margin="dense"
              required
              fullWidth
              InputProps={{

                disabled: disabled
              }}
              id="pan"
              label="PAN Number"
              name="panNumber"
              value={updatedClientData.panNumber}
              error={panNumberError}
              helperText={panHelperText}
              onChange={e => handleChange(e)}
              autoComplete="family-name"
            />
          </Grid>

        </Grid>
        {/* <TextField sx={{color:'#4b49ac'}}
          size="small"
          margin="dense"
          required
          fullWidth
          id="password"
          label="Password"
          type='password'
          name="password"
          InputProps={{

            disabled: disabled
          }}
          value={password}
          error={passwordError}
          onChange={e => setPassword(e.target.value)}
          autoComplete="family-name"
        /> */}
      </div>
      {message?<Alert severity="success" >{message}</Alert>:''}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
          <CloseIcon sx={{color:'#4b49ac'}} onClick={handleClose} style={{cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Client information updated successfully.
          </Typography>
        </Box>
      </Modal>
      <div className='editUpdate'>
      {editVisible
         ?
         <Button variant='contained' onClick={()=>handleEdit()} 
         style={{ width :'90px' , marginTop:'8px'  , color: '#fff', backgroundColor: '#4b49ac' }}>Edit
         </Button>
        :
        <>
        {loading?
    <Button variant='contained'  
    style={{ width:'90px', marginTop:'8px', marginRight:'5px', color: '#fff', backgroundColor: 'green' }}>
      Updating <i class="fa fa-spinner fa-spin"></i>
      </Button>
    :
    <Button variant='contained' onClick={()=>handleUpdate()} 
    style={{width:'90px',marginTop:'8px', marginRight:'5px', color: '#fff', backgroundColor: 'green' }}>
      Update
      </Button>}
        {backVisible&&<Button sx={{backgroundColor:'#4b49ac', marginTop:'8px'}} onClick={()=>handleBack()} variant='contained' >Go Back</Button>}
    </>
      }
        
      </div>
    </div>}
  </>
  );
}
export default Dashboard