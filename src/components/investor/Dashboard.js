import { useEffect, useState } from "react";
import './Dashboard.css'
import Collapse from '@mui/material/Collapse';
import { BarChart } from '@mui/x-charts/BarChart';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import image2 from '../../assets/animation.gif'
import image3 from '../../assets/seconds.gif'
import Tooltip from '@mui/material/Tooltip';

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
import { Skeleton } from "@mui/lab";

function Dashboard() {

  const { clientId } = useParams()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName]=useState('')
  const [loading,setLoading]=useState(true)
  
  useEffect(()=>{

    const body = document.querySelector("body");
    const sidebar = body.querySelector(".sidebar");
    const toggle = body.querySelector(".toggle");
    // const searchBtn = body.querySelector(".search-box");
    const content = body.querySelector(".content");
    const materialicons = body.querySelectorAll(".Customicons");
    // const modeText = body.querySelector(".mode-text");
    debugger
    
    
    toggle.addEventListener("click", () => {
       sidebar.classList.toggle("close");
       content.classList.toggle("inc-m-l");
       for (const icons of materialicons) {
        icons.classList.toggle(
          'icon-toggle'
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
  }, (error) => {
       setLoading(false)
  })},[])

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [selectedOption, setSelectedOption] = useState('Portfolio');
  const handleLogout = () => {
    navigate('/investor')
  }
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
                <span class="profession">Client:{clientId}</span>
            </div>}
        </div>

        <i class="bx bx-chevron-right toggle"></i>
    </header>

    <div class="menu-bar">
        <div class="menu">
            <ul class="menu-links">
            <li class="nav-link">
                <a  onClick={() => handleOptionClick('Portfolio')}>
                <i id={selectedOption === 'Portfolio' ? 'iactive' : ''} className="material-icons Customicons">pie_chart</i>
                <span  id={selectedOption === 'Portfolio' ? 'iactiveli' : ''} class="text nav-text">Portfolio</span>
              </a>
            </li>
            <li class="nav-link">
                <a  onClick={() => handleOptionClick('pastRequests')}>
                  <i id={selectedOption === 'pastRequests' ? 'iactive' : ''} className="material-icons Customicons">swap_horiz</i>
                  <span  id={selectedOption === 'pastRequests' ? 'iactiveli' : ''}  class="text nav-text">Past Requests</span>
                </a>
            </li>
            <li class="nav-link">
                <a  onClick={() => handleOptionClick('New Investment')}>
                <i id={selectedOption === 'New Investment' ? 'iactive' : ''} className="material-icons Customicons">description</i>
              <span   id={selectedOption === 'New Investment' ? 'iactiveli' : ''} class="text nav-text">New Investment</span>
              </a>
            </li>
            <li class="nav-link">
                <a  onClick={() => handleOptionClick('Settings')}>
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
        {selectedOption === 'Portfolio' && <PortfolioContent clientId={clientId} />}
        {selectedOption === 'pastRequests' && <PastRequestsContent clientId={clientId} />}
        {selectedOption === 'New Investment' && <InvestmentContent clientId={clientId} />}
        {selectedOption === 'Settings' && <SettingsContent clientId={clientId}/>}
      </div>
    </div>
  </>
  );
}

