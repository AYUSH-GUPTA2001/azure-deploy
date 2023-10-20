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

import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
function Dashboard(){
    
    const { advisorId } = useParams()
    console.log(advisorId)
    


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [selectedOption, setSelectedOption] = useState('ClientList');
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
              <li>Logout</li>
              {/* Add other options as needed */}
            </ul>
          </div>
        )}
      </div>
      <div className="sidebar">
      <h1 id="logo">INCVEST</h1>
        <ul>
          <li className="sidebar-item" onClick={() => handleOptionClick('ClientList')} id={selectedOption === 'ClientList' ? 'active' : ''}> <i className="material-icons">pie_chart</i> <span>List of Clients</span></li>
          <li className="sidebar-item" onClick={() => handleOptionClick('InvestmentStrategies')} id={selectedOption === 'InvestmentStrategies' ? 'active' : ''} ><i className="material-icons">swap_horiz</i><span>Strategies</span></li>
          <li className="sidebar-item" onClick={() => handleOptionClick('InvestmentRequests')} id={selectedOption === 'InvestmentRequests' ? 'active' : ''}><i className="material-icons">description</i><span>Investment Requests</span></li>
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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };   
const [modalOpen, setModalOpen] = React.useState(false);
const handleOpen = () => setModalOpen(true);
const handleClose = () => setModalOpen(false);
const [strategyName,setStrategyName]=useState('')
const [clientId,setClientId]=useState('')
const [amount,setAmount]=useState('')
const [investmentAmount,setInvestmentAmount]=useState('')
const [expectedAmount,setExpectedAmount]=useState('')
const [Status,setStatus]=useState('')
const [sixMonReturns,setSixMonReturns]=useState('')
const [oneYrReturns,setOneYrReturns]=useState('')
const [threeYrReturns,setThreeYrReturns]=useState('')
const [fiveYrReturns,setFiveYrReturns]=useState('')



const [strategyNameError,setStrategyNameError]=useState(false)
const [clientIdError,setClientIdError]=useState(false)
const [amountError,setAmountError]=useState(false)
const [investmentAmountError,setInvestmentAmountError]=useState(false)
const [expectedAmountError,setExpectedAmountError]=useState(false)
const [statusError,setStatusError]=useState(false)
const [sixMonReturnsError,setSixMonReturnsError]=useState(false)
const [oneYrReturnsError,setOneYrReturnsError]=useState(false)
const [threeYrReturnsError,setThreeYrReturnsError]=useState(false)
const [fiveYrReturnsError,setFiveYrReturnsError]=useState(false)



  const [open, setOpen] = useState(false);
  const [data,setData]=useState([])
  const [listOfStratgies,setListOfStrategies]=useState([])
  useEffect(()=>{
    axios({
      method:'get',
      url:`https://investmentportal.azurewebsites.net/api/strategies/${advisorId}/By-AdvisorId?api-version=1`
    }).then(function(response){
    const list=response.data.strategies
     list.map((e)=>setData([e.investmentAmount
      ,e.expectedAmount,e.amount,e.investmentAmount]))
     setListOfStrategies(list)
      console.log(list)
    
    },
    function(error)
    {
      console.log(error)
    })
},[listOfStratgies])

