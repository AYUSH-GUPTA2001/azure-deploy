import * as React from 'react';
import { PhoneInput } from 'react-international-phone';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useState  } from 'react';
import axios from "axios";
import Tab from '@mui/material/Tab';
import 'react-international-phone/style.css';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate } from 'react-router-dom';
// import { PhoneInput } from 'react-international-phone';




export default function Login(){
    const [message,setMessage]=useState("")
    const [forgotMessage,setForgotMessage]=useState("")
    const [loading,setLoading]=useState(false)
    const [resetLoading,setResetLoading]=useState(false)
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [loginEmailError, setLoginEmailError] = useState(false)
    const [loginPasswordError, setLoginPasswordError] = useState(false)
    const navigate = useNavigate()

    const [address,setAddress]=useState("")
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [OTPloading,setOTPLoading]=useState(false)
    // const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [bankName, setBankName] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [ifscCode,setIfscCode]= useState("")
    const [panNumber,setPanNumber]= useState("")
    const [riskCapacity,setRiskCapacity]=useState("")
    const [OTP,setOTP]=useState("")
    const [forgotEmail,setForgotEmail]=useState('')
    const [resetOTP,setResetOTP]=useState('')
    const [resetPassword,setResetPassword]=useState('')
    const [confirmResetPassword,setConfirmResetPassword]=useState('')
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const [resetPasswordHelperText,setResetPasswordHelperText]=useState('')

  const [cResetPasswordHelperText,setCResetPasswordHelperText]=useState('')
  const [forgotEmailHelperText,setForgotEmailHelperText]=useState('')

    const [forgotEmailError,setForgotEmailError]=useState(false)
    const [resetOTPError,setResetOTPError]=useState(false)
    const [resetPasswordError,setResetPasswordError]=useState(false)
    const [confirmResetPasswordError,setConfirmResetPasswordError]=useState(false)
    const [passwordHelperText,setPasswordHelperText]=useState('')
    const [cPasswordHelperText,setCPasswordHelperText]=useState('')
  
    const [OTPError,setOTPError]=useState(false)
    const [buttonVisible, setButtonVisible] = useState(true);
    const [addressError,setAddressError]= useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [dateOfBirthError, setDateOfBirthError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [stateError, setStateError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [bankNameError,setBankNameError]=useState(false)
    const [accountNumberError,setAccountNumberError]=useState(false)
    const [panNumberError,setPanNumberError]=useState(false)
    const [ifscCodeError,setIfscCodeError]=useState(false)
    const [riskCapacityError,setRiskCapacityError]=useState(false)
    const [loginMessage,setLoginMessage]=useState("")


    const handleForgotPassword=()=>{
      handleForgotOpen()
    }

    const handleGetOTP=()=>{
      if(forgotEmail===''){
       setForgotEmailError(true)
       return
      }
      setOTPLoading(true)
      axios({
       method:'post',
       url:'https://investmentportal.azurewebsites.net/api/ClientSignUp/forgot-password?api-version=1',
       data:{email:forgotEmail}
      }).then((response)=>{
       console.log(response)
       setOTPLoading(false)
       setButtonVisible(false)
       setForgotEmailError(false)
       setForgotEmailHelperText('')
      },(error)=>{
        setOTPLoading(false)
        setForgotEmailHelperText(error.response.data.message)
        setForgotEmailError(true)
         console.log(error)
      })
}

const handleResetSubmit=()=>{
  setResetPasswordError(false)
  setResetOTPError(false)
  setConfirmResetPasswordError(false)
  setResetPasswordHelperText(false)
  setCResetPasswordHelperText(false)

  let count=0;
  if(resetOTP===''){
    setResetOTPError(true)
    count++
  }
  if(resetPassword===''){
    setResetPasswordError(true)
    count++
  }
  if(confirmResetPassword===''){
    setConfirmResetPasswordError(true)
    count++
  }
  if(count>=1){
    return
  }
  if (!resetPassword.match(passwordPattern)) {
    setResetPasswordError(true)
    setResetPasswordHelperText("Password must contain at least 8 characters, including at least one digit, one lowercase letter, and one uppercase letter.");
    return 
}

if (resetPassword !== confirmResetPassword) {
    setConfirmResetPasswordError(true)
    setCResetPasswordHelperText("Passwords do not match.");
    return 
}
  const resetData={
    "email": forgotEmail,
    "otp": resetOTP,
    "newPassword":  resetPassword,
    "confirmPassword": confirmResetPassword
  }
 setResetLoading(true)
 axios({
    method:'post',
    url:'https://investmentportal.azurewebsites.net/api/ClientSignUp/reset-password?api-version=1',
    data:resetData
  }).then((response)=>{
    setResetLoading(false)
     setForgotMessage(response.data.message)
     setForgotEmail('')
     setResetOTP('')
     setResetPassword('')
     setButtonVisible(true)
     setConfirmResetPassword('')
  },(error)=>{
      setResetLoading(false)
      setForgotMessage(error.response.data.message)
  })

}

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMessage("")
    setLoginMessage('')
    setOpen(false)};


    const [forgotOpen, setForgotOpen] = useState(false);
    const handleForgotOpen = () => setForgotOpen(true);
    const handleForgotClose = () => {
      setForgotMessage('')
      setForgotOpen(false)
      setForgotEmail('')
      setForgotEmailError(false)
      setResetOTP('')
      setButtonVisible(true)
      setOTPError(false)
      setResetPassword('')
      setResetPasswordError(false)
      setConfirmResetPassword('')
      setConfirmResetPasswordError(false)
      setForgotEmailHelperText('')
      setResetPasswordHelperText('')
      setCResetPasswordHelperText('')
    }; 

    // const dashboard="/advisor/dashboard"
    // const hash="#"
    const [value, setValue] = React.useState('2');

    const handleChange = (event, newValue) => {
      setValue(newValue);
      setEmail('')
      setLoginEmail('')
    }; 
    const handleSubmit = (event) => {
        //  const data = new FormData(event.currentTarget);
        event.preventDefault();
        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setAddressError(false)
        setDateOfBirthError(false)
        setPhoneError(false)
        setCityError(false)
        setStateError(false)
        setConfirmPasswordError(false)
        setPasswordHelperText("")
        setCPasswordHelperText("")

let count=0;
    
        if (firstName === '') {
          setFirstNameError(true)
          count++
      }
        if (lastName === '') {
          setLastNameError(true)
          count++
      } 
        if(address===""){
          setAddressError(true)
        count++
        }
        if (email === '') {
        setEmailError(true)
        count++
      }
        if (phone === '') {
        setPhoneError(true)
        count++
      }
    
      if (dateOfBirth === '') {
        setDateOfBirthError(true)
      count++
    }
      if (city === '') {
        setCityError(true)
        count++
    } 
      if (state === '') {
      setStateError(true)
      count++
    }
      if (password === '') {
      setPasswordError(true)
    count++
    }
    if (confirmPassword === '') {
      setConfirmPasswordError(true)
       count++
      return
    }

    if(count>=1){
      return
    }
    if (!password.match(passwordPattern)) {
      setPasswordError(true)
      setPasswordHelperText("Password must contain at least 8 characters, including at least one digit, one lowercase letter, and one uppercase letter.");
      return 
  }
  
  if (password !== confirmPassword) {
      setConfirmPasswordError(true)
      setCPasswordHelperText("Passwords do not match.");
      return 
  }


   handleOpen();
    // console.log(dateOfBirth)

 
    
    
        }
        const [verifyOpen, setVerifyOpen] = React.useState(false);
  const handleVerifyOpen = () => setVerifyOpen(true);
  const handleVerifyClose = () => {
    setMessage("")
    setVerifyOpen(false)};

    const handleVerify=(e)=>{
    handleVerifyOpen()
    



}
const handleOTPSubmit=(e)=>{
  setOTPError(false)
  if(OTP===""){
    setOTPError(true)
    return
  }
 const otpData = {
    "email": email===''?loginEmail:email,
    "otp": OTP
  }
  console.log(otpData)
  setOTPLoading(true)
  axios({
    method:'post',
    url:'https://investmentportal.azurewebsites.net/api/ClientSignUp/verify-otp?api-version=1',
    data:otpData
  }).then((response)=>{
    setOTPLoading(false)
    console.log(response)
       setMessage(response.data.message)
       setLoginMessage(response.data.message)
       setOTP('')
       setFirstName("")
              setLastName("")
              setDateOfBirth("")
              setEmail("")
              setPhone("")
              setCity("")
              setState("")
              setAddress("")
              setAccountNumber("")
              setBankName("")
              setIfscCode("")
              setPanNumber("")
              setRiskCapacity("")
              setPassword("")
              setConfirmPassword("")
          
            
  },(error)=>{
    setOTPLoading(false)
    console.log(error)
      if(error.response.data.message==="Invalid OTP."){
        setOTPError(true)
      }
  })
}


    const handleModalSubmit=(event)=>{
      event.preventDefault();
      setBankNameError(false)
      setAccountNumberError(false)
      setPanNumberError(false)
      setIfscCodeError(false)
      setRiskCapacityError(false)
  let count=0;
      if (bankName === '') {
          setBankNameError(true)
          count++
      }
      if (ifscCode === '') {
          setIfscCodeError(true)
          count++
      }
      if (panNumber === '') {
        setPanNumberError(true)
        count++
    }
    if (accountNumber === '') {
        setAccountNumberError(true)
        count++
    }
    if (riskCapacity === '') {
      setRiskCapacityError(true)
      count++
      return
  }

  if(count>=1){
return
  }
      const investorData={
        "clientId":'string',
        "advisorId":  'string',
        "firstName": firstName,
        "lastName" :  lastName,
        "email":     email,
        "password":  password,
        "confirmPassword": confirmPassword,
        "phoneNumber":  phone.replace(/[()\s+\-]/g, '').slice(-10),
        "address":address,
        "city": city,
        "state":  state,
        "pincode":"123456",
        "bankName":bankName,
        "accountNumber":accountNumber,
        "ifscCode":ifscCode,
        "panNumber":panNumber,
        "isProfileComplete":true
      
      }
      setLoading(true)
      axios({
        method:"post",
        url:"https://investmentportal.azurewebsites.net/api/ClientSignUp/signup?api-version=1",
        data:investorData
    }).then(function(response){
      setLoading(false)
      console.log(response.data.message)
      if(response.data.message==="OTP sent to your email for verification."){
        handleVerify()
      }
         if(response.data.message==="User registered successfully!"){
          setMessage(response.data.message)
              
              
              setFirstName("")
              setLastName("")
              setDateOfBirth("")
              setEmail("")
              setPhone("+91")
              setCity("")
              setState("")
              setAddress("")
              setAccountNumber("")
              setBankName("")
              setIfscCode("")
              setPanNumber("")
              setRiskCapacity("")
              setPassword("")
              setConfirmPassword("")
            
         }
           
        
       
     } , function(error){
            setLoading(false)
             console.log(error)
             if(error.response.data.message){
              setMessage(error.response.data.message)
            }
    }) 
}    
    const handleLoginSubmit = (event) => {
      event.preventDefault();
      
  
      setLoginEmailError(false)
      setLoginPasswordError(false)
  
      if (loginEmail === '') {
          setLoginEmailError(true)
          return
      }
      if (loginPassword === '') {
          setLoginPasswordError(true)
          return
      }
  const investorData={
        email:loginEmail,
        password:loginPassword,
        firstName:'string'
  }
  setLoading(true)
      axios({
        method:"post",
        url:"https://investmentportal.azurewebsites.net/api/ClientSignUp/login?api-version=1",
        data:investorData
    }).then(function(response){
      setLoading(false)
          console.log(response) 
          if(response.data.message==="Login successful!" || response.data.message==="Profile is not complete. Please provide the missing information."){
            const clientId=response.data.client.clientId
            navigate(`/investor/dashboard/${clientId}`)
          }
        
       
     } , function(error){
      setLoading(false)
      if(error.response.data.message==='Invalid email or password.'){
        setLoginMessage(error.response.data.message)
        handleOpen()
        return
      }
      if(error.response.data.message==="User is not verified."){
      handleOpen()
      return
      }
      setLoginMessage(error.response.data.message)
      console.log(error)
      handleOpen()
    })
    }
  return (
    
    <Grid container spacing={7} item xs={12} sx={{backgroundColor:"#e4f1ff"}} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
             
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sign Up" value="1" />
            <Tab label="Log In" value="2" />
           
          </TabList>
        </Box>
        <TabPanel value="1">
       
            
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  margin="dense"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={firstName}
                  error={firstNameError}
                  onChange={e => setFirstName(e.target.value)}
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
                  value={lastName}
                  error={lastNameError}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              
              </Grid>
              
              <TextField
                size="small"
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                error={emailError}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <DateField  value={dateOfBirth}
                error={dateOfBirthError}
                onChange={value => setDateOfBirth(value)}
                required size="small"
               margin="dense" label="Date of Birth" />
      
    </LocalizationProvider>
              </Grid>

            <Grid item xs={12} sm={6}>
             
            <PhoneInput
                  placeholder='phone Number'
                  style={{"padding": "10px 0px",
                  "--react-international-phone-border-color" : "#bab2b2",
                  "--react-international-phone-background-color":"#e4f1ff" ,
                  '--react-international-phone-dropdown-item-background-color' : "black",
                  '--react-international-phone-dropdown-item-text-color' : 'white',
                  
                  '--react-international-phone-country-selector-background-color-hover' : "#bab2b2"
                }}
               
                inputStyle ={ {
                  "width" : "136px"
                  }}
                  defaultCountry="in"
                  name="phoneNumber"
                  value={phone}
                  
                  error={phoneError}
                  onChange={(phone) => setPhone(phone)}
                />
            </Grid>
          </Grid>
          
              
              
              <TextField
                name="address"
                value={address}
                error={addressError}
                onChange={e => setAddress(e.target.value)}
                size="small"
                margin="dense"
                required
                fullWidth
                id="outlined-multiline-flexible"
                label="Address"
                multiline
                maxRows={4}
        />
        <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  margin="dense"
                  name="city"
                  value={city}
                  error={cityError}
                  onChange={e => setCity(e.target.value)}
                  required
                  fullWidth
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
                  id="state"
                  label="State"
                  name="state"
                  value={state}
                  error={stateError}
                  onChange={e => setState(e.target.value)}
                />
              </Grid>
              </Grid>
        <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                margin="dense"
                required
                fullWidth
                helperText={passwordHelperText}
                name="password"
                value={password}
                  error={passwordError}
                  onChange={e => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /></Grid>
              
              <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                margin="dense"
                required
                fullWidth
                helperText={cPasswordHelperText}
                name="password"
                value={confirmPassword}
                  error={confirmPasswordError}
                  onChange={e => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              
              />
             </Grid>
             </Grid>
              <Button
                
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
         {message?<Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>:<> <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Fill Mandatory Fields For Starting Investment
          </Typography>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                
                  margin="dense"
                  autoComplete="given-name"
                  name="bankName"
                  required
                  fullWidth
                  value={bankName}
                  error={bankNameError}
                  onChange={e => setBankName(e.target.value)}
                  id="bankName"
                  label="Bank Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  margin="dense"
                  required
                  fullWidth
                  id="accountNumber"
                  label="Account Number"
                  name="accountNumber"
                  value={accountNumber}
                  error={accountNumberError}
                  onChange={e => setAccountNumber(e.target.value)}
                  
                />
              </Grid>
              
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  margin="dense"
                  autoComplete="given-name"
                  name="ifscCode"
                  required
                  fullWidth
                  value={ifscCode}
                  error={ifscCodeError}
                  onChange={e => setIfscCode(e.target.value)}
                  id="ifscCode"
                  label="IFSC Code"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
              
                  margin="dense"
                  required
                  fullWidth
                  id="panNumber"
                  label="PAN Number"
                  name="panNumber"
                  value={panNumber}
                  error={panNumberError}
                  onChange={e => setPanNumber(e.target.value)}
                  
                />
              </Grid>
              
              </Grid>
              <Grid sx={{mt:1}}>
              <FormControl required fullWidth>
        <InputLabel id="demo-simple-select-label">Risk Capacity</InputLabel>
        <Select
          
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Risk Capacity"
          value={riskCapacity}
          error={riskCapacityError}
          onChange={e => setRiskCapacity(e.target.value)}
        >
          <MenuItem value={'Low Risk'}>Low Risk(Gold,Fixed Income assets,Bonds etc)</MenuItem>
          <MenuItem value={'High Risk'}>High Risk(Equity,Future,Options etc)</MenuItem>
          <MenuItem value={'Medium Risk'}>Medium Risk(Mixed of Low and High Risk)</MenuItem>
        </Select>
      </FormControl>
      </Grid>
              {loading?<LoadingSpinner/>:<Button onClick={handleModalSubmit}>Create Account</Button>}</>}
        </Box>
      </Modal>
      <Modal
        open={verifyOpen}
        onClose={handleVerifyClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
        <CloseIcon color="primary" onClick={handleVerifyClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
      {message?<Typography id="modal-modal-title" variant="h6" component="h2">
        {message}
      </Typography>:<><Typography id="modal-modal-title" variant="h6" component="h2">
        Enter OTP sent For Email Verification
      </Typography><TextField
                size="small"
                margin="dense"
                required
                onChange={e => setOTP(e.target.value)}
                name="OTP"
                fullWidth
                value={OTP}
                error={OTPError}
                label="Enter OTP"
                type="OTP"
                id="OTP"
                autoComplete="OTP"
              /> {OTPloading?<LoadingSpinner/>:<Button
              onClick={handleOTPSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Verify OTP
            </Button>}</>}</Box></Modal>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box></TabPanel>
        <TabPanel value="2">
            
            <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 8 }}>
            <TextField
                size="small"
                margin="dense"
              
                required
                onChange={e => setLoginEmail(e.target.value)}
                name="email"
                fullWidth
                id="email"
                label="Email Address"
                value={loginEmail}
                error={loginEmailError}
                autoComplete="email"
                autoFocus
              />
              <TextField
                size="small"
                margin="dense"
                required
                onChange={e => setLoginPassword(e.target.value)}
                name="password"
                fullWidth
                value={loginPassword}
                error={loginPasswordError}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
           
              {loading?<LoadingSpinner/>:<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Sign In
              </Button>}
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
        <CloseIcon color="primary" onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
      {loginMessage?<Typography id="modal-modal-title" variant="h6" component="h2">
        {loginMessage}
      </Typography>:<><Typography id="modal-modal-title" variant="h6" component="h2">
        Enter OTP sent For Email Verification
      </Typography><TextField
                size="small"
                margin="dense"
                required
                onChange={e => setOTP(e.target.value)}
                name="OTP"
                fullWidth
                value={OTP}
                error={OTPError}
                label="Enter OTP"
                type="OTP"
                id="OTP"
                autoComplete="OTP"
              /> {OTPloading?<LoadingSpinner/>:<Button
              onClick={handleOTPSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Verify OTP
            </Button>}</>}</Box></Modal>

{/*               
              {
                email&&password?
              <Button
                
                href={email&&password?dashboard:hash}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Sign In
              </Button>
              :<Button
                
              
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Sign In
            </Button>} */}
              <Grid container>
                <Grid item xs>
                  <Link onClick={handleForgotPassword} href="#"  variant="body2">
                    Forgot password?
                  </Link>
                  <Modal
        open={forgotOpen}
        onClose={handleForgotClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
        <CloseIcon color="primary" onClick={handleForgotClose} style={{ position: "absolute", top: "10px", right: "10px" }} />
      {forgotMessage?<Typography id="modal-modal-title" variant="h6" component="h2">
        {forgotMessage}
      </Typography>:<><Typography id="modal-modal-title" variant="h6" component="h2">
        Reset Password
      </Typography><TextField
                size="small"
                margin="dense"
                required
                onChange={e => setForgotEmail(e.target.value)}
                name="forgotEmail"
                helperText={forgotEmailHelperText}
                fullWidth
                value={forgotEmail}
                error={forgotEmailError}
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
              />{buttonVisible&&(OTPloading?<LoadingSpinner/>:<Button
              onClick={handleGetOTP}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Get OTP
            </Button>)} 
            <TextField
                size="small"
                margin="dense"
                required
                onChange={e => setResetOTP(e.target.value)}
                name="resetOTP"
                fullWidth
                value={resetOTP}
                error={resetOTPError}
                label="Enter OTP"
                type="password"
                id="password"
                autoComplete="password"
              />
            <TextField
                size="small"
                margin="dense"
                required
                onChange={e => setResetPassword(e.target.value)}
                name="resetPassword"
                fullWidth
                helperText={resetPasswordHelperText}
                value={resetPassword}
                error={resetPasswordError}
                label="Enter Password"
                type="password"
                id="password"
                autoComplete="password"
              />
              <TextField
                size="small"
                margin="dense"
                required
                helperText={cResetPasswordHelperText}
                onChange={e => setConfirmResetPassword(e.target.value)}
                name="confirmResetPassword"
                fullWidth
                value={confirmResetPassword}
                error={confirmResetPasswordError}
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="password"
              />
            {resetLoading?<LoadingSpinner/>:<Button
              onClick={handleResetSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Reset Password
            </Button>}</>}</Box></Modal>
                </Grid>
                <Grid item>
                  <Link href="#" value="1" onClick={(e)=> setValue("1")}  variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box></TabPanel>
       
      </TabContext>
            
          </Box>
        </Grid>
    
  )

        }