function PortfolioContent({ clientId }) {

  
  const [open, setOpen] = useState(false);
  const [listOfStratgies, setListOfStrategies] = useState([])
  


  const [loading,setLoading]=useState(true)

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/strategies/${clientId}/By-ClientId?api-version=1`
    }).then(function (response) {
      const list = response.data.strategies
      setLoading(false)
      setListOfStrategies(list)
      console.log(list)

    },
      function (error) {
        console.log(error)
        setLoading(false)
      })
  }, [listOfStratgies])

  const [coll,setColl]=useState('')
  function collapseRow(the)
  {
    debugger;
    let _strategyId = the.row.strategyId;
    //setOpen(!open);
    if(coll === _strategyId)
      _strategyId='';
    setColl(_strategyId);
  }

  const valueFormatter = (value) => `Rs.${value}`;
  return (
    <div className="portfolio">

      {
        loading?<div className="rectangle-div">
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div> :( <div className="rectangle-div">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }} />
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Investment Name</TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Original Amount(Rs.)</TableCell> */}
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Investment Amount(Rs.)</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Expected Amount(Rs.)</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Time Period</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfStratgies.length===0?
                <React.Fragment >
                <TableRow>
                  <TableCell
                  sx={{ textAlign: "center"}} 
                   colSpan={6}>No Investment Created</TableCell>
                </TableRow>
              </React.Fragment> 
                :listOfStratgies?.map((row) => {
                  if (row.status === 'Approved') {
                    return (
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
                          <TableCell><Button sx={{ width: '100px', borderRadius: '20px' }} variant="contained" color={row.status === 'Pending' ? 'primary' : 'success'}>{row.status}</Button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingRight: 10, paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={coll == row.strategyId }     style={{ marginLeft : '120px'}} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 0 }}>
                                {/*                       
         <BarChart
          
  dataset={data}
  yAxis={[{ scaleType: 'band', data: ["Invested" , "Expected"] }]}
  series={[{ dataKey: 'amount',   }]}
  layout="horizontal"
  {...chartSetting}
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
                                  width={650}
                                  height={300}
                                />
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  }
                  return null; // Exclude rows with status other than "pending"
                })}
              </TableBody></Table></TableContainer>

        </div>)
      }


    </div>
  );
}

function PastRequestsContent({ clientId }) {
  const [listOfPastRequests, setListOfPastRequests] = useState([])

 const [loading,setLoading]=useState(true)




  axios({
    method: 'get',
    url: `https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
  }).then(function (response) {
    setListOfPastRequests(response.data)
    console.log(listOfPastRequests)
    setLoading(false)
  },
    function (error) {
      console.log(error)
      setLoading(false)
    })

  return (
    // loading
    <div className="portfolio">
      {loading?<div className="rectangle-div">
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div>:( <div className="rectangle-div">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>#</TableCell>

                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Created Date</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Investment Amount(Rs.)</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Time Period</TableCell>
                <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Investment Type</TableCell>
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
                    <TableCell><Button color={row.investmentType === 'High Risk' ? 'error' : (row.investmentType === 'Low Risk' ? 'primary' : 'success')}>{row.investmentType}</Button></TableCell>

                  </TableRow>
                </React.Fragment>

              )

              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>)}
    </div>
  );
}

