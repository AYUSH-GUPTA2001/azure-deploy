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

function Dashboard(){

    const {clientId}=useParams()
    const navigate=useNavigate()    
    
    
   

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
 const [selectedOption, setSelectedOption] = useState('Portfolio');
 const handleLogout=()=>{
  navigate('/investor')
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
          <Tooltip title="Click to see your investments" placement="right-end"><li className="sidebar-item" onClick={() => handleOptionClick('Portfolio')} id={selectedOption==='Portfolio'?'active':''}>  <i className="material-icons">pie_chart</i> <span>Portfolio</span></li></Tooltip>
          {/* <li className="sidebar-item" onClick={() => handleOptionClick('Transactions')}><i className="material-icons">swap_horiz</i><span>Transactions</span></li> */}
          <Tooltip title="Click to make investment requests and to see the strategies" placement="right-end"> <li className="sidebar-item" onClick={() => handleOptionClick('New Investment')} id={selectedOption==='New Investment'?'active':''}><i className="material-icons">description</i><span>New Investment</span></li></Tooltip>
          {/* <li className="sidebar-item" onClick={() => handleOptionClick('Settings')}><i className="material-icons">settings</i><span>Settings</span></li> */}
        </ul>
      </div>
      <div className="content">
        {selectedOption === 'Portfolio' && <PortfolioContent clientId={clientId}/>}
        {/* {selectedOption === 'Transactions' && <TransactionsContent />} */}
        {selectedOption === 'New Investment' && <InvestmentContent clientId={clientId}/>}
        {/* {selectedOption === 'Settings' && <SettingsContent />} */}
      </div>
    </div>
  );
}

