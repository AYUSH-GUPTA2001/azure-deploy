import * as React from 'react'
import { useEffect, useState } from "react";
import './AdvisorDashboard.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
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

import Navbar from '../Navbar/Navbar';
import { LocationCitySharp } from '@mui/icons-material';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Skeleton } from '@mui/lab';
import Card from '../Card/Card';
function Dashboard() {
  // //debugger
  console.log("tester")
  const { advisorId } = useParams()

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [loading,setLoading]=useState(true)
 
  useEffect(() => {
// debugger
    const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
// const searchBtn = body.querySelector(".search-box");
const content = body.querySelector(".content");
const materialicons = body.querySelectorAll(".Customicons");
const navLinks = document.querySelectorAll('.nav-link a span')
// const modeText = body.querySelector(".mode-text");
// debugger


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
      // //debugger
      let advisor=response.data.advisor
      setFirstName(advisor.firstName)
      setLastName(advisor.lastName)
     setLoading(false)
  
    }, (error) => {
      console.log(error)
      setLoading(false)
    })
  }, [])

  const handleLogout=()=>{
    navigate('/advisor')
  }
  const handleOptionClick = (option) => {
     //debugger
    setSelectedOption(option);
  };


  const [selectedOption, setSelectedOption] = useState('ClientList');

  return (<>
  
    <div className="investorDashboard">
<div class="div-sidebar">
<nav class="sidebar">
    <header>
        <div class="image-text">
            <span class="image">
                <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="John Who" />
            </span>
            {loading?<div class="text header-text">
            <Skeleton variant="text" sx={{ width:'160px', fontSize: '3rem' }} />
            </div>:<div class="text header-text">
                <span class="name">{firstName + ' '+ lastName}</span>
                <span class="profession">Advisor:{advisorId}</span>
            </div>}
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
                <a id={selectedOption === 'Settings' ? 'iactiveanchor' : ''} onClick={() => handleOptionClick('Settings')}>
                <i id={selectedOption === 'Settings' ? 'iactive' : ''} className="material-icons Customicons">settings</i>
              <span  id={selectedOption === 'Settings' ? 'iactiveli' : ''} class="text nav-text">Settings</span>
              </a>
            </li>
            </ul>
        </div>

        <div class="bottom-content">
            <li class="nav-link">
                <a>
                    <i class="Customicons fa fa-sign-out"></i>
                    <span onClick={()=>handleLogout()} class=" text nav-text">Logout</span>
                    </a>
            </li>
        </div>
    </div>
</nav>
</div>

      <div className="content inc-m-l">
        {selectedOption === 'ClientList' && <ClientList advisorId={advisorId} />}
        {selectedOption === 'InvestmentStrategies' && <InvestmentStrategies advisorId={advisorId} />}
        {selectedOption === 'InvestmentRequests' && <ReportsContent advisorId={advisorId} />}
        {selectedOption === 'Settings' && <SettingsContent advisorId={advisorId} />}
      </div>
    </div></>
  );
}