function InvestmentContent({ clientId }) {
  const [strategyLoading,setStrategyLoading]=useState(true)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investmentType, setInvestmentType] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
 

  const [investmentAmountError, setInvestmentAmountError] = useState(false)
  const [investmentTypeError, setInvestmentTypeError] = useState(false)
  const [timePeriodError, setTimePeriodError] = useState(false)
  const [loading,setLoading]=useState(false)

  const [message, setMessage] = useState("")
  const [advisorId, setAdvisorId] = useState("")

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
    top: '30%',
    left: '50%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '1200px',
    bgcolor: '#e4f1ff',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setMessage("")
    setInvestmentAmount('')
    setTimePeriod('')
    setInvestmentType('')
    setInvestmentAmountError(false)
    setInvestmentTypeError(false)
    setTimePeriodError(false)

  };


  const [listOfStratgies, setListOfStrategies] = useState([])

  const [recommendationsOpen, setRecommendationsOpen] = useState(false);
  const handleRecommendationsOpen = () => setRecommendationsOpen(true);
  const handleRecommendationsClose = () => setRecommendationsOpen(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
    }).then((response) => {
      response.data.map((e) => setAdvisorId(e.advisorId))

    }, (error) => { })
  })


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
      "createdDate": "2023-10-26T13:58:26.103Z"



    }
    setLoading(true)
    axios({
      method: 'post',
      url: `https://investmentportal.azurewebsites.net/api/investments/New Investment?api-version=1`,
      data: investmentData
    }).then((response) => {
      console.log(response)
      setLoading(false)
      if (response.data.message === "Investment Successfully Generated") {
        setAdvisorId(response.data.investment.advisorId)
        setMessage("Investment Request Created.Soon Advisor Will Create Strategy For You.")
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

  function ChildModal({strategyId}) {
    const [investmentId, setInvestmentId] = useState('')
    const [Status, setStatus] = useState('')
    const [actionLoading,setActionLoading]=useState(false)
    const [investmentIdError, setInvestmentIDError] = useState(false)
    const [statusError, setStatusError] = useState(false)

    const [childOpen, setChildOpen] = useState(false)
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);

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
        handleRecommendationsClose()
      }, (error) => {
        console.log(error)
        setActionLoading(false)
      }


      )

    }

    return (<>
      <Button variant='contained' onClick={()=>handleApprove(strategyId)}>Action</Button>
      <Modal
        open={childOpen}
        onClose={handleChildClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <CloseIcon color="primary" onClick={handleChildClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose Investment
          </Typography>
          <TextField
            size="small"
            margin="normal"
            autoComplete="given-name"
            name="bankName"
            required
            disabled
            fullWidth
            value={investmentId}
            error={investmentIdError}
            onChange={e => setInvestmentId(e.target.value)}
            id="bankName"
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
              value={Status}
              error={statusError}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={'Approved'}>Approve</MenuItem>
              <MenuItem value={'Rejected'}>Reject</MenuItem>


            </Select>
          </FormControl>

          {actionLoading?<Button  sx={{backgroundColor:'blue',marginTop:'5px'}} variant="contained" > Submitting... 
          <i class="fa fa-spinner fa-spin"></i></Button>
          :
          <Button  sx={{backgroundColor:'blue',marginTop:'5px'}} variant="contained" onClick={handleChildSubmit}>Submit</Button>}
        </Box>
      </Modal></>

    )
  }
  const handleRecommendations = () => {
    
    handleRecommendationsOpen()
    console.log("advisorId:" + advisorId)
    axios({
      method: 'get',
      url: `https://investmentportal.azurewebsites.net/api/strategies/${clientId}/By-ClientId?api-version=1`
    }).then((response) => {
      let data = response.data.strategies
      let list= data.filter(x=> x.status== 'Pending');
      setStrategyLoading(false)
      // list.map((e)=>setData([e.investmentAmount,e.expectedAmount,e.amount,e.returnPercentage]))
      setListOfStrategies(list)
      console.log(list)

    }, (error) => { 
      setStrategyLoading(false)
    })


  }
  return (
    <div className="InvestmentContent">
      <div className="rectangle-div-investment">
        <div class="Investmentcontainer">
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

            <Box sx={style} > {message ? <><CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} /><Typography id="modal-modal-title" variant="h6" component="h2">
              {message}
            </Typography></> : <>
              <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Please Fill Mandatory Fields For Getting Recommendations
              </Typography>

              <TextField

                margin="dense"
                autoComplete="given-name"
                name="investmentAmount"
                required
                fullWidth
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
                    <MenuItem value={'Low Risk'}>Low Risk(Gold,Fixed Income assets,Bonds etc)</MenuItem>
                    <MenuItem value={'High Risk'}>High Risk(Equity,Future,Options etc)</MenuItem>
                    <MenuItem value={'Medium Risk'}>Medium Risk(Mixed of Low and High Risk)</MenuItem>
                    <MenuItem value={'Need Consultation'}>Need Consultation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {loading?<Button sx={{backgroundColor:'blue',marginTop:'5px'}} variant="contained">Creating...<i class="fa fa-spinner fa-spin"></i> </Button>:<Button sx={{backgroundColor:'blue', marginTop:'5px'}}  variant='contained' onClick={handleModalSubmit}>Create</Button>}</>}
            </Box>

            {/* {selectedOption==='2'&& <TextField
                
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
          <Tooltip title="Click here to see investment strategies from advisor" > <button class="my-button" onClick={handleRecommendations} >Strategies</button></Tooltip>
          <Modal
            open={recommendationsOpen}
            onClose={handleRecommendationsClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          ><Box sx={recommendationStyle} >
              <CloseIcon color="primary" onClick={handleRecommendationsClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
              {strategyLoading? <div >
        
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
        <br />
        <Skeleton variant="rounded" sx={{ width: '100%' }} height={200} />
                </div>:(
                <React.Fragment><TableContainer component={Paper} sx={{ overflowY: 'auto' }}>

                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow size='small' >
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>#</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Strategy Name</TableCell>
                        {/* <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Original Amount(Rs.)</TableCell> */}
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Investment Amount(Rs.)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Expected Amount(Rs.)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>6 Months Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>1 year Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>3 year Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>5 year Return(%)</TableCell>
                        <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Approve/Reject</TableCell>
                        {/* <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0000ff' }}>Status</TableCell> */}
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
                                {/* <TableCell>{.amount}</TableCell> */}
                                <TableCell>{row.investmentAmount}</TableCell>
                                <TableCell>{row.expectedAmount}</TableCell>
                                <TableCell>{row.returnPercentageAfter6months}</TableCell>
                                <TableCell>{row.returnPercentageAfter1year}</TableCell>
                                <TableCell>{row.returnPercentageAfter3year}</TableCell>
                                <TableCell>{row.returnPercentageAfter5year}</TableCell>
                                <TableCell><ChildModal strategyId={row.strategyId} /></TableCell>
                                {/* <TableCell><Button sx={{ width: '100px', borderRadius: '20px' }} variant="contained" color={row.status === 'Pending' ? 'primary' : 'error'}>{row.status}</Button></TableCell> */}
                              </TableRow>
                            </React.Fragment>
                          );
                        }
                        return null; // Exclude rows with status other than "pending"
                      })}
                    </TableBody></Table></TableContainer></React.Fragment> )}
              </Box>
          </Modal>

        </div>
      </div>

    </div>
  );
}