function PortfolioContent({clientId}) {
  const [advisorId,setAdvisorId]=useState("")
  const [data,setData]=useState([])
  const [open, setOpen] = useState(false);
  const [listOfStratgies,setListOfStrategies]=useState([])

  useEffect(()=>{
      
    axios({
      method:'get',
      url:`https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
    }).then((response)=>{
      response.data.map((e)=>{
        if(advisorId===""){
          console.log(e)
          setAdvisorId(e.advisorId)
          return
        }
      })
      
    },(error)=>{})
  },[])

  

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
},[listOfStratgies,advisorId])


const valueFormatter = (value) => `Rs.${value}`;
  return (
    <div className="portfolio">
      
      {/* Add your portfolio content here */}
      
      <div className="rectangle-div">
      <TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
        <TableCell />
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Name</TableCell>
            {/* <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Original Amount(Rs.)</TableCell> */}
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Amount(Rs.)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Expected Amount(Rs.)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {listOfStratgies?.map((row) => {
  if (row.status === 'Approved') {
    return (
      <React.Fragment >
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
          {/* <TableCell>{row.amount}</TableCell> */}
          <TableCell>{row.investmentAmount}</TableCell>
          <TableCell>{row.expectedAmount}</TableCell>
          <TableCell><Button sx={{width:'100px',borderRadius:'20px'}} variant="contained" color={row.status === 'Pending' ? 'primary' : 'success'}>{row.status}</Button></TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingRight:10,paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
          data: ['Invested ', 'Expected', ],
          scaleType: 'band',
          label:'Amount'
        },
      ]}
      
    
      series={[
        {
          color:'#b7d9ff',
          data: [row.investmentAmount,row.expectedAmount],
          label:'Amount',
          valueFormatter
        },
      ]}
      width={700}
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
       
   </div>
    </div>
  );
}

// function TransactionsContent() {
//   return (
//     <div>
//       <h1>Transactions Content</h1>
//       {/* Add your transactions content here */}
//     </div>
//   );
// }

function InvestmentContent({clientId}) {

  const [investmentAmount,setInvestmentAmount]=useState("")
  const [investmentType,setInvestmentType]=useState("")
  const [timePeriod,setTimePeriod]=useState("")


  const [investmentAmountError,setInvestmentAmountError]=useState(false)
  const [investmentTypeError,setInvestmentTypeError]=useState(false)
  const [timePeriodError,setTimePeriodError]=useState(false)
  
  
  const [message,setMessage]=useState("")
  const [advisorId,setAdvisorId]=useState("")

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
  const recommendationStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    overflow:'auto',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#e4f1ff',
    borderRadius:'20px',
    boxShadow: 24,
    p: 4,
  };   
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () =>{ 
    setOpen(false)
    setMessage("")

};


const [listOfStratgies,setListOfStrategies]=useState([])

const [recommendationsOpen, setRecommendationsOpen] = useState(false);
const handleRecommendationsOpen = () => setRecommendationsOpen(true);
const handleRecommendationsClose = () => setRecommendationsOpen(false);

useEffect(()=>{
  axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/investments/client/${clientId}?api-version=1`
  }).then((response)=>{
    response.data.map((e)=>setAdvisorId(e.advisorId))
    
  },(error)=>{})
})


//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

// const handleModalOpen=(value)=>{
//   handleOpen()
//   handleOptionClick(value)
// }
const handleModalSubmit=()=>{

  if(investmentAmount===""){
    setInvestmentAmountError(true)
    return
  }
  if(investmentType===""){
    setInvestmentTypeError(true)
    return
  }
  if(timePeriod===""){
    setTimePeriodError(true)
    return
  }

    const investmentData={
      
       
      
        "investmentID": "string",
        "clientId": clientId,
        "advisorId": "string",
        "investmentAmount": investmentAmount,
        "investmentType": investmentType,
        "timePeriod": timePeriod,
        "createdDate": "2023-10-26T13:58:26.103Z"
      
 
      
    }
  
    axios({
      method:'post',
      url:`https://investmentportal.azurewebsites.net/api/investments/New Investment?api-version=1`,
      data:investmentData
    }).then((response)=>{
      console.log(response)
      if(response.data.message==="Investment Successfully Generated"){
        setAdvisorId(response.data.investment.advisorId)
        setMessage("Investment Request Created.Soon Advisor Will Create Strategy For You.")
      }
      setInvestmentAmount("")
      setInvestmentType("")
      setTimePeriod("")
    },(error)=>{
      console.log(error)
      setMessage(error.response.data)
      setInvestmentAmount("")
      setInvestmentType("")
      setTimePeriod("")
    
    })
}
  
  function ChildModal(){
    const [investmentId,setInvestmentId]=useState('')
    const [Status,setStatus]=useState('')

    const [investmentIdError,setInvestmentIDError]=useState(false)
    const [statusError,setStatusError]=useState(false)

    const [childOpen,setChildOpen]=useState(false)
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);
    
    const handleApprove=()=>{
      handleChildOpen()
    }
    const handleChildSubmit=()=>{
      if(investmentId===""){
        setInvestmentIDError(true)
        return
      }
      if(Status===""){
        setStatusError(true)
        return
      }
      const investmentData={
        status: Status,
        remarks: ""
      }
      
      axios({
        method:'put',
        url:`https://investmentportal.azurewebsites.net/api/strategies/${investmentId}/Update-by-Client?api-version=1`,
        data:investmentData
      }).then((response)=>{
        console.log(response)
        handleChildClose()
        handleRecommendationsClose()
              },(error)=>{
        console.log(error)
      }
      
      
      )

    }

    return(<>
      <Button onClick={handleApprove}>Approve/Reject</Button>
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
          onChange={(e)=>setStatus(e.target.value) }
        >
          <MenuItem value={'Approved'}>Approve</MenuItem>
          <MenuItem value={'Rejected'}>Reject</MenuItem>
         
        
        </Select>
      </FormControl>
          
          <Button onClick={handleChildSubmit}>Submit</Button>
        </Box>
      </Modal></>

    )
  }
  const handleRecommendations=()=>{
  handleRecommendationsOpen()
  console.log("advisorId:"+advisorId)
  axios({
    method:'get',
    url:`https://investmentportal.azurewebsites.net/api/strategies/${clientId}/By-ClientId?api-version=1`
  }).then((response)=>{
    const list=response.data.strategies
    // list.map((e)=>setData([e.investmentAmount,e.expectedAmount,e.amount,e.returnPercentage]))
     setListOfStrategies(list)
     console.log(list)
  
  },(error)=>{})


}
  return (
    <div className="InvestmentContent">
<div className="rectangle-div-investment">
<div class="Investmentcontainer">
  <img src={image2} alt='' class="investmentbox"/>
  <img src={image3} alt='' class="investmentbox"/>
  
</div>
<div class="button-container">
<button class="my-button" onClick={handleOpen}><Tooltip title='Click to make Investment request'>Investment Requests</Tooltip></button>
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style} > {message?<><CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} /><Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography></>:<>
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
          <MenuItem value={'6 months'}>6 months</MenuItem>
          <MenuItem value={'1 year'}>1 year</MenuItem>
          <MenuItem value={'3 year'}>3 year</MenuItem>
          <MenuItem value={'5 year'}>5 year</MenuItem>
        
        </Select>
      </FormControl>
      </Grid>
              <Grid sx={{
                mt:1}}>
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
              <Button onClick={handleModalSubmit}>Submit</Button></>}
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
        <TableContainer component={Paper} sx={{overflow:'auto'}}>
        
      <Table   aria-label="simple table">
        <TableHead>
        <TableRow >
           <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Strategy Id</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Strategy Name</TableCell>
            {/* <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Original Amount(Rs.)</TableCell> */}
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Investment Amount(Rs.)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Expected Amount(Rs.)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>6 Months Return(%)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>1 year Return(%)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>3 year Return(%)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>5 year Return(%)</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {listOfStratgies?.map((row) => {
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
          <TableCell><Button sx={{width:'100px',borderRadius:'20px'}} variant="contained" color={row.status === 'Pending' ? 'primary' : 'error'}>{row.status}</Button></TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return null; // Exclude rows with status other than "pending"
})}
          </TableBody></Table></TableContainer><ChildModal/></Box>
          </Modal>
 
</div>
</div>

    </div>
  );
}

// function SettingsContent() {
//   return (
//     <div>
//       <h1>Settings Content</h1>
//       {/* Add your settings content here */}
//     </div>
//   );
// }

export default Dashboard