function InvestmentStrategies({ advisorId }) {
  // //debugger
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
  // const [data,setData]=useState([]);
  const [listOfStratgies, setListOfStrategies] = useState([])
  useEffect(() => {

    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/strategies/${advisorId}/By-AdvisorId?api-version=1`
    }).then(function (response) {
      const list = response.data.strategies
      setTotalInvAmount(list.map(x=> x.status === "Approved" ? x.investmentAmount : 0).reduce(function(a, b){
        return a + b;
      }));
      setTotalExpAmount(list.map(x=> x.status==="Approved"? x.expectedAmount:0).reduce(function(a, b){
        return a + b;
      }));
      setTotalStrategies(list.length)
      setTotalApproved(list.filter(x=> x.status== 'Approved').length)
      setTotalRejected(list.filter(x=> x.status== 'Rejected').length)
      setTotalPending(list.filter(x=> x.status== 'Pending').length)
     setLoading(false)

      setListOfStrategies(list)
      console.log(list)

    },
      function (error) {
        setLoading(false)
        console.log(error)
      })
  }, [])

function collapseRow(the)
{
  //debugger;
  let _strategyId = the.row.strategyId;
  //setOpen(!open);
  if(coll === _strategyId)
    _strategyId='';
  setColl(_strategyId);
}



  return (
    <div className="portfolio">

      {loading?<>
        <div className='card-container'>
                <Card color="firstCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />} />
                <Card color="secondCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="thirdCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                 number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="fourthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="fifthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="SixthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
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
                <Card color="secondCard"  heading="Total Amount Invested" number={totalInvAmount}/>
                <Card color="thirdCard" heading="Total Amount Expected" number={totalExpAmount}/>
                <Card color="fourthCard" heading="Total Approved Strategies" number={totalApproved}/>
                <Card color="fifthCard" heading="Total Rejected Strategies" number={totalRejected}/>
                <Card color="SixthCard" heading="Total Pending Strategies" number={totalPending}/>

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
            listOfStratgies?.map((row) => (
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
                  <TableCell ><Button sx={{ width: '100px', borderRadius: '20px' }} variant="contained" className={row.status}>{row.status}</Button></TableCell>
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
        </Table>
      </TableContainer>
    </div></>)}

      
    </div>
  );
}

function ClientList({ advisorId }) {
  //  //debugger
  const [listOfClients, setListOfClients] = useState([])
  const [loading,setLoading]=useState(true)
  const [totalClients,setTotalClients]=useState(0)
  useEffect(() => {
    // //debugger
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/clients-by-advisor/${advisorId}?api-version=1`
    }).then((response) => {
//debugger
      let list=response.data
      setTotalClients(list.length)
      setListOfClients(response.data)
      setLoading(false)
      

    }

      , (error) => { 
        setLoading(false)
        console.log(error) })
  }, [])

  // //debugger









  //   axios({
  //     method:'get',
  //     url:`https://localhost:7136/api/AdvisorSignUp/clients-by-advisor/${advisorId}`
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
  //     url:`https://localhost:7136/api/investments/client/${e.clientId}`
  //   }).then((response)=>{setListofInvestments([...listOfInvestments,response.data])},(error)=>{})


  // })


  //   useEffect(()=>{
  //     axios({
  //       method:'get',
  //       url:`https://localhost:7136/api/strategies/${advisorId}/By-AdvisorId`
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
                <Card color="firstCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
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
        <TableContainer component={Paper}>
          <Table size='small' aria-label="simple table">
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


            </TableBody></Table></TableContainer>

      </div></>)

}
      
      
    </div>
  )
}