function SettingsContent({clientId}) {

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
  const [panNumber,setPanNumber]=useState('')
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
  const [clientData,setClientData]=useState({})
  const [updatedClientData,setUpdatedClientData]=useState({})
  const [editVisible,setEditVisible]=useState(true)


  const handleMessage=()=>{
    setMessage("User Information Updated Successfully.")
     setTimeout(setMessage,2000,"")
  }
  const handleChange = (el) => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = Object.assign({}, updatedClientData);
    statusCopy[inputName] = inputValue;

    setUpdatedClientData(statusCopy);
  }

  const ProfileBack = (el) => {
    setUpdatedClientData(clientData);
    
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
      url: `https://investmentportal.azurewebsites.net/api/ClientSignUp/${clientId}?api-version=1`
    })
      .then((response) => {
        setClientData(response.data.client)
        setUpdatedClientData(response.data.client)
        
        setSettingsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setSettingsLoading(false)
      });
  }, []);


  const [disabled, setDisabled] = useState(true)
 const handleEdit = () => {
    setDisabled(false)
    setEditVisible(false)
  }

  const handleUpdate = () => {
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
    if (updatedClientData.password === '') {
      setPasswordError(true)
      count++
    }
    if (count > 0) {
      return
    }
       
  
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
          handleMessage()
        }
  
  
      }, (error) => {
       setLoading(false)
  
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
              value={updatedClientData.lastName}
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
              value={updatedClientData.email}
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
              name="phone"
              value={updatedClientData.phoneNumber}
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
          value={updatedClientData.address}
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
              value={updatedClientData.city}
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
              value={updatedClientData.state}
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
          <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Client information updated successfully.
          </Typography>
        </Box>
      </Modal>
      <div className='editUpdate'>
      {editVisible
         ?
         <Button variant='contained' onClick={()=>handleEdit()} 
         style={{ width :'90px' , marginTop:'8px'  , color: '#fff', backgroundColor: 'blue' }}>Edit
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
        <Button sx={{backgroundColor:'blue', marginTop:'8px'}} onClick={()=>handleBack()} variant='contained' >Go Back</Button>
    </>
      }
        
      </div>
    </div>}
  </>
  );
}
export default Dashboard