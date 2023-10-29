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

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
function Dashboard(){
    
    const { advisorId } = useParams()
    console.log(advisorId)
    const navigate = useNavigate()


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedOption, setSelectedOption] = useState('ClientList');
  const handleLogout=()=>{
    navigate('/advisor')
  }
  return (
    <div className="investorDashboard">
       <div className="top-right">
        <div className="user-info" onClick={toggleDropdown}>
          <i className="material-icons">person</i>
          <span>Your Profile</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            <ul>
              <li onClick={handleLogout}>Logout</li>
              {/* Add other options as needed */}
            </ul>
          </div>
        )}
      </div>
      <div className="sidebar">
      <h1 id="logo"><span class="logo-text">INCvest</span><span class="dot">.</span></h1>
        <ul>
       <Tooltip title="Click to see list of clients" placement="right-end"><li className="sidebar-item" onClick={() => handleOptionClick('ClientList')} id={selectedOption === 'ClientList' ? 'active' : ''}> <i className="material-icons">pie_chart</i> <span>List of Clients</span></li></Tooltip>
       <Tooltip title="Click to see list of strategies" placement="right-end"> <li className="sidebar-item" onClick={() => handleOptionClick('InvestmentStrategies')} id={selectedOption === 'InvestmentStrategies' ? 'active' : ''} ><i className="material-icons">swap_horiz</i><span>Strategies</span></li></Tooltip>
       <Tooltip title="Click to see list of investment requests" placement="right-end">  <li className="sidebar-item" onClick={() => handleOptionClick('InvestmentRequests')} id={selectedOption === 'InvestmentRequests' ? 'active' : ''}><i className="material-icons">description</i><span>Investment Requests</span></li></Tooltip>
          {/* <li className="sidebar-item" onClick={() => handleOptionClick('Settings')}><i className="material-icons">settings</i><span>Settings</span></li> */}
        </ul>
      </div>
      <div className="content">
        {selectedOption === 'ClientList' && <ClientList advisorId={advisorId} />}
        {selectedOption === 'InvestmentStrategies' && <InvestmentStrategies advisorId={advisorId} />}
        {selectedOption === 'InvestmentRequests' && <ReportsContent advisorId={advisorId}/>}
        {selectedOption === 'Settings' && <SettingsContent />}
      </div>
    </div>
  );
}

function InvestmentStrategies( {advisorId} ) {

  //handle modal
  


  const [open, setOpen] = useState(false);
  const [data,setData]=useState([])
  const [listOfStratgies,setListOfStrategies]=useState([])
  useEffect(()=>{
    axios({
      method:'get',
      url:`https://investmentportal.azurewebsites.net/api/strategies/${advisorId}/By-AdvisorId?api-version=1`
    }).then(function(response){
    const list=response.data.strategies
     
     setListOfStrategies(list)
      console.log(list)
    
    },
    function(error)
    {
      console.log(error)
    })
},[listOfStratgies])




  return (
    <div className="portfolio">
    
      {/* Add your portfolio content here */}
     
    <div className="rectangle-div">  
    {/* <CollapsibleTable/> */}
    <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
            <TableCell />
            
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px' }} >Client Id&nbsp;</TableCell>
            {/* <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px' }}>Original Amount&nbsp;(Rs.) </TableCell> */}
            <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px'}}>Investment Amount&nbsp;(Rs.)</TableCell>
            <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px' }}>Expected Amount&nbsp;(Rs.)</TableCell>
            <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px' }}>Time Period</TableCell>
            <TableCell sx={{ fontWeight: 'bold' , fontSize: '16px' }}>Status&nbsp;</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
     
         {listOfStratgies?.map((row) => (
          <React.Fragment>
          <TableRow>
          <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
       
          <TableCell >{row.investmentName}</TableCell>
          <TableCell >{row.clientId} </TableCell>
          {/* <TableCell >{row.amount} </TableCell> */}
          <TableCell >{row.investmentAmount}</TableCell>
          <TableCell >{row.expectedAmount}</TableCell>
          <TableCell>{row.timePeriod}</TableCell>
          <TableCell ><Button sx={{width:'100px',borderRadius:'20px'}} variant="contained" color={row.status === 'Pending' ? 'primary' : (row.status==='Rejected'?'error':'success')}>{row.status}</Button></TableCell>
        </TableRow>
            <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['6 Month', '1 Year', '3 Year','5 Year'],
          scaleType: 'band',
          label:'Time'
        },
      ]}
      yAxis={[
        {
          label:'% Returns'
        }
      ]}
      series={[
        {
          color:'#b7d9ff',
          data: [row.returnPercentageAfter6months,row.returnPercentageAfter1year,row.returnPercentageAfter3year,row.returnPercentageAfter5year],
          label:'Percentage Returns'
        },
      ]}
      width={800}
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
    </div>  
    </div>
  );
}

