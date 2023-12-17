import * as React from 'react'
import { useEffect, useState } from "react";
import './AdvisorDashboard.css'
// import DynamicTextFieldForm from './DynamicTextfields';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import HelpIcon from '@mui/icons-material/Help';
import lowRisk from '../../assets/low_risk.jpg'
import highRisk from '../../assets/high_risk.jpg'
import mediumRisk from '../../assets/medium_risk.jpg'
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { BarChart } from '@mui/x-charts/BarChart';
import Tooltip from '@mui/material/Tooltip';
import CollapsibleTable from "./table";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from "./Row";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import image from '../../assets/download.png'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import '../sidebar.js'
import { Alert, Skeleton } from '@mui/lab';
import Card from '../Card/Card';
import { DataGrid } from '@mui/x-data-grid';


// const [loading,setLoading]=useState(true)

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

  //debugger
  // #region StartTimer
  let countdown;
  let leftTime,expirationTime,timeInSeconds;
  //debugger
  let splitarray = window.location.pathname.split('/');
  let _advieorID= splitarray[splitarray.length-1];
  let storage = JSON.parse(localStorage.getItem(_advieorID));
  const navigate = useNavigate()
  const handleLogout=()=>{
    // stopTimer()
    localStorage.removeItem(_advieorID)
    navigate('/advisor')
  }
  
  function startTimer() {
    updateTimer();
    countdown = setInterval(updateTimer, 1000);
  }
  
  function stopTimer() {
      clearInterval(countdown);
  }

  function updateTimer() {
    // //debugger
    if(!localStorage.getItem(_advieorID))
    {
       stopTimer();
       navigate('/advisor')
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
          localStorage.setItem(_advieorID,JSON.stringify(storage));
      }
    }
    
}

// const handleStillYes=()=> {
//   //debugger
//   if(!timeInSeconds)
//      timeInSeconds = storage.TimeLeft;

//   timeInSeconds +=600
//   setTimerModalOpen(false)
//   storage.TimeLeft += timeInSeconds;
//   localStorage.setItem(_advieorID,JSON.stringify(storage));
//   stopTimer()
//   // Add sceleton and add settimeout function for start timer
//   startTimer()
// }
  // #endregion
   
  // ////debugger
  console.log("tester")
  const { advisorId } = useParams()
  // global [dashboardLoading,setDashboardLoading] = useState(true) 
 let [dashboardLoading,setDashboardLoading]=useState(true)
 const [timerModalOpen,setTimerModalOpen]=useState(false)
  
  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [loading,setLoading]=useState(true)
  const handleTimerModalClose = (event,reason) => {
    if (reason !== 'backdropClick') {
      setTimerModalOpen(false)
    }
   };
 

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
 
  useEffect(() => {
    // //debugger
    if(!storage){
      // Add popup and with settimeout will natigate to advisor path
      navigate('/advisor')
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

    
    
     
// //debugger
    const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
// const searchBtn = body.querySelector(".search-box");
const content = body.querySelector(".content");
const materialicons = body.querySelectorAll(".Customicons");
const navLinks = document.querySelectorAll('.nav-link a span')
// const modeText = body.querySelector(".mode-text");
// //debugger


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

// modeSwitch.addEventListener("click", () => {
//    body.classList.toggle("dark");
// });

    
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/${advisorId}?api-version=1`
    }).then((response) => {
      // ////debugger
      let advisor=response.data.advisor
      setFirstName(advisor.firstName)
      setLastName(advisor.lastName)
     setLoading(false)
     setDashboardLoading(false);
    }, (error) => {
      console.log(error)
      setLoading(false)
      setDashboardLoading(false);
    })
  }, [])

  // const handleNo=()=>{
  //   timeInSeconds=4
  //   startTimer()

  //   setTimerModalOpen(false)
  // }
  // const handleYes=()=>{
  //   //debugger
  //   timeInSeconds=20
  //   setTimerModalOpen(false)
  //   startTimer()
  // }

   
 
  const handleOptionClick = (option) => {
     ////debugger
    setSelectedOption(option);
  };


  const [selectedOption, setSelectedOption] = useState('ClientList');

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
            <Skeleton  variant="text" sx={{ marginLeft:"60px", marginBottom:'0px' ,marginTop:'0px' , bgcolor:'#fff',  width:'160px', fontSize: '3rem' }} />
            </div>:<div class="text header-text">
                <span class="name">{firstName + ' '+ lastName}</span>
                <span class="profession">Advisor:{advisorId}</span>
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
                <a id={selectedOption === 'ClientList' ? 'iactiveanchor' : ''} onClick={() => handleOptionClick('ClientList')}>
                <i id={selectedOption === 'ClientList' ? 'iactive' : ''} className="material-icons Customicons">pie_chart</i>
                <span  id={selectedOption === 'ClientList' ? 'iactiveli' : ''} class="text nav-text">List of Clients</span>
              </a>
            </li>
            <li class="nav-link">
                <a id={selectedOption === 'InvestmentStrategies' ? 'iactiveanchor' : ''} onClick={() => handleOptionClick('InvestmentStrategies')}>
                  <i id={selectedOption === 'InvestmentStrategies' ? 'iactive' : ''} className="material-icons Customicons">swap_horiz</i>
                  <span  id={selectedOption === 'InvestmentStrategies' ? 'iactiveli' : ''}  class="text nav-text">Strategies</span>
                </a>
            </li>
            <li class="nav-link">
                <a id={selectedOption === 'InvestmentRequests' ? 'iactiveanchor' : ''}  onClick={() => handleOptionClick('InvestmentRequests')}>
                <i id={selectedOption === 'InvestmentRequests' ? 'iactive' : ''} className="material-icons Customicons">description</i>
              <span   id={selectedOption === 'InvestmentRequests' ? 'iactiveli' : ''} class="text nav-text">Investment Requests</span>
              </a>
            </li>
          
            <li class="nav-link">
                <a id={selectedOption === 'PastInvestments' ? 'iactiveanchor' : ''} onClick={() => handleOptionClick('PastInvestments')}>
                <i id={selectedOption === 'PastInvestments' ? 'iactive' : ''} className="material-icons Customicons">history</i>

                <span  id={selectedOption === 'PastInvestments' ? 'iactiveli' : ''} class="text nav-text">Approved Investments</span>
              </a>
            </li>
            <li class="nav-link">
                <a id={selectedOption === 'Settings' ? 'iactiveanchor' : ''} onClick={() => handleOptionClick('Settings')}>
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

        {/* <div class="bottom-content">
            <li class="nav-link">
                <a>
                    <i class="Customicons fa fa-sign-out"></i>
                    <span onClick={()=>handleLogout()} class=" text nav-text">Logout</span>
                    </a>
            </li>
        </div> */}
    </div>
</nav>
</div>

      <div className="content inc-m-l">
     
        {selectedOption === 'ClientList' && <ClientList advisorId={advisorId}
        setDashboardLoading={setDashboardLoading} />}
        {selectedOption === 'InvestmentStrategies' && <InvestmentStrategies advisorId={advisorId} dashboardLoading={dashboardLoading}
        setDashboardLoading={setDashboardLoading} />}
        {selectedOption === 'InvestmentRequests' && <ReportsContent advisorId={advisorId} 
         setDashboardLoading={setDashboardLoading}/>}
         {selectedOption === 'PastInvestments' && <PastInvestments advisorId={advisorId}
        setDashboardLoading={setDashboardLoading} />}
        {selectedOption === 'Settings' && <SettingsContent advisorId={advisorId} 
         setDashboardLoading={setDashboardLoading}/>}
      </div>
    </div></>
  );
}

function InvestmentStrategies({ advisorId ,setDashboardLoading }) {
  // ////debugger


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  

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

  //handle modal

  const [open, setOpen] = useState(false);
  const [coll, setColl] = useState("");
  const [loading,setLoading]=useState(true)
  const [totalStrategies,setTotalStrategies]=useState(0)
  const [totalInvAmount,setTotalInvAmount]=useState(0)
  const [totalExpAmount,setTotalExpAmount]=useState(0)
  const [totalApproved,setTotalApproved]=useState(0)
  const [totalRejected,setTotalRejected]=useState(0)
  const [totalPending,setTotalPending]=useState(0)
  const [totalFunded,setTotalFunded]=useState(0)

 

  // const [flag,setFlag]=useState('')



  let flag = [];
  // const [data,setData]=useState([]);
  
  useEffect(() => {
    
setDashboardLoading(true)
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/strategies/${advisorId}/By-AdvisorId?api-version=1`
    }).then(function (response) {
      const list = response.data.strategies
      setTotalInvAmount(list.map(x=> x.investmentAmount).reduce(function(a, b){
        return a + b;
      }));
      setTotalExpAmount(list.map(x=> x.expectedAmount).reduce(function(a, b){
        return a + b;
      }));
      //debugger
      const _approved  = list.filter(x=> x.status== 'Approved').length
      const _rejected = list.filter(x=> x.status== 'Rejected').length
      const _pending = list.filter(x=> x.status== 'Pending').length
      const _funded= list.filter(x=>x.status=='Funded').length
      setTotalStrategies(list.length)
      setTotalApproved(_approved)
      setTotalRejected(_rejected)
      setTotalPending(_pending)
      setTotalFunded(_funded)
     setLoading(false)
   
    setDashboardLoading(false)
      setListOfStrategies(list)
      if(_approved>0){

      const _SixthCard = document.querySelector('.SixthCard');
      !!_SixthCard && (_SixthCard.classList.add('addPointer') ||
       _SixthCard.addEventListener('click',function() {
        document.querySelector('.rectangle-div').scrollIntoView()
        _SixthCard.classList.toggle("addBorder");
        if(!flag.includes("Approved")){
          
          flag.push("Approved");
          setListOfStrategies(list.filter(x=> flag.includes(x.status)))
        }
        else{
          flag = flag.filter(item => item !== "Approved");
          if(flag.length === 0)
            setListOfStrategies(list)
          else
            setListOfStrategies(list.filter(x=> flag.includes(x.status)))
        }
    }))
  }

  if(_funded>0){

    const _seventhCard = document.querySelector('.seventhCard');
    !!_seventhCard && (_seventhCard.classList.add('addPointer') ||
    _seventhCard.addEventListener('click',function() {
      document.querySelector('.rectangle-div').scrollIntoView()
      _seventhCard.classList.toggle("addBorder");
      if(!flag.includes("Funded")){
        
        flag.push("Funded");
        setListOfStrategies(list.filter(x=> flag.includes(x.status)))
      }
      else{
        flag = flag.filter(item => item !== "Funded");
        if(flag.length === 0)
          setListOfStrategies(list)
        else
          setListOfStrategies(list.filter(x=> flag.includes(x.status)))
      }
  }))
}
   
  if(_rejected>0){
  const _fourthCard = document.querySelector('.fourthCard');
  !!_fourthCard && (_fourthCard.classList.add('addPointer') 
  || _fourthCard.addEventListener('click',function() {
    document.querySelector('.rectangle-div').scrollIntoView()
      _fourthCard.classList.toggle("addBorder");
      if(!flag.includes("Rejected")){
          flag.push("Rejected");
          setListOfStrategies(list.filter(x=> flag.includes(x.status)))
        }
        else{
          flag = flag.filter(item => item !== "Rejected");
          if(flag.length === 0)
            setListOfStrategies(list)
          else
            setListOfStrategies(list.filter(x=> flag.includes(x.status)))
        }
      
  }))
  }
  if(_pending>0){
  const _fifthCard = document.querySelector('.fifthCard');

  !!_fifthCard && (_fifthCard.classList.add('addPointer')||_fifthCard.addEventListener('click',function() {
 
    document.querySelector('.rectangle-div').scrollIntoView()
    _fifthCard.classList.toggle("addBorder");
    if(!flag.includes("Pending")){
      flag.push("Pending");
      setListOfStrategies(list.filter(x=> flag.includes(x.status)))
      }
      else{
        flag = flag.filter(item => item !== "Pending");
        if(flag.length === 0)
        setListOfStrategies(list)
        else
        setListOfStrategies(list.filter(x=> flag.includes(x.status)))
      }
}))}
      

    },
      function (error) {
        setLoading(false)
        setDashboardLoading(false)
        console.log(error)
      })
  }, [])