function ReportsContent({ advisorId }) {
  ////debugger
  const [loading,setLoading]=useState(false)
  const [requestLoading,setRequestLoading]=useState(true)
  const extractBeforeSpace = (inputString) => {
    const match = inputString.split(" "); 
  
    return match[0]; 
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 440,
    bgcolor: '#e4f1ff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const [clientId, setClientId] = useState('')
  const handleOpen = (clientID,investmentID) => {
     setClientId(clientID);
     setInvestmentId(investmentID)
    setModalOpen(true);
  }
  const handleClose = () => {
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
    setStrategyNameError(false)
    setInvestmentAmountError(false)
    setExpectedAmountError(false)
    setTimePeriodError(false)
    setSixMonReturnsError(false)
    setOneYrReturnsError(false)
    setThreeYrReturnsError(false)
    setFiveYrReturnsError(false)
  };
  const [strategyName, setStrategyName] = useState('')
  const [investmentId, setInvestmentId] = useState('')
  const [amount, setAmount] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [expectedAmount, setExpectedAmount] = useState('')
  const [timePeriod, setTimePeriod] = useState("")
  // const [Status,setStatus]=useState('')
  const [sixMonReturns, setSixMonReturns] = useState('')
  const [oneYrReturns, setOneYrReturns] = useState('')
  const [threeYrReturns, setThreeYrReturns] = useState('')
  const [fiveYrReturns, setFiveYrReturns] = useState('')

  const [message, setMessage] = useState('')

  const [timePeriodError, setTimePeriodError] = useState(false)
  const [strategyNameError, setStrategyNameError] = useState(false)
  const [clientIdError, setClientIdError] = useState(false)
  // const [amountError,setAmountError]=useState(false)
  const [investmentIdError, setInvestmentIdError] = useState(false)
  const [investmentAmountError, setInvestmentAmountError] = useState(false)
  const [expectedAmountError, setExpectedAmountError] = useState(false)
  // const [statusError,setStatusError]=useState(false)
  const [sixMonReturnsError, setSixMonReturnsError] = useState(false)
  const [oneYrReturnsError, setOneYrReturnsError] = useState(false)
  const [threeYrReturnsError, setThreeYrReturnsError] = useState(false)
  const [fiveYrReturnsError, setFiveYrReturnsError] = useState(false)



  const handleModalSubmit = (event) => {

    event.preventDefault();
    setStrategyNameError(false)
    setClientIdError(false)
    setTimePeriodError(false)
    setSixMonReturnsError(false)
    setOneYrReturnsError(false)
    setThreeYrReturnsError(false)
    setFiveYrReturnsError(false)
    let count = 0;
    if (strategyName === "") {
      setStrategyNameError(true)
      count++
    }
    if (clientId === "") {
      setClientIdError(true)
      count++
    }
    if (investmentId === "") {
      setInvestmentIdError(true)
      count++
    }
    // if(Status===''){
    //   setStatusError(true)
    //   count++
    // }
    if (investmentAmount === "") {
      setInvestmentAmountError(true)
      count++
    }
    if (expectedAmount === "") {
      setExpectedAmountError(true)
      count++
    }
    if (timePeriod === '') {
      setTimePeriodError(true)
      count++
    }
    if (sixMonReturns === "") {
      setSixMonReturnsError(true)
      count++
    }
    if (oneYrReturns === "") {
      setOneYrReturnsError(true)
      count++
    }
    if (threeYrReturns === "") {
      setThreeYrReturnsError(true)
      count++
    }
    if (fiveYrReturns === "") {
      setFiveYrReturnsError(true)
      count++
    }
    if (count > 0) {
      return
    }
    const strategyData = {
      "strategyId": "string",
      "investmentId": investmentId,
      "investmentAmount": investmentAmount,
      "expectedAmount": expectedAmount,
      "investmentName": strategyName,
      "clientId": clientId,
      "advisorId": advisorId,
      "returnPercentage": 10,
      "returnPercentageAfter6months": sixMonReturns,
      "returnPercentageAfter1year": oneYrReturns,
      "returnPercentageAfter3year": threeYrReturns,
      "returnPercentageAfter5year": fiveYrReturns,
      "status": "string",
      "timePeriod": timePeriod,
      "remarks": "string",
      "completed": true
    }


setLoading(true)
  axios({
    method: 'post',
    url: 'https://investmentportal.azurewebsites.net/api/strategies/Add?api-version=1',
    data: strategyData
  }).then((response) => {
    console.log(response)
    setMessage(response.data.message)

    setLoading(false)
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
      handleInvestmentCall()

    }
  }, (error) => {
    console.log(error)
    setLoading(false)
   
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
  // const initialized = React.useRef(false);

  const handleInvestmentCall = () => {
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/investments/advisor/${advisorId}?api-version=1`
    }).then((response) => {
      // //debugger;
      setRequestLoading(false)
      let list = response.data
      setTotalRequests(list.length)
      setTotalHighRiskRequest(list.filter(x=>x.investmentType==="High Risk").length)
      setTotalLowRiskRequest(list.filter(x=>x.investmentType==="Low Risk").length)
      setTotalMediumRiskRequest(list.filter(x=>x.investmentType==="Medium Risk").length)
      setTotalConsultationRequest(list.filter(x=>x.investmentType==="Need Consultation").length)
      setReportListOfRequests(response.data);
      // //debugger;
      // console.log(reportListOfRequests)
      console.log(response.data)

    }, (error) => {
      // consol.
      setRequestLoading(false)
 })

  }
  useEffect(() => {
    // //debugger
    handleInvestmentCall()
  }, [])
  return (
    <div className='portfolio'>
      {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={handleOpen}  style={{ margin: '0 0 0 0' }}>
        Add Strategy
      </Button>
    </div> */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <CloseIcon color="primary" onClick={handleClose} style={{ cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
          {message ? <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography> : <><Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Strategy For Client
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  autoComplete="given-name"
                  name="strategyName"
                  required
                  fullWidth
                  value={strategyName}
                  error={strategyNameError}
                  onChange={e => setStrategyName(e.target.value)}
                  id="strategyName"
                  label="Strategy Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

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

            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  autoComplete="given-name"
                  name="strategyName"
                  required
                  fullWidth
                  disabled
                  value={investmentId}
                  error={investmentIdError}
                  onChange={e => setInvestmentId(e.target.value)}
                  id="strategyName"
                  label="Investment ID"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  required
                  fullWidth
                  id="investmentAmount"
                  label="Investment Amount"
                  name="investmentAmount"
                  value={investmentAmount}
                  error={investmentAmountError}
                  onChange={e => setInvestmentAmount(e.target.value)}

                />
              </Grid>

            </Grid>

            <TextField

              margin="dense"
              autoComplete="given-name"
              name="strategyName"
              required
              fullWidth
              value={expectedAmount}
              error={expectedAmountError}
              onChange={e => setExpectedAmount(e.target.value)}
              id="strategyName"
              label="Expected Amount"
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
                  <MenuItem value={'6m'}>6 month</MenuItem>
                  <MenuItem value={'1yr'}>1 year</MenuItem>
                  <MenuItem value={'3yr'}>3 year</MenuItem>
                  <MenuItem value={'5yr'}>5 year</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  autoComplete="given-name"
                  name="6m Returns"
                  required
                  fullWidth
                  value={sixMonReturns}
                  error={sixMonReturnsError}
                  onChange={e => setSixMonReturns(e.target.value)}
                  id="6m Returns"
                  label="6m Returns(%)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  required
                  fullWidth
                  id="1yr"
                  label="1yr Returns(%) "
                  name="1yr"
                  value={oneYrReturns}
                  error={oneYrReturnsError}
                  onChange={e => setOneYrReturns(e.target.value)}

                />
              </Grid>

            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  autoComplete="given-name"
                  name="3yr"
                  required
                  fullWidth
                  value={threeYrReturns}
                  error={threeYrReturnsError}
                  onChange={e => setThreeYrReturns(e.target.value)}
                  id="3yr"
                  label="3yr Returns(%)"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  margin="dense"
                  required
                  fullWidth
                  id="5yr"
                  label="5yr Returns(%)"
                  name="5yr"
                  value={fiveYrReturns}
                  error={fiveYrReturnsError}
                  onChange={e => setFiveYrReturns(e.target.value)}

                />
              </Grid>

            </Grid>

            {loading?<Button  sx={{backgroundColor:'#4b49ac',marginTop:'5px'}} variant="contained"> Creating.... <i class="fa fa-spinner fa-spin"></i> </Button>:
            <Button  sx={{backgroundColor:'#4b49ac',marginTop:'5px'}} variant="contained" onClick={handleModalSubmit}>Create Strategy</Button>}</>}
        </Box>
      </Modal>
      
      {requestLoading?<>
        <div className='card-container'>
                <Card  color="firstCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="secondCard"  heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="thirdCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />} 
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                <Card color="fourthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                 number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>
                
                <Card color="SixthCard" heading={<Skeleton variant="text" sx={{ fontSize: '2rem' }} />}
                number={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}/>


                

          </div>
      <div className="rectangle-div">
        
<Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
<br />
<Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
        </div></> :  (
      <>
      <div className='card-container'>
                <Card  color="firstCard" heading="Number of Requests" number={totalRequests}/>
                <Card color="secondCard"  heading="Total High Risk Requests" number={totalHighRiskRequest}/>
                <Card color="thirdCard" heading="Total Low Risk Requests" number={totalLowRiskRequest}/>
                <Card color="fourthCard" heading="Total Medium Risk Requests" number={totalMediumRiskRequest}/>
                
                <Card color="SixthCard" heading="Total Consultation Requests" number={totalConsultationRequest}/>


                

          </div>
      <div className="rectangle-div">
      <TableContainer component={Paper}>
      <Table size='small' aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>#</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px' ,fontWeight: 'bold', backgroundColor: '#4b49ac'}}>Client Id</TableCell>
            <TableCell align='center' sx={{ color: 'white',fontWeight: 'bold', fontSize: '16px' , backgroundColor: '#4b49ac'}}>Date</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Amount</TableCell>
            <TableCell align='center' sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Balance</TableCell>
            <TableCell align='center' sx={{ color: 'white',fontWeight: 'bold', fontSize: '16px', backgroundColor: '#4b49ac' }}>Time Period</TableCell>
            <TableCell align='center' sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}>Type</TableCell>
            <TableCell sx={{ color: 'white', fontSize: '16px',fontWeight: 'bold', backgroundColor: '#4b49ac' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
          reportListOfRequests.length == 0 ? 
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
                <TableCell><Button  class={row.investmentType} >{row.investmentType}</Button></TableCell>
                {/* <TableCell><Button  >{row.investmentType}</Button></TableCell> */}
                <TableCell align='center'>
                <Button onClick={()=>handleOpen(row.clientId,row.investmentID)}><i style={{marginRight :'4px' }}class="fa fa-plus" aria-hidden="true"></i>Strategy</Button>
                </TableCell>
              </TableRow>
            </React.Fragment>

          )

          }
        </TableBody></Table></TableContainer>
        </div></>)
      
      }
       
      
    </div>
  );
}

function SettingsContent({ advisorId }) {

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState('')
  // const [phone, setPhone] = useState('')
  // const [city, setCity] = useState('')
  // const [State, setState] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [loading,setLoading]=useState(false)
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
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, updatedAdvisorData);
    statusCopy[inputName] = inputValue;

    setUpdatedAdvisorData(statusCopy);
  }

  const ProfileBack = (el) => {
    setUpdatedAdvisorData(advisorData);
    
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
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/${advisorId}?api-version=1`
    })
      .then((response) => {
        setAdvisorData(response.data.advisor)
        setUpdatedAdvisorData(response.data.advisor)
        console.log(advisorData)
        // setFirstName(advisorData.firstName);
        // setLastName(advisorData.lastName);
        // setEmail(advisorData.email);
        // setPhone(advisorData.phoneNumber);
        // setAddress(advisorData.address);
        // setCity(advisorData.city);
        // setState(advisorData.state);
        // setPassword(advisorData.confirmPassword);
        setSettingsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }, []);
  const [disabled, setDisabled] = useState(true)
  const handleEdit = () => {
    setDisabled(false)
    setEditVisible(false)
  }

  const handleUpdate = () => {
    debugger
    console.log(1)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setPhoneError(false)
    setAddressError(false)
    setCityError(false)
    setStateError(false)
    setPasswordError(false)
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
    if (updatedAdvisorData.confirmPassword === '') {
      setPasswordError(true)
      count++
    }
    if (count > 0) {
      return
    }
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
      axios({
        method: 'put',
        url: `https://investmentportal.azurewebsites.net/api/AdvisorSignUp/update/${advisorId}?api-version=1`,
        data: updatedAdvisorData
      }).then((response) => {
        console.log(response)
        setLoading(false)
        if (response.data.message === "Advisor information updated successfully.") {
         
          setAdvisorData(updatedAdvisorData)
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
            <TextField
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
            <TextField
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
            <TextField
              size="small"
              margin="dense"
              autoComplete="given-name"
              name="email"
              required
              fullWidth
              InputProps={{

                disabled: disabled
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
            <TextField
              size="small"
              margin="dense"
              required
              fullWidth
              id="phone"
              InputProps={{

                disabled: disabled
              }}
              label="Phone Number"
              name="phoneNumber"
              value={updatedAdvisorData.phoneNumber}
              error={phoneError}
              onChange={e => handleChange(e)}
              autoComplete="family-name"
            />
          </Grid>

        </Grid>

        <TextField
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
            <TextField
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
            <TextField
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
        {/* <TextField
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
      <span style={{color:'green'}}>{message}</span>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
          <CloseIcon color="primary" onClick={handleClose} style={{ cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
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