const handleModalSubmit=(event)=>{

  event.preventDefault();
  setStrategyNameError(false)
  setClientIdError(false)
  setSixMonReturnsError(false)
  setOneYrReturnsError(false)
  setThreeYrReturnsError(false)
  setFiveYrReturnsError(false)

  if(strategyName===""){
    setStrategyNameError(true)
    
  }
  if(clientId===""){
    setClientIdError(true)
    
  }
  if(amount===""){
    setAmountError(true)
    
  }
  if(Status===''){
    setStatusError(true)
  
  }
  if(investmentAmount===""){
    setInvestmentAmountError(true)
    
  }
  if(expectedAmount===""){
    setExpectedAmountError(true)
    
  }
  if(sixMonReturns===""){
    setSixMonReturnsError(true)
    
  }
  if(oneYrReturns===""){
    setOneYrReturnsError(true)
    
  }
  if(threeYrReturns===""){
    setThreeYrReturnsError(true)
    
  }
  if(fiveYrReturns===""){
    setFiveYrReturnsError(true)
    return
  }
  const strategyData ={
    "strategyId": 0,
  "investmentId": 0,
  "investmentName": strategyName,
  "amount": amount,
  "clientId": clientId,
  "advisorId": advisorId,
  "returnPercentage": amount,
  "investmentAmount": investmentAmount,
  "expectedAmount": expectedAmount,
  "returnPercentageAfter6months": investmentAmount,
  "returnPercentageAfter1year": expectedAmount,
  "returnPercentageAfter3year": amount,
  "returnPercentageAfter5year": investmentAmount,
  "status": Status,
  "timePeriod": "string",
  "remarks": "string"
  }
  axios({
    method:'post',
    url:'https://investmentportal.azurewebsites.net/api/strategies/Add?api-version=1',
    data: strategyData
}).then((response)=>{
   console.log(response)
   if(response.data.message="Strategy added successfully."){
    setStrategyName('')
    setClientId('')
    setSixMonReturns('')
    setOneYrReturns('')
    setThreeYrReturns('')
    setFiveYrReturns('')
    setAmount('')
    setExpectedAmount('')
    setInvestmentAmount('')
    handleClose()
   }
},(error)=>{
  console.log(error)
  handleClose()
})
 


}



  return (
    <div className="portfolio">
    
      {/* Add your portfolio content here */}
     <Button  onClick={handleOpen} variant='contained'>Add Strategy</Button>
  <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
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
                  value={amount}
                  error={amountError}
                  onChange={e => setAmount(e.target.value)}
                  id="strategyName"
                  label="Original Amount"
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
              
              <FormControl required fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          margin='normal'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          value={Status}
          error={statusError}
          onChange={(e)=>setStatus(e.target.value) }
        >
          <MenuItem value={'Pending'}>Pending</MenuItem>
         
        
        </Select>
      </FormControl>
              
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
              
              <Button  onClick={handleModalSubmit}>Create Strategy</Button>
        </Box>
      </Modal>
    <div className="rectangle-div">  
    {/* <CollapsibleTable/> */}
    <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
            <TableCell />
            
            <TableCell>Investment Name</TableCell>
            <TableCell align='right'>Client Id&nbsp;</TableCell>
            <TableCell align='right'>Original Amount&nbsp;(Rs.) </TableCell>
            <TableCell align='right'>Investment Amount&nbsp;(Rs.)</TableCell>
            <TableCell align='right'>Expected Amount&nbsp;(Rs.)</TableCell>
            <TableCell align='right'>Status&nbsp;</TableCell>
          
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
       
          <TableCell>{row.investmentName}</TableCell>
          <TableCell align="right">{row.clientId} </TableCell>
          <TableCell align="right">{row.amount} </TableCell>
          <TableCell align="right">{row.investmentAmount}</TableCell>
          <TableCell align="right">{row.expectedAmount}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
        </TableRow>
            <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
            <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['6m', '1 yr', '3yr','5yr'],
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
          data: data,
          label:'Percentage Returns'
        },
      ]}
      width={500}
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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };   

const [clientId,setClientId]=useState('')
const [clientIdError,setClientIdError]=useState(false)  
const [modalOpen, setModalOpen] = React.useState(false);
const handleOpen = () => setModalOpen(true);
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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};   
 const [requestsOpen, setRequestsOpen] = useState(false);
 const handleRequestsOpen = () => setRequestsOpen(true);
 const handleRequestsClose = () => setRequestsOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Investment Requests</Button>
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
           <TableCell>Investment Amount</TableCell>
            <TableCell>Time Period</TableCell>
            <TableCell >Investment Type</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listOfRequests?.map((row) => 
          row.map((e)=>
          <React.Fragment >
        <TableRow>
          <TableCell>{e.investmentAmount}</TableCell>
          <TableCell>{e.timePeriod}</TableCell>
          <TableCell>{e.investmentType}</TableCell>
          
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
        <TableCell >Client Id</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell >Email Address</TableCell>
            <TableCell >Mobile Number</TableCell>
           
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
  const [listOfRequests,setListOfRequests] = useState([]) 

  axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/investments/advisor/${advisorId}`
   }).then((response)=>{
    
    setListOfRequests(response.data)
  console.log(listOfRequests)
  
    


   },(error)=>{


   })
  return (
    <div className="rectangle-div">
     <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
          <TableCell>Client Id</TableCell>
           <TableCell>Investment Amount</TableCell>
            <TableCell>Time Period</TableCell>
            <TableCell >Investment Type</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
        {listOfRequests?.map((row) => 
          
          <React.Fragment >
        <TableRow>
          <TableCell>{row.clientId}</TableCell>
          <TableCell>{row.investmentAmount}</TableCell>
          <TableCell>{row.timePeriod}</TableCell>
          <TableCell>{row.investmentType}</TableCell>
          
        </TableRow>
      </React.Fragment>

          )

}
          </TableBody></Table></TableContainer>
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