function collapseRow(the)
{
  ////debugger;
  let _strategyId = the.row.strategyId;
  //setOpen(!open);
  if(coll === _strategyId)
    _strategyId='';
  setColl(_strategyId);
}



  return (<>

   
    <div className="portfolio">
      

      {loading?<>
        <div className='card-container'>
                <Card color="firstCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />} />
                <Card color="secondCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="thirdCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                 number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="SixthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="fourthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="fifthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                 number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                 <Card color="seventhCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>

          </div>
      
      <div className="rectangle-div">
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div>
       </> :(<>
         <div className='card-container'>
                <Card color="firstCard"  heading="Number of Strategies" number={totalStrategies}/>
                <Card color="secondCard"  heading="Total Invested Amount" number={`Rs.${totalInvAmount}`}/>
                <Card color="thirdCard" heading="Total Expected  Amount" number={`Rs.${totalExpAmount.toFixed(2)}`}/>
                <Card color="SixthCard" heading="Total Approved Holdings" number={totalApproved}/>
                <Card color="fourthCard" heading="Total Rejected Holdings" number={totalRejected}/>
                <Card color="fifthCard" heading="Total Pending Holdings" number={totalPending}/>
                <Card color="seventhCard"  heading="Total Funded Holdings" number={totalFunded}/>

          </div>
      <div className="rectangle-div">
      {/* <CollapsibleTable/> */}
      <TableContainer component={Paper}>
        <Table size='small' aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}/>
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }} >#</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Strategy Name</TableCell>
             
              {/* <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px' }}>Original Amount&nbsp;(Rs.) </TableCell> */}
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Investment Amount (Rs.)</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Expected Amount (Rs.)</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
              <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Status </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {listOfStratgies.length==0?
            <React.Fragment >
            <TableRow>
              <TableCell
              sx={{ textAlign: "center"}} 
               colSpan={7}>No Strategy Available</TableCell>
            </TableRow>
          </React.Fragment>
            
            :
            (rowsPerPage > 0
              ? listOfStratgies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : listOfStratgies
            )?.map((row) => (
              <React.Fragment>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      // onClick={() => setOpen(!open)}
                      onClick={() => collapseRow({row})}
                    >
                      {coll == row.strategyId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell >{row.clientId} </TableCell>
                  <TableCell >{row.investmentName}</TableCell>
                  
                  {/* <TableCell >{row.amount} </TableCell> */}
                  <TableCell >{row.investmentAmount}</TableCell>
                  <TableCell >{row.expectedAmount}</TableCell>
                  <TableCell>{row.timePeriod}</TableCell>
                  <TableCell >{row.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
                    <Collapse in = {coll == row.strategyId} style={{marginLeft: "145px"}} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <BarChart
                          xAxis={[
                            {
                              id: 'barCategories',
                              data: ['6 Month', '1 Year', '3 Year', '5 Year'],
                              scaleType: 'band',
                              label: 'Time'
                            },
                          ]}
                          yAxis={[
                            {
                              label: '% Returns'
                            }
                          ]}
                          series={[
                            {
                              color: '#b7d9ff',
                              data: [row.returnPercentageAfter6months, row.returnPercentageAfter1year, row.returnPercentageAfter3year, row.returnPercentageAfter5year],
                              label: 'Percentage Returns'
                            },
                          ]}
                          width={570}
                          height={300}
                        />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
          { listOfStratgies.length!==0 ?<><TableFooter>
          
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={7}
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
        </Table>
      </TableContainer>
      {/* <TablePagination
          rowsPerPageOptions={[1, 2, 3]}
          component="div"
          count={listOfStratgies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
    </div></>)}

      
    </div></>
  );
}

function ClientList({ advisorId ,setDashboardLoading }) {


  const columns = [
    { field: 'clientId', headerName: '#',backgroundColor: '#4b49ac',width: 144 ,headerClassName: 'super-app-theme--header', },
    { field: 'fullname', headerName: 'Client Name',width: 300,headerClassName: 'super-app-theme--header', },
    { field: 'email', headerName: 'Email Address' ,width: 300,headerClassName: 'super-app-theme--header', },
    {
      field: 'phoneNumber',
      headerName: 'Mobile Number',
      description: 'This column has a value getter and is not sortable.',
      headerClassName: 'super-app-theme--header',
      width: 150 
      
    }
  ];
  //  ////debugger
  // dashboardLoading=true
  const [listOfClients, setListOfClients] = useState([])
  const [loading,setLoading]=useState(true)
  const [totalClients,setTotalClients]=useState(0)
  useEffect(() => {
    // ////debugger
    setDashboardLoading(true)
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/clients-by-advisor/${advisorId}?api-version=1`
    }).then((response) => {
////debugger


      let list=response.data
      setTotalClients(list.length)
      //debugger
      list = list.map(obj => {
        return { ...obj, fullname : `${obj.firstName} ${obj.lastName}` };
       }
      //  {}
    );
      setListOfClients(list)
      
    //   new DataTable('#AdvisorClientTable', {
    //     scrollCollapse: true,
    //     scroller: true,
    //     scrollY: 200
    // });
      setLoading(false)
      setDashboardLoading(false)
      // dashboardLoading=false
      // $("#AdvisorClientTable").DataTable(
      //   {
      //         scrollCollapse: true,
      //         scroller: true,
      //         scrollY: 200
      //   }
      // );

    //   new DataTable('#AdvisorClientTable', {
    //     scrollCollapse: true,
    //     scroller: true,
    //     scrollY: 200
    // });
      

    }

      , (error) => { 
        setLoading(false)
        setDashboardLoading(false)
        console.log(error) })
  }, [])

  // ////debugger









  //   axios({
  //     method:'get',
  //     url:`  https://investmentportal.azurewebsites.net/api/AdvisorSignUp/clients-by-advisor/${advisorId}`
  //   }).then((response)=>{


  //   response.data.map((e)=>{
  //     if(!listOfClientId.includes(e.clientId)){
  //       setListOfClientId([...listOfClientId,e.clientId])
  //     }

  //   })
  // console.log('list:'+listOfClientId)
  //     }

  //   ,(error)=>{console.log(error)})


  //   listOfClientId.map((e)=>{axios({
  //     method:'get',
  //     url:`  https://investmentportal.azurewebsites.net/api/investments/client/${e.clientId}`
  //   }).then((response)=>{setListofInvestments([...listOfInvestments,response.data])},(error)=>{})


  // })


  //   useEffect(()=>{
  //     axios({
  //       method:'get',
  //       url:`  https://investmentportal.azurewebsites.net/api/strategies/${advisorId}/By-AdvisorId`
  //     }).then(function(response){
  //     const list=response.data.strategies

  //     //  list.map((e)=>{
  //     //   // const object1={amount:e.investmentAmount,
  //     //   //                 graphHeadings:"Investment Amount"}
  //     //   // const object2={amount:e.expectedAmount,
  //     //   // graphHeadings:"Expected Amount"}
  //     //   setData([e.investmentAmount,e.expectedAmount])})
  //     //  setListOfStrategies(list)
  //     //   console.log(list)

  //     },
  //     function(error)
  //     {
  //       console.log(error)
  //     })
  // },[listOfStratgies,advisorId])
  //handle modal
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
  const handleClose = () => setModalOpen(false);
  const [clientId, setClientId] = useState('')
  const [clientIdError, setClientIdError] = useState(false)

  const [listOfRequests, setListOfRequests] = useState([])

 


  const requestsStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',


    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#e4f1ff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  const [requestsOpen, setRequestsOpen] = useState(false);
  const handleRequestsOpen = () => setRequestsOpen(true);
  const handleRequestsClose = () => setRequestsOpen(false);
  return (
    <div>
{loading?<>
  <div className='card-container'>
                <Card color="firstCard" heading={<Skeleton variant="text" sx={{fontSize: '2rem' }} />}
                 number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />} />
                </div>
<div className="rectangle-div">

        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div> </>:(
                <>
                <div className='card-container'>
                <Card color="firstCard" heading="Number of Clients" number={totalClients}/>
                </div>
                <div className="rectangle-div">
                  {listOfClients.length===0?<TableContainer component={Paper}>
          <Table size='small' aria-label="simple table" id="AdvisorClientTable">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Client Name</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Email Address</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Mobile Number</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            
            <React.Fragment >
              <TableRow>
                <TableCell
                sx={{ textAlign: "center"}} 
                 colSpan={4}>No Client Assigned</TableCell>
              </TableRow>
            </React.Fragment></TableBody></Table></TableContainer>:
                <Box
                className='tableIcon'
      sx={{
        width: '100%',
        '& .super-app-theme--header': { color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' },
      }}
    >
                <DataGrid
                disableColumnSelector
                disableSelectionOnClick
                slotProps={{
                  columnsPanel: {
                    disableHideAllButton: true,
                    disableShowAllButton: true,
                  },
                }}
                getRowId={(listOfClients) => listOfClients.clientId}
        rows={listOfClients}
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
          <Table size='small' aria-label="simple table" id="AdvisorClientTable">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Client Name</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Email Address</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Mobile Number</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {listOfClients.length == 0 ? 
            <React.Fragment >
              <TableRow>
                <TableCell
                sx={{ textAlign: "center"}} 
                 colSpan={4}>No Client Assigned</TableCell>
              </TableRow>
            </React.Fragment> :
              
              listOfClients?.map((row) =>
                <React.Fragment>
                  <TableRow>
                    <TableCell>
                      {row.clientId}
                    </TableCell>
                    <TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{'+91' + row.phoneNumber}</TableCell>

                  </TableRow></React.Fragment>

              )}


            </TableBody></Table></TableContainer> */}

      </div></>)

}
      
      
    </div>
  )
}



function ReportsContent({ advisorId ,setDashboardLoading }) {
  //////debugger
  // dashboardLoading=true
  const [formFields, setFormFields] = useState([{ id: 1, values: {} }]);

  const addFields = () => {
    setFormFields([...formFields, { id: formFields.length + 1, values: {} }]);
  };

  const removeFields = (id) => {
    if(id===1){
      return
    }
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const handleInputChange = (id, fieldName, value) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, values: { ...field.values, [fieldName]: value } } : field
  
      )
    );
  };

  const columns = [
    { field: 'investmentID', headerName: '#',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header', },
    { field: 'clientId', width:110 , headerName: 'Client Id',headerClassName: 'super-app-theme--header', },
    { field: 'createdDate',width:110 , headerName: 'Date' ,headerClassName: 'super-app-theme--header',
  renderCell : (params)=> params.row.createdDate.slice(0,10)},
    {
      field: 'investmentAmount',
      width:110 ,
      headerName: 'Amount',
     
      headerClassName: 'super-app-theme--header',
     
      
    },
    { field: 'remainingAmount', width:110, headerName: 'Balance' ,headerClassName: 'super-app-theme--header', },
    { field: 'timePeriod', width:110 , headerName: 'Time Period' ,headerClassName: 'super-app-theme--header', },
  
    { field: 'status', width:110 , headerName: 'Status' ,headerClassName: 'super-app-theme--header', },
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
    { disableColumnMenu:true , headerName:'',headerClassName: 'super-app-theme--header',sortable: false, width: 50 , renderCell: (params) => {
      return (
        <Tooltip title='Create Strategy' placement='right-end'> <Button className='plusIcon' onClick={()=>handleOpen(params.row)}>
                
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </Button></Tooltip>
      );
    }}
  ];
 
  const [loading,setLoading]=useState(false)
  const [requestLoading,setRequestLoading]=useState(true)
  const [remainingAmount,setRemainingAmount]=useState('')
  const [clientAmount,setClientAmount]=useState('')
    // const [_rate,setRate]=useState(0)
  // const [_time,setTime]=useState(0)

  
const [snackOpen, setSnackOpen] = React.useState(false);

 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const handleSnackClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSnackOpen(false);
};
  const [data,setData]=useState([])
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow:'auto',
    
    transform: 'translate(-50%, -50%)',
    // width: 450,
    width: 1200,
    height:510,
    bgcolor: '#e4f1ff',
    // borderRadius: '25px',
    borderRadius: '5px',
    boxShadow: 24,
    p: 2,
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const [clientId, setClientId] = useState('')
  const handleOpen = (row) => {
      debugger
     setClientId(row.clientId);
     setInvestmentId(row.investmentID)
    setRemainingAmount(row.remainingAmount)
    setClientAmount(row.investmentAmount)
    setTimePeriod(row.timePeriod)
    
    axios({
      method:'get',
      url:`https://investmentportal.azurewebsites.net/api/strategies/bytype/${row.investmentType}?api-version=1`,
    }).then(
      (response)=>{
        //debugger
        setData(response.data)
      
        setModalOpen(true);
        console.log(data)
    //  const data =response.data
    //  setData(data)
      },()=>{}
      
    )
    
  }
  const handleClose = (event,reason) => {
    if(reason!=='backdropClick'){
    setModalOpen(false)
    setMessage('')
    setStrategyName('')
    setInvestmentAmount('')
    setExpectedAmount('')
    setTimePeriod('')
    setSixMonReturns('')
    setOneYrReturns('')
    setThreeYrReturns('')
    setFiveYrReturns('')
    setFormFields([{ id: 1, values: {} }])
    setStrategyNameError(false)
    setInvestmentAmountError(false)
    setExpectedAmountError(false)
    setTimePeriodError(false)
    setSixMonReturnsError(false)
    setIndustryNameError(false)
    setOneYrReturnsError(false)
    setHelperText('')
    setThreeYrReturnsError(false)
    setFiveYrReturnsError(false)
  }};
  const [strategyName, setStrategyName] = useState('')
  const [investmentId, setInvestmentId] = useState('')
  const [amount, setAmount] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [expectedAmount, setExpectedAmount] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  // const [Status,setStatus]=useState('')
  const [sixMonReturns, setSixMonReturns] = useState("")
  const [oneYrReturns, setOneYrReturns] = useState("")
  const [threeYrReturns, setThreeYrReturns] = useState("")
  const [fiveYrReturns, setFiveYrReturns] = useState("")

  const [message, setMessage] = useState('')

  const [timePeriodError, setTimePeriodError] = useState(false)
  const [strategyNameError, setStrategyNameError] = useState(false)
  const [clientIdError, setClientIdError] = useState(false)
  // const [amountError,setAmountError]=useState(false)
  const [investmentIdError, setInvestmentIdError] = useState(false)
  const [investmentAmountError, setInvestmentAmountError] = useState(false)
  const [expectedAmountError, setExpectedAmountError] = useState(false)
  const [industryNameError,setIndustryNameError]=useState(false)
  // const [statusError,setStatusError]=useState(false)
  const [sixMonReturnsError, setSixMonReturnsError] = useState(false)
  const [oneYrReturnsError, setOneYrReturnsError] = useState(false)
  const [threeYrReturnsError, setThreeYrReturnsError] = useState(false)
  const [fiveYrReturnsError, setFiveYrReturnsError] = useState(false)
  const [helperText,setHelperText] =useState('')
  