function ClientList({advisorId}) {
  console.log(advisorId)
  const [listOfClients,setListOfClients]=useState([])
  
  
  useEffect(()=>{
      
    axios({
      method:'get',
      url:`https://investmentportal.azurewebsites.net/api/AdvisorSignUp/clients-by-advisor/${advisorId}?api-version=1`
    }).then((response)=>{
      
     setListOfClients(response.data)
    
  
      }
      
    ,(error)=>{console.log(error)})




    },[listOfClients,advisorId])


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
    borderRadius:'20px',
    boxShadow: 24,
    p: 4,
  };   

const [clientId,setClientId]=useState('')
const [clientIdError,setClientIdError]=useState(false)  
const [modalOpen, setModalOpen] = React.useState(false);
const handleOpen = () =>{ setModalOpen(true)
                    };
const handleClose = () => setModalOpen(false);
const [listOfRequests,setListOfRequests]=useState([])

const handleModalSubmit=()=>{
   if(clientId===""){
    setClientIdError(true)
    return
   }
    
   axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
   }).then((response)=>{
    
    setListOfRequests([response.data])
  
    handleClose()
    setClientId('')
    handleRequestsOpen()

   },(error)=>{


   })
   
}
const requestsStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  
  
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#e4f1ff',
    borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};   
 const [requestsOpen, setRequestsOpen] = useState(false);
 const handleRequestsOpen = () => setRequestsOpen(true);
 const handleRequestsClose = () => setRequestsOpen(false);
  return (
    <div>
      
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Client ID to See Requests
          </Typography>
          <TextField
                
                  margin="dense"
                  autoComplete="given-name"
                  name="clientId"
                  required
                  fullWidth
                  value={clientId}
                  error={clientIdError}
                  onChange={e => setClientId(e.target.value)}
                  id="clientId"
                  label="Client Id"
                  autoFocus
                />
              <Button  onClick={handleModalSubmit}>Submit</Button>
        </Box>
      </Modal>
     
      <Modal
        
        open={requestsOpen}
        onClose={handleRequestsClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={requestsStyle} >
        <CloseIcon color="primary" onClick={handleRequestsClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
        <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
           <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Time Period</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Type</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listOfRequests?.map((row) => 
          row.map((e)=>
          <React.Fragment >
        <TableRow>
          <TableCell>{e.investmentAmount}</TableCell>
          <TableCell>{e.timePeriod}</TableCell>
          <TableCell><Button color={e.investmentType === 'High Risk' ? 'error' : (e.investmentType === 'Low Risk' ? 'primary' : 'success')}>{e.investmentType}</Button></TableCell>
          
        </TableRow>
      </React.Fragment>

          )

        
    

      
      
  // Exclude rows with status other than "pending"
)}
          </TableBody></Table></TableContainer></Box>
          </Modal>
       <div className="rectangle-div">  
       <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Client Id</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Client Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Email Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Mobile Number</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfClients?.map((row)=>
<React.Fragment>
<TableRow>
        <TableCell>
          {row.clientId}
        </TableCell>
          <TableCell>{row.firstName+' '+ row.lastName}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{'+91'+row.phoneNumber}</TableCell>
          
        </TableRow></React.Fragment>

          )}
            
         
          </TableBody></Table></TableContainer>
   
    </div>
    </div>
  );
}

function ReportsContent({advisorId}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#e4f1ff',
    borderRadius:'20px',
    boxShadow: 24,
    p: 4,
  };   
const [modalOpen, setModalOpen] = React.useState(false);
const handleOpen = () => setModalOpen(true);
const handleClose = () => {setModalOpen(false)
                          setMessage('')};
const [strategyName,setStrategyName]=useState('')
const [clientId,setClientId]=useState('')
const [investmentId,setInvestmentId]=useState('')
const [amount,setAmount]=useState('')
const [investmentAmount,setInvestmentAmount]=useState('')
const [expectedAmount,setExpectedAmount]=useState('')
const [timePeriod,setTimePeriod]=useState("")
// const [Status,setStatus]=useState('')
const [sixMonReturns,setSixMonReturns]=useState('')
const [oneYrReturns,setOneYrReturns]=useState('')
const [threeYrReturns,setThreeYrReturns]=useState('')
const [fiveYrReturns,setFiveYrReturns]=useState('')

const [message,setMessage]=useState('')

const [timePeriodError,setTimePeriodError]=useState(false)
const [strategyNameError,setStrategyNameError]=useState(false)
const [clientIdError,setClientIdError]=useState(false)
// const [amountError,setAmountError]=useState(false)
const [investmentIdError,setInvestmentIdError]=useState(false)
const [investmentAmountError,setInvestmentAmountError]=useState(false)
const [expectedAmountError,setExpectedAmountError]=useState(false)
// const [statusError,setStatusError]=useState(false)
const [sixMonReturnsError,setSixMonReturnsError]=useState(false)
const [oneYrReturnsError,setOneYrReturnsError]=useState(false)
const [threeYrReturnsError,setThreeYrReturnsError]=useState(false)
const [fiveYrReturnsError,setFiveYrReturnsError]=useState(false)



const handleModalSubmit=(event)=>{

  event.preventDefault();
  setStrategyNameError(false)
  setClientIdError(false)
  setTimePeriodError(false)
  setSixMonReturnsError(false)
  setOneYrReturnsError(false)
  setThreeYrReturnsError(false)
  setFiveYrReturnsError(false)
  let count=0;
  if(strategyName===""){
    setStrategyNameError(true)
    count++
  }
  if(clientId===""){
    setClientIdError(true)
    count++ 
  }
  if(investmentId===""){
    setInvestmentIdError(true)
    count++
  }
  // if(Status===''){
  //   setStatusError(true)
  //   count++
  // }
  if(investmentAmount===""){
    setInvestmentAmountError(true)
    count++
  }
  if(expectedAmount===""){
    setExpectedAmountError(true)
    count++
  }
  if(timePeriod===''){
    setTimePeriodError(true)
    count++
  }
  if(sixMonReturns===""){
    setSixMonReturnsError(true)
    count++
  }
  if(oneYrReturns===""){
    setOneYrReturnsError(true)
    count++
  }
  if(threeYrReturns===""){
    setThreeYrReturnsError(true)
    count++
  }
  if(fiveYrReturns===""){
    setFiveYrReturnsError(true)
    count++
  }
  if(count>0){
    return
  }
  const strategyData ={
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
  axios({
    method:'post',
    url:'https://investmentportal.azurewebsites.net/api/strategies/Add?api-version=1',
    data: strategyData
}).then((response)=>{
   console.log(response)
   setMessage(response.data.message)
   if(response.data.message="Strategy added successfully."){
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
},(error)=>{
  console.log(error)
  setMessage(error.response.data.message)
})
 


}



  const [listOfRequests,setListOfRequests] = useState([]) 

  axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/investments/advisor/${advisorId}?api-version=1`
   }).then((response)=>{
    
    setListOfRequests(response.data)
  console.log(listOfRequests)
  
    


   },(error)=>{


   })
  return (
<div className='portfolio'>
<Button  onClick={handleOpen} variant='contained'>Add Strategy</Button>
  <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
          {message?<Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>:<><Typography id="modal-modal-title" variant="h6" component="h2">
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
              
              <Grid sx={{mt:1}}>
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
              
              <Button  onClick={handleModalSubmit}>Create Strategy</Button></>}
        </Box>
      </Modal>
    <div className="rectangle-div">
     
     <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Id</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Client Id</TableCell>
            <TableCell align='center'  sx={{ fontWeight: 'bold', fontSize: '16px' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Amount</TableCell>
            <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '16px' }}>Time Period</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Type</TableCell>
            
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listOfRequests?.map((row) => 
          
          <React.Fragment >
        <TableRow>
          <TableCell>{row.investmentID}</TableCell>
          <TableCell>{row.clientId}</TableCell>
          <TableCell align='center'>{row.createdDate.slice(0,10)}</TableCell>
          <TableCell align='center'>{row.investmentAmount}</TableCell>
          <TableCell align='center'>{row.timePeriod}</TableCell>
          <TableCell><Button color={row.investmentType === 'High Risk' ? 'error' : (row.investmentType === 'Low Risk' ? 'primary' : 'success')}>{row.investmentType}</Button></TableCell>
          
        </TableRow>
      </React.Fragment>

          )

}
          </TableBody></Table></TableContainer>
    </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div>
      <h1>Settings Content</h1>
      {/* Add your settings content here */}
    </div>
  );
}

export default Dashboard