const handleReturns=(id,strategyName,timePeriod)=>{
  // const handleReturns=(strategyName,timePeriod)=>{
    setHelperText('')
    let nameArray=[]
    formFields.map((fields)=>{
      if(fields.values['textfield1']){
        nameArray.push(fields.values['textfield1'])
       }
    })
    let uniqueSet = new Set(nameArray);
    if(nameArray.length !== uniqueSet.size){
        setHelperText('Duplicate Stocks are not Allowed')
        nameArray=[]
        // setStrategyName('')
        return
    } 

  if(timePeriod.includes('1'))
  {
    document.getElementById('1yr').classList.add("termSelected")
  }
  else if(timePeriod.includes('6'))
  {
    document.getElementById('6m').classList.add("termSelected")
  }
  else if(timePeriod.includes('3'))
  {
    document.getElementById('3yr').classList.add("termSelected")
  }
  else if(timePeriod.includes('5'))
  {
    document.getElementById('5yr').classList.add("termSelected")
  }
  axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/strategies/byname/${strategyName}?api-version=1`
    }).then((response)=>{
     let data = response.data[0]
     if(data){
      // setSixMonReturns(data.returnPercentageAfter6months)
      // setOneYrReturns(data.returnPercentageAfter1year)
      // setThreeYrReturns(data.returnPercentageAfter3year)
      // setFiveYrReturns(data.returnPercentageAfter5year)
     formFields.map((fields)=>
      setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, values: { ...field.values, ['textfield3']: data.returnPercentageAfter6months
      ,['textfield4']: data.returnPercentageAfter1year,
      ['textfield5']: data.returnPercentageAfter3year,
      ['textfield6']: data.returnPercentageAfter5year,
    ['textfield8']:data.industry }} : field
  
      )
    )
     )
  }
    
    },(error)=>{
        console.log(error)
    })
}

const handleCalculations=(field,id,investmentAmount)=>{
  let _rate = 0
  let _time = 0
   if(timePeriod.includes('6')){
      // document.getElementById('6m').classList.add("termSelected")
      _rate=  +field.values['textfield3'] 
      _time=  0.5
    }
    if(timePeriod.includes('1')){
      // document.getElementById('1yr').classList.add("termSelected")
      _rate=  +field.values['textfield4'] 
      _time=  1
    }
    if(timePeriod.includes('3')){
      // document.getElementById('3yr').classList.add("termSelected")
      _rate=  +field.values['textfield5'] 
      _time=  3    }
    if(timePeriod.includes('5')){
      // document.getElementById('5yr').classList.add("termSelected")
      _rate=  +field.values['textfield6'] 
      _time=  5
    }
let expAmount=(+investmentAmount*(Math.pow((1 + _rate/100),_time))).toFixed(2)
debugger
    formFields.map((fields)=>
    setFormFields((prevFields) =>
    prevFields.map((field) =>
      field.id === id ? { ...field, values: { ...field.values, ['textfield7']: expAmount }} : field

    )
  )
   )
    // setExpectedAmount((+investmentAmount*(Math.pow((1 + _rate/100),_time))).toFixed(2))
    // console.log(Number(investmentAmount) *
                      // (Math.pow((1 + rate / 100), time)))
}
  const handleModalSubmit = (event) => {

   

    event.preventDefault();
    setStrategyNameError(false)
    setClientIdError(false)
    setTimePeriodError(false)
    setSixMonReturnsError(false)
    setOneYrReturnsError(false)
    setIndustryNameError(false)
    setThreeYrReturnsError(false)
    setInvestmentAmountError(false)
    setFiveYrReturnsError(false)
    setHelperText('')
// debugger
   let count = 0;

    formFields.map((fields)=>{
  
    if(fields.values['textfield1']===undefined){
        setStrategyNameError(true)
        count++
    }
    if(fields.values['textfield2']===undefined){
      setInvestmentAmountError(true)
      count++
    }
    if(fields.values['textfield3']===undefined){
      setSixMonReturnsError(true)
      count++
    }
    if(fields.values['textfield4']===undefined){
        setOneYrReturnsError(true)
        count++
    }
    if(fields.values['textfield5']===undefined){
      setThreeYrReturnsError(true)
      count++
    }
    if(fields.values['textfield6']===undefined){
      setFiveYrReturnsError(true)
      count++
  }
  
  if(fields.values['textfield7']===undefined){
    setExpectedAmountError(true)
    count++
  }
  if(fields.values['textfield8']===undefined){
    setIndustryNameError(true)
    count++
}
  }
   )
    // if (strategyName === "") {
    //   setStrategyNameError(true)
    //   count++
    // }
    // if (clientId === "") {
    //   setClientIdError(true)
    //   count++
    // }
    // if (investmentId === "") {
    //   setInvestmentIdError(true)
    //   count++
    // }
    // if(Status===''){
    //   setStatusError(true)
    //   count++
    // }
    // if (investmentAmount === "") 
    // if(formFields.values['textfield1']==='')
    // {
    //   setInvestmentAmountError(true)
    //   count++
    // }
    // if (expectedAmount === "") {
    //   setExpectedAmountError(true)
    //   count++
    // }
    // if (timePeriod === '') {
    //   setTimePeriodError(true)
    //   count++
    // }
    // if (sixMonReturns === "") {
    //   setSixMonReturnsError(true)
    //   count++
    // }
    // if (oneYrReturns === "") {
    //   setOneYrReturnsError(true)
    //   count++
    // }
    // if (threeYrReturns === "") {
    //   setThreeYrReturnsError(true)
    //   count++
    // }
    // if (fiveYrReturns === "") {
    //   setFiveYrReturnsError(true)
    //   count++
    // }
    if (count > 0) {
      return
    }
    let nameArray=[]
    formFields.map((fields)=>{
      if(fields.values['textfield1']){
        nameArray.push(fields.values['textfield1'])
       }
    })
    let uniqueSet = new Set(nameArray);
    if(nameArray.length !== uniqueSet.size){
        setHelperText('Duplicate Stocks are not Allowed')
        nameArray=[]
        // setStrategyName('')
        return
    } 
    // if(investmentAmount<=100){
    //   setHelperText("Investment Amount should be greater than 100")
    //   return
    // }
    let sum=0
    formFields.map((fields)=>{
      let value= +fields.values['textfield2']
      sum+= value
    })
    if(sum>clientAmount){
      setHelperText(`Client Amount(Rs.${clientAmount}) is less than investment Amount.(Rs.${sum})`)
      setTimeout(setHelperText,5000,'')
      return
    }
    let strategyData=[]
    formFields.map((fields)=>{
      let object={
        "strategyId": "string",
        "investmentId": investmentId,
        "investmentAmount": fields.values['textfield2'],
        "expectedAmount": fields.values['textfield7'],
        "investmentName": fields.values['textfield1'],
        "clientId": clientId,
        "advisorId": advisorId,
        "returnPercentage": 10,
        "returnPercentageAfter6months": fields.values['textfield3'],
        "industry": fields.values['textfield8'],
        "returnPercentageAfter1year": fields.values['textfield4'],
        "returnPercentageAfter3year": fields.values['textfield5'],
        "returnPercentageAfter5year":fields.values['textfield6'],
        "status": "string",
        "timePeriod": timePeriod,
        "remarks": "string",
        "completed": true
      }
      strategyData.push(object)
    })
   
    // if(investmentAmount>remainingAmount){
    //   setHelperText("Balance is less than investment Amount")
    //   return
    // }

    // const strategyData = {
      // "strategyId": "string",
      // "investmentId": investmentId,
      // "investmentAmount": investmentAmount,
      // "expectedAmount": expectedAmount,
      // "investmentName": strategyName,
      // "clientId": clientId,
      // "advisorId": advisorId,
      // "returnPercentage": 10,
      // "returnPercentageAfter6months": sixMonReturns,
      // "returnPercentageAfter1year": oneYrReturns,
      // "returnPercentageAfter3year": threeYrReturns,
      // "returnPercentageAfter5year": fiveYrReturns,
      // "status": "string",
      // "timePeriod": timePeriod,
      // "remarks": "string",
      // "completed": true
    // }


setLoading(true)
  axios({
    method: 'post',
    url: 'https://investmentportal.azurewebsites.net/api/strategies/Add?api-version=1',
    data: strategyData
  }).then((response) => {
    console.log(response)
    setMessage(response.data.message)
    handleInvestmentCall()
    setSnackOpen(true)
    setTimeout(handleSnackClose,2000)
    setLoading(false)
    handleClose()
    if (response.data.message = "Strategy added successfully.") {
      setStrategyName('')
      setClientId('')
      setSixMonReturns('')
      setOneYrReturns('')
      setThreeYrReturns('')
      setFiveYrReturns('')
      setTimePeriod('')
      setAmount('')
      setExpectedAmount('')
      setInvestmentAmount('')
      

    }
  }, (error) => {
    console.log(error)
    setLoading(false)
   if(error.response.data.message==='Sum of strategy amounts does not match the investment amount.'){
    setHelperText(`Balance (Rs.${clientAmount-sum}) left for investment `)
    setTimeout(setHelperText,5000,'')
    return
   }
    setMessage(error.response.data.message)
  })


  }



  const [reportListOfRequests, setReportListOfRequests] = useState([])
  const [modal, setModal] = useState(false);
  const [totalRequests,setTotalRequests]=useState(0)
  const [totalHighRiskRequest,setTotalHighRiskRequest]=useState(0)
  const [totalLowRiskRequest,setTotalLowRiskRequest]=useState(0)
  const [totalMediumRiskRequest,setTotalMediumRiskRequest]=useState(0)
  const [totalConsultationRequest,setTotalConsultationRequest]=useState(0)
  let flag=[]
  // const initialized = React.useRef(false);
  const [Length,setLength]=useState(0)
  const handleInvestmentCall = () => {
    setDashboardLoading(true)
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/investments/advisor/${advisorId}?api-version=1`
    }).then((response) => {
      //debugger
      // dashboardLoading=false
      setRequestLoading(false)
      setDashboardLoading(false)
      let list = response.data
      setLength(list.length)
      setTotalRequests(list.length)
      let _highRisk = list.filter(x=>x.investmentType==="High Risk").length;
      let _lowRisk = list.filter(x=>x.investmentType==="Low Risk").length;
      let _mediumRisk = list.filter(x=>x.investmentType==="Medium Risk").length;
      let _needConsultation = list.filter(x=>x.investmentType==="Need Consultation").length;
      setTotalHighRiskRequest(_highRisk)
      setTotalLowRiskRequest(_lowRisk)
      setTotalMediumRiskRequest(_mediumRisk)
      setTotalConsultationRequest(_needConsultation)
      setReportListOfRequests(response.data);
      
      if(_highRisk > 0)
      {   const _fourthCard=document.querySelector('.fourthCard')

      !!_fourthCard && (_fourthCard.classList.add('addPointer') ||  
      _fourthCard.addEventListener('click',function() {
        
        _fourthCard.classList.toggle("addBorder");
          if(!flag.includes("High Risk")){
            
            flag.push("High Risk");
            setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
          }
          else{
            flag = flag.filter(item => item !== "High Risk");
            if(flag.length === 0)
            setReportListOfRequests(list)
            else
            setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
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
      setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
    }
    else{
      flag = flag.filter(item => item !== "Low Risk");
      if(flag.length === 0)
      setReportListOfRequests(list)
      else
      setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
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
      setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
    }
    else{
      flag = flag.filter(item => item !== "Medium Risk");
      if(flag.length === 0)
      setReportListOfRequests(list)
      else
      setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
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
    setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
  }
  else{
    flag = flag.filter(item => item !== "Need Consultation");
    if(flag.length === 0)
    setReportListOfRequests(list)
    else
    setReportListOfRequests(list.filter(x=> flag.includes(x.investmentType)))
  }
}))
}
      // ////debugger;
      // console.log(reportListOfRequests)
      console.log(response.data)

    }, (error) => {
      if(error.response.data.title==='Not Found'){
        setLength(0)
        setTotalRequests(0)
        setTotalHighRiskRequest(0)
      setTotalLowRiskRequest(0)
      setTotalMediumRiskRequest(0)
      setTotalConsultationRequest(0)
      }
      setDashboardLoading(false)
      setRequestLoading(false)
      
 })

  }
  useEffect(() => {
    // ////debugger
    handleInvestmentCall()
  }, [])
  return (
    <div className='portfolio'>
      {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleOpen}  style={{ margin: '0 0 0 0' }}>
        Add Strategy
      </Button>
    </div> */}
    <Snackbar 
      anchorOrigin={{  vertical: 'bottom',
      horizontal: 'right', }}
      open={snackOpen} 
      autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Strategy Added Successfully!
        </Alert>
      </Snackbar>
      <Modal
       
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <CloseIcon sx={{color:'#4b49ac'}}onClick={handleClose} style={{ cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
           <><Typography className='text1' color='#4b49ac' id="modal-modal-title" variant="h6" component="h2">
            Create New Strategy For Client
          </Typography>
            {/* <Grid container spacing={2}>
             

            </Grid> */}
           
            {formFields.map((field) => (
        <div key={field.id} className='formContainer'> 
          {/* <TextField
            label="Textfield 1"
            variant="outlined"
            fullWidth
            value={field.values['textfield1'] || ''}
            onChange={(e) => handleInputChange(field.id, 'textfield1', e.target.value)}
          /> */}
          {field.id!==1?<IconButton className='remove' onClick={() => removeFields(field.id)}>
            <CloseIcon color="error" />
          </IconButton>:''}
           <Grid container spacing={1} >
           <Grid item xs={2}
          //  xs={12}
            // sm={6}
            >
            <TextField sx={{color:'#4b49ac'}}

              margin="dense"
              autoComplete="given-name"
              name="strategyName"
              required
              fullWidth
              disabled
              value={investmentId}
              error={investmentIdError}
              // onChange={e => setInvestmentId(e.target.value)}
              id="strategyName"
              label="Investment ID"
              autoFocus
              />
              </Grid>
              
              <Grid item xs={2}
              // xs={12} sm={6}
              >
                <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  required
                  fullWidth
                  id="clientId"
                  disabled
                  label="Client ID"
                  name="clientId"
                  value={clientId}
                  error={clientIdError}
                  onChange={e => setClientId(e.target.value)}

                />
              </Grid>
              <Grid item xs={2}
              // xs={12} sm={6}
              >
                
              <FormControl margin='dense' required fullWidth>
                  <InputLabel id="demo-simple-select-label">Stock Name</InputLabel>
                  <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Stock Name"
                    // value={strategyName}
                    error={strategyNameError}
                    value={field.values['textfield1'] || ''}
                    onChange={(e) => {
            
                    handleInputChange(field.id, 'textfield1', e.target.value)}}
                    // onChange={e => setStrategyName(e.target.value)}
                    onBlur={e=>handleReturns(field.id,field.values['textfield1'] ,timePeriod)}
                    // onBlur={e=>handleReturns(strategyName,timePeriod)}
                  >
                
                   { data.map((row)=>
                      
                
                    <MenuItem value={row.startegyName}>{row.startegyName}</MenuItem>
                    
                   )}
                    

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}
              // xs={12} sm={6}
              >
                
              <TextField sx={{color:'#4b49ac'}}

                    margin="dense"
                    autoComplete="given-name"
                    name="timePeriod"
                    required
                    fullWidth
                    disabled
                    error={timePeriodError}
                    value={timePeriod}
               
                    onChange={e => setTimePeriod(e.target.value)}
                    id="timePeriod"
                    label="Time Period"
                    autoFocus
                    className='termSelected'
                    />
              </Grid>
                    
            
            <Grid item xs={2}>
            <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  required
                  fullWidth
                  type='number'
                  id="investmentAmount"
                  label="Investment Amount"
                  name="investmentAmount"
                  // value={investmentAmount}
                  error={investmentAmountError}
                  value={field.values['textfield2'] || ''}
                  onChange={(e) => {
          
                  handleInputChange(field.id, 'textfield2', e.target.value)}}
                  // onChange={e => {
                
                  //   setInvestmentAmount(e.target.value)
                    
                  // }}
                  onBlur={e=>handleCalculations(field,field.id,field.values['textfield2'] )}
                  // onBlur={e=>handleCalculations(investmentAmount)}


                />
</Grid>
           

          

            
              <Grid item xs={2}
              // xs={12} sm={6}
              >
                <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  autoComplete="given-name"
                  name="6m Returns"
                  required
                  fullWidth
                  disabled
                  // value={sixMonReturns}
                  error={sixMonReturnsError}
                  value={field.values['textfield3'] || ''}
                  // onChange={(e) => {
          
                  // handleInputChange(field.id, 'textfield3', e.target.value)}}
                  // onChange={e => setSixMonReturns(e.target.value)}
                  id="6m"
                  label="6m Returns(%)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={2}
              //  xs={12} sm={6}
               >
                <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  required
                  fullWidth
                  id="1yr"
                  disabled
                  label="1yr Returns(%) "
                  name="1yr"
                  // value={oneYrReturns}
                  value={field.values['textfield4'] || ''}
                  // onChange={(e) => {
          
                  // handleInputChange(field.id, 'textfield4', e.target.value)}}
                  error={oneYrReturnsError}
                  // onChange={e => setOneYrReturns(e.target.value)}

                />
              </Grid>

          
              <Grid item xs={2}
              // xs={12} sm={6}
              >
                <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  autoComplete="given-name"
                  name="3yr"
                  required
                  fullWidth
                  disabled
                  // value={threeYrReturns}
                  value={field.values['textfield5'] || ''}
                  // onChange={(e) => {
          
                  // handleInputChange(field.id, 'textfield5', e.target.value)}}
                  error={threeYrReturnsError}
                  // onChange={e => setThreeYrReturns(e.target.value)}
                  id="3yr"
                  label="3yr Returns(%)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={2}
              // xs={12} sm={6}
              >
                <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  required
                  fullWidth
                  id="5yr"
                  disabled
                  label="5yr Returns(%)"
                  name="5yr"
                  // value={fiveYrReturns}
                  error={fiveYrReturnsError}
                  value={field.values['textfield6'] || ''}
                  // onChange={(e) => {
          
                  // handleInputChange(field.id, 'textfield6', e.target.value)}}
                  // onChange={e => setFiveYrReturns(e.target.value)}

                />
              </Grid>
              <Grid item xs={2}>
                    <TextField sx={{color:'#4b49ac'}}

                      margin="dense"
                      autoComplete="given-name"
                      name="strategyName"
                      required
                      fullWidth
                      disabled
                      // value={expectedAmount}
                      error={expectedAmountError}
                      
                      value={field.values['textfield7'] || ''}
                      // onChange={e => setExpectedAmount(e.target.value)}
                      id="strategyName"
                      label="Expected Amount"
                      autoFocus
                      />
</Grid>
<Grid item xs={2}
              // xs={12} sm={6}
              >
                <TextField sx={{color:'#4b49ac'}}

                  margin="dense"
                  autoComplete="given-name"
                  name="industryName"
                  required
                  fullWidth
                  disabled
                  // value={threeYrReturns}
                  value={field.values['textfield8'] || ''}
                  // onChange={(e) => {
          
                  // handleInputChange(field.id, 'textfield5', e.target.value)}}
                  error={industryNameError}
                  // onChange={e => setThreeYrReturns(e.target.value)}
                  id="industryName"
                  label="Industry"
                  autoFocus
                />
              </Grid>
</Grid>
          
          {/* <TextField
            label="Textfield 2"
            variant="outlined"
            fullWidth
            value={field.values['textfield2'] || ''}
            onChange={(e) => handleInputChange(field.id, 'textfield2', e.target.value)}
          />
          <TextField
            label="Textfield 3"
            variant="outlined"
            fullWidth
            value={field.values['textfield3'] || ''}
            onChange={(e) => handleInputChange(field.id, 'textfield3', e.target.value)}
          />
          <Select
            label="Dropdown"
            variant="outlined"
            fullWidth
            value={field.values['dropdown'] || ''}
            onChange={(e) => handleInputChange(field.id, 'dropdown', e.target.value)}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
        
          </Select>
          <TextField
            label="Textfield 4"
            variant="outlined"
            fullWidth
            value={field.values['textfield4'] || ''}
            onChange={(e) => handleInputChange(field.id, 'textfield4', e.target.value)}
          />
          <TextField
            label="Textfield 5"
            variant="outlined"
            fullWidth
            value={field.values['textfield5'] || ''}
            onChange={(e) => handleInputChange(field.id, 'textfield5', e.target.value)}
          /> */}
  
          
        </div>
      ))}

     

            {/* <DynamicTextFieldForm/> */}
  
        
            {helperText? <Alert severity='error' >* {helperText}</Alert>:''}
            {loading?<Button  sx={{backgroundColor:'#4b49ac',marginTop:'5px',float:'right' }} variant="contained">
               Creating.... <i class="fa fa-spinner fa-spin"></i> </Button>:
            <Button  sx={{backgroundColor:'#4b49ac',marginTop:'5px',float:'right'}} variant="contained" 
            onClick={handleModalSubmit}>Create Strategy</Button>
            }
               {loading?"": <Button variant="contained" sx={{float:'right', backgroundColor:'#4b49ac',marginTop:'5px',marginRight:'2px'}} onClick={addFields}>
         Add New Field 
      </Button>}
            </>
        </Box>
      </Modal>
      
      {requestLoading?<>
        <div className='card-container'>
                <Card  color="firstCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="fourthCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
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
        </div></> :  (
      <>
      <div className='card-container'>
                <Card  color="firstCard" heading="Number of Investments" number={totalRequests}/>
                <Card color="fourthCard"  heading="Total High Risk Investments" number={totalHighRiskRequest}/>
                <Card color="SixthCard" heading="Total Low Risk Investments" number={totalLowRiskRequest}/>
                <Card color="secondCard" heading="Total Medium Risk Investments" number={totalMediumRiskRequest}/>
                
                <Card color="thirdCard" heading="Total Consultation Investments" number={totalConsultationRequest}/>


                

          </div>
      <div className="rectangle-div">
{Length===0?<TableContainer component={Paper}>
      <Table size='small' aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px' ,fontWeight: 'bold', backgroundColor: '#4b49ac'}}>Client Id</TableCell>
            <TableCell align='center' sx={{ color: 'white',fontWeight: 'bold', fontSize: '16px' , backgroundColor: '#4b49ac'}}>Date</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Amount</TableCell>
            <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Balance</TableCell>
            <TableCell  sx={{ color: 'white',fontWeight: 'bold', fontSize: '16px', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
            <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Type</TableCell>
            <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Status</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
 
            <React.Fragment >
              <TableRow>
                <TableCell
                sx={{ textAlign: "center"}} 
                 colSpan={7}>No Investment Requests</TableCell>
              </TableRow>
            </React.Fragment></TableBody></Table></TableContainer>:
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
                sx={{width: '100%',margin: '0'}}
                 disableRowSelectionOnClick
                 disableColumnSelector
                getRowId={(reportListOfRequests) => reportListOfRequests.investmentID}
        rows={reportListOfRequests}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      </Box>
}

      {/* <TableContainer component={Paper}>
      <Table size='small' aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px' ,fontWeight: 'bold', backgroundColor: '#4b49ac'}}>Client Id</TableCell>
            <TableCell align='center' sx={{ color: 'white',fontWeight: 'bold', fontSize: '16px' , backgroundColor: '#4b49ac'}}>Date</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Amount</TableCell>
            <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Balance</TableCell>
            <TableCell  sx={{ color: 'white',fontWeight: 'bold', fontSize: '16px', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
            <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Type</TableCell>
            <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Status</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
          Length === 0 ? 
            <React.Fragment >
              <TableRow>
                <TableCell
                sx={{ textAlign: "center"}} 
                 colSpan={7}>No Investment Requests</TableCell>
              </TableRow>
            </React.Fragment> :


          reportListOfRequests?.map((row) =>

            <React.Fragment >
              <TableRow>
                <TableCell>{row.investmentID}</TableCell>
                <TableCell>{row.clientId}</TableCell>
                <TableCell sx={{padding:"0px", width:'73px'}} >{row.createdDate.slice(0, 10)}</TableCell>
                <TableCell align='center'>{row.investmentAmount}</TableCell>
                <TableCell>{row.remainingAmount}</TableCell>
                <TableCell align='center'>{row.timePeriod}</TableCell>
               
                  <TableCell align='center' sx={{padding:"0px"}}>
                  {row.investmentType==='Low Risk'?<Tooltip title='Low Risk' placement='right-end'><img className='table-img' src={lowRisk}/></Tooltip>
                  :(row.investmentType==='High Risk'?<Tooltip title='High Risk' placement='right-end'><img className='table-img' src={highRisk}/></Tooltip>
                  :(row.investmentType==='Medium Risk'?<Tooltip title='Medium Risk' placement='right-end'><img className='table-img' src={mediumRisk}/></Tooltip>
                  :<Tooltip title='Need Consultation' placement='right-end'><HelpIcon className='table-img' sx={{color:'green'}}></HelpIcon></Tooltip>)
                   )}</TableCell>
                <TableCell align='center' className={row.status} sx={{padding:'0px',width:'108px'}}>{row.status}</TableCell>
                <TableCell align='center'>
               <Tooltip title='Create Strategy' placement='right-end'> <Button onClick={()=>handleOpen(row)}>
                
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </Button></Tooltip>
                </TableCell>
              </TableRow>
            </React.Fragment>

          )

          }
        </TableBody></Table></TableContainer> */}
    
       
        </div></>)
      
      }
       
      
    </div>
  );
}

function PastInvestments({ advisorId ,setDashboardLoading }) {


  // const handleEvent = (
  //   params,  // GridRenderedRowsIntervalChangeParams
  //   event,   // MuiEvent<{}>
  //   details, // GridCallbackDetails
  // ) => {alert('hi')}

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleTextClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const columns = [
    { field: 'strategyId', width:180, headerName: '#',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header',
    renderCell: (params) =>params.row.strategyId.replace('STR', 'STO') },
    { field: 'investmentName', width:150 , headerName: 'Stock Name',headerClassName: 'super-app-theme--header', },
    { field: 'clientId', width:150 , headerName: 'Client Id',headerClassName: 'super-app-theme--header', },
    { field: 'investmentAmount', width:150, headerName: 'Amount',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header', },
    
    { field: 'status', width:170, headerName: 'Status',backgroundColor: '#4b49ac' ,headerClassName: 'super-app-theme--header', },
    {field: 'action',
    headerName: 'Action',
    headerClassName: 'super-app-theme--header',
    disableColumnMenu:true ,
    sortable: false,
    width: 131,
    editable: true,
    renderCell: (params) =>
    <FormControl required fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
        size="small"
        margin="normal"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Status"
        // value={Status}
      
        onChange={e=>{handleChange(params.row.strategyId,e.target.value)}}
      >
         
        <MenuItem value={'Funded'}>Funded</MenuItem>
       
  
  
      </Select>
     </FormControl>
  //   <>
  //  {!isDropdownVisible && <Typography onClick={handleTextClick} style={{ cursor: 'pointer' }}>
  //   Approved
  // </Typography>}
  //  {isDropdownVisible && (
  //   // <FormControl required fullWidth>
  //   // <InputLabel id="demo-simple-select-label">Status</InputLabel>
  //   <Select
  //     size="small"
  //     margin="normal"
  //     labelId="demo-simple-select-label"
  //     id="demo-simple-select"
  //     label="Status"
  //     // value={Status}
    
  //     onChange={e=>{handleChange(params.row.investmentID,e.target.value)}}
  //   >
       
  //     <MenuItem value={'Funded'}>Funded</MenuItem>
     


  //   </Select>
  // // </FormControl>
  // )}</>
    }
  ]
  const [listOfApprovedInv,setListOfApprovedInv]=useState([])
  const [actionArray,setActionArray]=useState([])
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [actionLoading,setActionLoading]=useState(false)
  const [newLoading,setNewLoading]=useState(false)
  const [length,setLength]=useState(0)
  const [visible,setVisible]=useState(false)
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const handleChange=(investmentId,status)=>{
    debugger
    status==='Funded'?setVisible(true):setVisible(false)
   
    const actionObj ={
      strategyId:investmentId,
     status:status,
     remarks: "string"
    }
    if(status===''){
      let updatedArray = actionArray.filter(item=>item!==actionObj)
      setActionArray([updatedArray])
      console.log(actionArray)
    }
    else{
      setActionArray([...actionArray,actionObj])
      console.log(actionArray)
    }
    
    
    

}
const handleSave=()=>{
  if(actionArray.length===0){
    return
  }
  setActionLoading(true)
  axios({
    method:'put',
    url:`https://investmentportal.azurewebsites.net/api/strategies/Update-Multiple-by-Advisor?api-version=1`,
    data:actionArray
  }).then((response)=>{
  
  console.log(response)
  setActionLoading(false)
  if(response.data.message==="Multiple strategies updated successfully."){
  setSnackOpen(true)}
  setActionArray([])
  setVisible(false)
  handleFundedCall()

  },(error)=>{
  console.log(error)
  setActionLoading(false)
setVisible(false)
  })
}
const handleFundedCall=()=>{
  setDashboardLoading(true)
  axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/strategies/${advisorId}/approved-strategies?api-version=1`
  }).then((response)=>{
    console.log(response.data)
    const list = response.data.approvedStrategies
    setListOfApprovedInv(list)
    setLength(list.length)
    setDashboardLoading(false)
    setVisible(false)
    setNewLoading(false)
  },(error)=>{
    setNewLoading(false)
    setDashboardLoading(false)
    setLength(0)
    setVisible(false)
  })
}

  useEffect(()=>{
  setNewLoading(true)
  setDashboardLoading(true)
  handleFundedCall();
    // axios({
    //   method:'get',
    //   url:`  https://investmentportal.azurewebsites.net/api/investments/approved/${advisorId}?api-version=1`
    // }).then((response)=>{
    //   console.log(response.data)
    //   setNewLoading(false)
    //   setListOfApprovedInv(response.data)
    //   setDashboardLoading(false)
      
    // },(error)=>{
    //   setNewLoading(false)
    //   setDashboardLoading(false)
    // })
  },[])

  return  (
  <>
  
  {newLoading ? <div className='rectangle-div'>
  <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
  </div>
  
  :<>
  <div className="rectangle-div">

    {length===0?
     <TableContainer component={Paper}>
     <Table size='small' aria-label="simple table" id="AdvisorClientTable">
       <TableHead>
         <TableRow >
           <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
           <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Client Id</TableCell>
           <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac',width: '184px' }}>Amount</TableCell>
           <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' ,padding:'0px' }}>Type</TableCell>

           <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac',width:'140px' }}></TableCell>

         </TableRow>
       </TableHead>
       <TableBody>
        
       <React.Fragment >
         <TableRow>
           <TableCell
           sx={{ textAlign: "center"}} 
            colSpan={4}>No Recent Approved Investment</TableCell>
         </TableRow>
       </React.Fragment></TableBody></Table></TableContainer>
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
                // renderedRowsIntervalChange={()=>handleEvent()}

                disableColumnMenu
                disableColumnSelector
                disableRowSelectionOnClick
                getRowId={(listOfApprovedInv) => listOfApprovedInv.strategyId}
        rows={listOfApprovedInv}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5,10]}
      />
      </Box>}

    {/* <TableContainer component={Paper}>
          <Table size='small' aria-label="simple table" id="AdvisorClientTable">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Client Id</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac',width: '184px' }}>Amount</TableCell>
                <TableCell  sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' ,padding:'0px' }}>Type</TableCell>

                <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac',width:'140px' }}></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {length === 0 ? 
            <React.Fragment >
              <TableRow>
                <TableCell
                sx={{ textAlign: "center"}} 
                 colSpan={4}>No Recent Approved Investment</TableCell>
              </TableRow>
            </React.Fragment> :
              
              listOfApprovedInv?.map((row) =>
                <React.Fragment>
                  <TableRow>
                    <TableCell>
                      {row.investmentID}
                    </TableCell>
                    <TableCell>{row.clientId}</TableCell>
                    <TableCell>{row.investmentAmount}</TableCell>
                    <TableCell sx={{padding:"0px"}}>
                  {row.investmentType==='Low Risk'?<Tooltip title='Low Risk' placement='right-end'><img className='table-img' src={lowRisk}/></Tooltip>
                  :(row.investmentType==='High Risk'?<Tooltip title='High Risk' placement='right-end'><img className='table-img' src={highRisk}/></Tooltip>
                  :(row.investmentType==='Medium Risk'?<Tooltip title='Medium Risk' placement='right-end'><img className='table-img' src={mediumRisk}/></Tooltip>
                  :<Tooltip title='Need Consultation' placement='right-end'><HelpIcon className='table-img' sx={{color:'green'}}></HelpIcon></Tooltip>)
                   )}</TableCell>
                    <TableCell><FormControl required fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              size="small"
              margin="normal"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              // value={Status}
            
              onChange={e=>{handleChange(row.investmentID,e.target.value)}}
            >
               <MenuItem value={''}>No Change</MenuItem>
              <MenuItem value={'Funded'}>Funded</MenuItem>
             


            </Select>
          </FormControl></TableCell>

                  </TableRow></React.Fragment>

              )}


            </TableBody></Table></TableContainer> */}
    </div>

       {visible?<>{length === 0? "":<>{ actionLoading?<Button className='save' sx={{backgroundColor:'#1BCFB4'
          }} variant="contained" >Submitting... 
          <i class="fa fa-spinner fa-spin"></i>
          </Button>
          :
          <Button className='save' sx={{backgroundColor:'#1BCFB4'
          }} variant="contained" onClick={()=>handleSave()}>Save Changes</Button>}

      </>} </>:''} </> }   
    <Snackbar 
    anchorOrigin={{  vertical: 'bottom',
    horizontal: 'right', }}
    open={snackOpen} 
    autoHideDuration={6000} onClose={handleSnackClose}>
      <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
        Changes Updated Successfully!
      </Alert>
    </Snackbar>
    
    </>
    )

}

function SettingsContent({ advisorId , setDashboardLoading }) {

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [phone, setPhone] = useState('')
  // const [city, setCity] = useState('')
  // const [State, setState] = useState('')
  // dashboardLoading=true
  const [address, setAddress] = useState('')
  // const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  // const [passwordError, setPasswordError] = useState(false)
  const [loading,setLoading]=useState(false)
  const [phoneHelperText,setphoneHelperText]=useState('')
  const phoneNumberPattern = /^\+[0-9](?:[0-9] ?|-){11,13}[0-9]$/;
  const [settingsLoading,setSettingsLoading]=useState(true)
  const [advisorData,setAdvisorData]=useState({})
  const [updatedAdvisorData,setUpdatedAdvisorData]=useState({})
  const [editVisible,setEditVisible]=useState(true)
  const [backVisible,setBackVisible]=useState(true)
  const handleMessage=()=>{
    setMessage("User Information Updated Successfully.")
     setTimeout(setMessage,2000,"")
  }

  const handleChange = (el) => {
    //debugger
    let inputName = el.target.name;
    let inputValue = el.target.value;
   
    let statusCopy = Object.assign({}, updatedAdvisorData);
    statusCopy[inputName] = inputValue;
   
    setUpdatedAdvisorData(statusCopy);
  }

  const ProfileBack = (el) => {
    setUpdatedAdvisorData(advisorData);
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setAddressError(false)
    setCityError(false)
    setStateError(false)
    setPhoneError(false)
    
    
  }

  const handleBack=()=>{
    ProfileBack()
    setEditVisible(true)
    setDisabled(true)
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
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    // Inside the useEffect, you can make the axios request
    setDashboardLoading(true)
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/${advisorId}?api-version=1`
    })
      .then((response) => {
        setAdvisorData(response.data.advisor)
        setUpdatedAdvisorData(response.data.advisor)
        console.log(advisorData)
        // dashboardLoading=false
        // setFirstName(advisorData.firstName);
        // setLastName(advisorData.lastName);
        // setEmail(advisorData.email);
        // setPhone(advisorData.phoneNumber);
        // setAddress(advisorData.address);
        // setCity(advisorData.city);
        // setState(advisorData.state);
        // setPassword(advisorData.confirmPassword);
        setDashboardLoading(false)
        setSettingsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
        setDashboardLoading(false)
      });
  }, []);
  const [disabled, setDisabled] = useState(true)
  const handleEdit = () => {
    setDisabled(false)
    setEditVisible(false)
  }

  const handleUpdate = () => {
    //debugger
    console.log(1)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setPhoneError(false)
    setAddressError(false)
    setCityError(false)
    setStateError(false)
    setphoneHelperText('')
    // setPasswordError(false)
    let count = 0;
    if (updatedAdvisorData.firstName === '') {
      setFirstNameError(true)
      count++
    }
    if (updatedAdvisorData.lastName === '') {
      setLastNameError(true)
      count++
    }
    if (updatedAdvisorData.email === '') {
      setEmailError(true)
      count++
    }
    if (updatedAdvisorData.phoneNumber === '') {
      setPhoneError(true)
      count++
    }
    if (updatedAdvisorData.address === '') {
      setAddressError(true)
      count++
    }
    if (updatedAdvisorData.city === '') {
      setCityError(true)
      count++
    }
    if (updatedAdvisorData.state === '') {
      setStateError(true)
      count++
    }
    // if (updatedAdvisorData.confirmPassword === '') {
    //   setPasswordError(true)
    //   count++
    // }
    if (count > 0) {
      return
    }

  
      // if(!updatedAdvisorData.phoneNumber.match(phoneNumberPattern)){
      //   setphoneHelperText('Invalid Mobile Number')
      //   return
      // }
    
    console.log(2)
    // const updateData = {
    //   "firstName": firstName,
    //   "lastName": lastName,
    //   "email": email,
    //   "password": password,
    //   "phoneNumber": phone,
    //   "address": address,
    //   "city": city,
    //   "state": State,
    //   "pinCode": "123456"
    // }
    //updatedAdvisorData.pinCode = "123456";
    setLoading(true)
    setBackVisible(false)
    setDashboardLoading(true)
      axios({
        method: 'put',
        url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/update/${advisorId}?api-version=1`,
        data: updatedAdvisorData
      }).then((response) => {
        console.log(response)
        setLoading(false)
        if (response.data.message === "Advisor information updated successfully.") {
          console.log(updatedAdvisorData)
          //debugger
          setAdvisorData(updatedAdvisorData)
          setDisabled(true)
          setEditVisible(true)
          setBackVisible(true)
          setDashboardLoading(false)
          handleMessage()
          setphoneHelperText('')

        }
  
  
      }, (error) => {
       setLoading(false)
       setBackVisible(true)
  setDashboardLoading(false)
      })

    
    
  }
  return (<>

    {settingsLoading ?<div className="settings-container">
        {/* <LoadingSpinner /> */}
        <Skeleton variant="circular" width={100} height={100} />
<br></br>
<Skeleton variant="rectangular" width={400} height={100} />
<br></br>
<Skeleton variant="rounded" width={400} height={100} />
        </div>:<div className="settings-container">
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
              value={updatedAdvisorData.firstName}
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
              value={updatedAdvisorData.lastName}
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
              value={updatedAdvisorData.email}
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
              value={`+${updatedAdvisorData.phoneNumber}`}
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
          value={updatedAdvisorData.address}
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
              value={updatedAdvisorData.city}
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
              value={updatedAdvisorData.state}
              error={stateError}
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
      {message?<Alert severity='success'>{message}</Alert>:''}
      <Modal
       
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
          <CloseIcon sx={{color:'#4b49ac'}} onClick={handleClose} style={{ cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Advisor information updated successfully.
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
       {backVisible && <Button sx={{backgroundColor:'#4b49ac', marginTop:'8px'}} onClick={()=>handleBack()} variant='contained' >Go Back</Button>}
    </>
      }
        
        
        
        
        
    
        {/* {loading?<Button variant='contained' style={{ color: 'green', backgroundColor: 'green' }}></Button>:<Button onClick={()=>handleUpdate()} style={{ color: 'green', backgroundColor: '#fff' }}>Update</Button>} */}
      </div>
    </div>
}
  </>
  );
}

export default Dashboard;
