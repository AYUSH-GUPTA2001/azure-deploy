import * as React from 'react';
import { PhoneInput } from 'react-international-phone';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import {  Typography } from '@material-ui/core'
import { useState  } from 'react';
import axios from "axios";
import Tab from '@mui/material/Tab';
import 'react-international-phone/style.css';
import TabContext from '@mui/lab/TabContext';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import { Alert } from '@mui/lab';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

// import { PhoneInput } from 'react-international-phone';


export default function Login(){

  const navigate = useNavigate()
  React.useEffect(()=>{
   var storedUser = localStorage.getItem('advisorUser');
   if (storedUser) {
     var advisorUser = JSON.parse(storedUser);
     var timeoutId = setTimeout(()=>{localStorage.removeItem('advisorUser')}, 1 * 60 * 1000)
    
  
     navigate(`/advisor/dashboard/${advisorUser.advisorId}`)
     
 
   
     // Do something with the user information, e.g., display a welcome message
 }},[] )
  const [message,setMessage]=useState("")
  const [phoneMessage,setPhoneMessage]=useState('')
  const [forgotMessage,setForgotMessage]=useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginEmailError, setLoginEmailError] = useState(false)
  const [loginPasswordError, setLoginPasswordError] = useState(false)
  const [loading,setLoading]=useState(false)
  const [OTPloading,setOTPLoading]=useState(false)
  const [resetLoading,setResetLoading]=useState(false)
  const [resetOTPHelperText,setResetOTPHelperText]=useState('')
  const [address,setAddress]=useState("")
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  // const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [OTP,setOTP]=useState("")
  const phoneNumberPattern = /^\+[0-9](?:[0-9] ?|-){11,13}[0-9]$/;
  
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const [passwordHelperText,setPasswordHelperText]=useState('')
  const [resetPasswordHelperText,setResetPasswordHelperText]=useState('')
  const [cPasswordHelperText,setCPasswordHelperText]=useState('')
  const [cResetPasswordHelperText,setCResetPasswordHelperText]=useState('')
  const [forgotEmailHelperText,setForgotEmailHelperText]=useState('')
  const [forgotEmail,setForgotEmail]=useState('')
  const [resetOTP,setResetOTP]=useState('')
  const [resetPassword,setResetPassword]=useState('')
  const [confirmResetPassword,setConfirmResetPassword]=useState('')
  const [show,setShow]=useState(false)
  const [signShow,setSignShow]=useState(false)

  const [verifyMessage,setVerifyMessage]=useState('')
  const [forgotEmailError,setForgotEmailError]=useState(false)
  const [resetOTPError,setResetOTPError]=useState(false)
  const [resetPasswordError,setResetPasswordError]=useState(false)
  const [confirmResetPasswordError,setConfirmResetPasswordError]=useState(false)
  const [OTPError,setOTPError]=useState(false)
  const [verifyOTPHelperText,setVerifyOTPHelperText]=useState('')
  const [addressError,setAddressError]= useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [companyError, setCompanyError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [loginMessage,setLoginMessage]=useState("")
  const [buttonVisible, setButtonVisible] = useState(true);
  const [emailVisible,setEmailVisible]=useState(true)
  const [verifyText,setVerifyText]=useState(false)

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
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event,reason) => {
    if(reason!=='backdropClick'){
    setMessage('')
    setOTP('')
    setOTPError(false)
    setLoginMessage('')
    setVerifyMessage('')
    setVerifyOTPHelperText('')
    setOpen(false)}};

    const [forgotOpen, setForgotOpen] = useState(false);
    const handleForgotOpen = () => setForgotOpen(true);
    const handleForgotClose = (event,reason) => {
      if(reason!=='backdropClick'){
      setForgotMessage('')
      setForgotOpen(false)
      setForgotEmail('')
      setForgotEmailError(false)
      setResetOTP('')
      setResetOTPError(false)
      setResetOTPHelperText('')
      setButtonVisible(true)
      setOTPError(false)
      setResetPassword('')
      setResetPasswordError(false)
      setConfirmResetPassword('')
      setEmailVisible(true)
      setConfirmResetPasswordError(false)
      setForgotEmailHelperText('')
      setResetPasswordHelperText('')
      setCResetPasswordHelperText('')
    }};  
      
      
    
    // const dashboard="/advisor/dashboard"
    // const hash="#"
    const [value, setValue] = React.useState('2');

    const handleChange = (event, newValue) => {
      setValue(newValue);
      setEmail('')
      setFirstName('')
      setLastName('')
      setCompany('')
      setAddress('')
      setCity('')
      setState('')
      setConfirmPassword('')
      setPassword('')
      setPhone('')
      setLoginPassword('')
      setLoginMessage('')
      setMessage('')
      setLoginEmail('')
    }; 
    const handleForgotPassword=()=>{
      setLoginEmail('')
      setLoginPassword('')
      setLoginMessage('')
      setMessage('')
      setVerifyMessage('')
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
            url:'https://investmentportal.azurewebsites.net/api/AdvisorSignUp/forgot-password?api-version=1',
            data:{email:forgotEmail}
           }).then((response)=>{
            console.log(response)
                setOTPLoading(false)
                setButtonVisible(false)
                setEmailVisible(false)
                setForgotEmailError(false)
                setForgotEmailHelperText('')
           },(error)=>{
              setOTPLoading(false)
              setForgotEmailHelperText(error.response.data.message)
              setForgotEmailError(true)
              console.log(error)
           })
    }
    const handleOTPSubmit=(e)=>{
      setOTPError(false)
      setVerifyOTPHelperText('')
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
        url:'https://investmentportal.azurewebsites.net/api/AdvisorSignUp/verify-otp?api-version=1',
        data:otpData
      }).then((response)=>{
        setOTPLoading(false)
        console.log(response)
           setMessage(response.data.message)
          //  setLoginMessage(response.data.message)
          setVerifyMessage(response.data.message)
           setOTP('')
           setFirstName('')
           setVerifyText(false)
           setLoginEmail('')
       setLoginPassword('')
                setLastName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setPhone('+91')
                setCompany('')
                setCity('')
                setState('')
                setAddress('')
              setVerifyOTPHelperText('')
                
      },(error)=>{
        debugger
        setOTPLoading(false)
        console.log(error)
          if(error.response.data.message==="Invalid OTP."){
            setOTPError(true)
            setVerifyOTPHelperText(error.response.data.message)
            return
          }
          else{
            setVerifyOTPHelperText(error.response.data.message)
          }
      })
    }

    
    const handleSubmit = (event) => {
        //  const data = new FormData(event.currentTarget);
        event.preventDefault();
        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setPasswordError(false)
        setAddressError(false)
        setCompanyError(false)
        setPhoneError(false)
        setCityError(false)
        setStateError(false)
        setConfirmPasswordError(false)
        setPasswordHelperText('')
        setCPasswordHelperText('')
    
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
    
      if (company === '') {
        setCompanyError(true)
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
      return
    }
    if(count>=1){
       return
    }
    if(!phone.match(phoneNumberPattern)){
      setPhoneMessage("Enter Valid Mobile Number")
      setTimeout(() => {
        setPhoneMessage('');
      }, 4000);
      return
    }
    if (!password.match(passwordPattern)) {
      setPasswordError(true)
      setPasswordHelperText("Password must contain at least 8 characters, 1 digit, 1 lowercase letter,1 uppercase letter");
      return 
  }
  
  if (password !== confirmPassword) {
      setConfirmPasswordError(true)
      setCPasswordHelperText("Passwords do not match.");
      return 
  }


    
    const advisorData={
      
      "advisorId":"string",
      "firstName": firstName,
      "lastName" :  lastName,
      "email":     email,
      "password":  password,
      "confirmPassword": confirmPassword,
      "phoneNumber":  phone.replace(/[()\s+\-]/g, ''),
      "address":address,
      "city": city,
      "state":  state,
      "pincode":"123456",
  
    
    }
    setLoading(true)
    axios({
                method:"post",
                url:"https://investmentportal.azurewebsites.net/api/AdvisorSignUp/signup?api-version=1",
                data:advisorData
            }).then(function(response){
              setLoading(false)
              console.log(response)
                  
                  handleOpen()
                
               
             } , function(error){
              setLoading(false)
              console.log(error)
                    if(error.response.data.message){
                      setMessage(error.response.data.message)
                    }else{
                    setMessage("Email Invalid or Passwords dont match")
                    }
                    handleOpen()
            }) 
        }

    // const handleLoginVerify=(e)=>{
    // handleOpen()
    // }
const handleResetSubmit=()=>{
  setResetPasswordError(false)
  setResetOTPError(false)
  setResetOTPHelperText('')
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
    url:'https://investmentportal.azurewebsites.net/api/AdvisorSignUp/reset-password?api-version=1',
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
      // setForgotMessage(error.response.data.message)
      if(error.response.data.message==='Invalid OTP.'){
      setResetOTPHelperText(error.response.data.message)
      setResetOTPError(true)
    }
    else{
      setForgotMessage(error.response.data.message)
    }
  })

}
    const handleLoginSubmit = (event) => {
      event.preventDefault();
      setLoginMessage('');
      setVerifyText(false)
  
      setLoginEmailError(false)
      setLoginPasswordError(false)
  
      let isError = false;
      if (loginEmail === '') {
          setLoginEmailError(true)
          isError = true;
      }
      if (loginPassword === '') {
          setLoginPasswordError(true)
          isError = true;
      }

      if(isError) return;
  const advisorData={
        email:loginEmail,
        password:loginPassword,
        firstName:'string'
  }
  setLoading(true)
      axios({
        method:"post",
        url:"https://investmentportal.azurewebsites.net/api/AdvisorSignUp/login?api-version=1",
        data:advisorData
    }).then(function(response){
      setLoading(false)
       
        if(response.data.message==="Login successful!"){
          const advisor=response.data.advisor
        
          const advisorId= response.data.advisor.advisorId
          const firstName= response.data.advisor.firstName
          var advisorUser = {
            Expirationtimestamp: new Date().getTime() + 30 * 60000,
            TimeLeft : 30 * 60
          };
          
        
          localStorage.setItem(advisorId, JSON.stringify(advisorUser));
          navigate(`/advisor/dashboard/${advisorId}`)
        }
       
     } , function(error){
      setLoading(false)
      
      if(error.response.data.message==='Invalid email or password.'){
        setLoginMessage(error.response.data.message)
       // handleOpen()
        return
      }
      if(error.response.data.message==="Account not verified. A new OTP has been sent to your email. Please provide the OTP to complete the verification."){
        //  setLoginMessage(error.response.data.message)
      
      setVerifyText(true)  
      handleOpen()
      return
      }
      if(error.response.data.errors){
        setLoginMessage('Invalid Email Address')
        return
      }
      setLoginMessage(error.response.data.message)
      
      console.log(error)
      // handleOpen()
    
    })
    }
  return (
    <>
     <Tooltip title='Back to Homepage'>
      <CloseIcon sx={{color:'#4b49ac'}} onClick={()=>navigate('/')} style={{ position: "absolute", top: "10px", right: "10px" ,cursor:'pointer'}} />
      </Tooltip>
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
                <TextField sx={{color:'#4b49ac'}}
              
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
                <TextField sx={{color:'#4b49ac'}}
              
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
              
              <TextField sx={{color:'#4b49ac'}}
              
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
                <TextField sx={{color:'#4b49ac'}}
            
                  size="small"
                  margin="dense"
                  name="company"
                  value={company}
                  error={companyError}
                  onChange={e => setCompany(e.target.value)}
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  autoFocus
                />
              </Grid>

            <Grid item xs={12} sm={6}>
            <PhoneInput
                  className='phonefield'
                  placeholder='phone Number'
                  style={{"padding": "10px 0px",
                  "--react-international-phone-border-color" : "#bab2b2",
                  "--react-international-phone-background-color":"#e4f1ff" ,
                 
                  '--react-international-phone-dropdown-z-index':'100',
                  
                  '--react-international-phone-country-selector-background-color-hover' : "#bab2b2"
                }}
              
                
                inputStyle ={ {
                  "width" : "136px",
                
                  }}
                  defaultCountry="in"
                  name="phoneNumber"
                  value={phone}
                  
                  error={phoneError}
                  onChange={(phone) => setPhone(phone)}
                />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField sx={{color:'#4b49ac'}}
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
                <TextField sx={{color:'#4b49ac'}}
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
              <TextField sx={{color:'#4b49ac'}}
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
      
             
              <TextField sx={{color:'#4b49ac'}}
                size="small"
                margin="dense"
                required
                fullWidth
                name="password"
                helperText={passwordHelperText}

                value={password}
                  error={passwordError}
                  onChange={e => setPassword(e.target.value)}
                label="Password"
                type={signShow?'text':'password'}
                id="password"
                autoComplete="current-password"
              />
              
              
              <TextField sx={{color:'#4b49ac'}}
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
                type={signShow?'text':'password'}
                id="confirmPassword"
              
              />
             {phoneMessage? <Alert severity='error' >*{phoneMessage}</Alert>:''}
             <input onClick={()=>setSignShow(!signShow)} type="checkbox" id="showPassword" />
                <label  for="showPassword"> Show Password</label><br/>
             {loading?<Button
                
                fullWidth
                variant="contained"
                sx={{ mt: 0.5, mb: 1 }}
              >
                <i class="fa fa-spinner fa-spin"></i> 
              </Button>:<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0.5, mb: 1 }}
              >
               Sign In
              </Button>}
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
        <CloseIcon sx={{color:'#4b49ac'}} onClick={handleClose} style={{ cursor:'pointer',position: "absolute", top: "10px", right: "10px" }} />
      {message?<Typography color="primary" id="modal-modal-title" variant="h6" component="h2">
        {message}
      </Typography>:<>

        {/* {!verifyText?<><Typography color="primary" id="modal-modal-title" variant="h6" component="h2">
          You are not Verified.Enter OTP sent to the Email</Typography></>:
          <> */}
          <Typography color="primary" id="modal-modal-title" variant="h6" component="h2">Enter OTP sent to the Email</Typography>
          {/* </>
          } */}
    <TextField sx={{color:'#4b49ac'}}
                size="small"
                margin="dense"
                required
                onChange={e => setOTP(e.target.value)}
                name="OTP"
                fullWidth
                helperText={verifyOTPHelperText}
                // helperText='hi'
                value={OTP}
                error={OTPError}
                label="Enter OTP"
                type="OTP"
                id="OTP"
                autoComplete="OTP"
              /> {OTPloading? <Button
              
              
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <i class="fa fa-spinner fa-spin"></i> 
              </Button> :<Button
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
            <TextField sx={{color:'#4b49ac'}}
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
              <TextField sx={{color:'#4b49ac'}}
                size="small"
                margin="dense"
                required
                onChange={e => setLoginPassword(e.target.value)}
                name="password"
                fullWidth
                value={loginPassword}
                error={loginPasswordError}
                label="Password"
                type={show?'text':'password'}
                id="password"
                autoComplete="current-password"
              />
              <input onClick={()=>setShow(!show)} type="checkbox" id="showPassword" />
                <label  for="showPassword"> Show Password</label><br/>
           {loginMessage? <Alert severity='error'>*{loginMessage}</Alert>: loginMessage}
           {loading?
           <Button
           fullWidth
           variant="contained"
           sx={{ mt: 0.5, mb: 2 }}
         >
          <i class="fa fa-spinner fa-spin"></i> 
         </Button>
           :<Button
                onClick={handleLoginSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0.5, mb: 2 }}
              >
               Sign In
              </Button>}
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><Box sx={style} >
        <CloseIcon sx={{color:'#4b49ac'}} onClick={handleClose} style={{ cursor: 'pointer',position: "absolute", top: "10px", right: "10px" }} />
      {verifyMessage?<Typography id="modal-modal-title" variant="h6" component="h2">
        {verifyMessage}
      </Typography>:<><Typography id="modal-modal-title" variant="h6" component="h2">
        Enter OTP sent For Email Verification
      </Typography><TextField sx={{color:'#4b49ac'}}
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
              /> {OTPloading?<Button
              
              
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               <i class="fa fa-spinner fa-spin"></i> 
              </Button>:<Button
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
        <CloseIcon sx={{color:'#4b49ac'}} onClick={handleForgotClose} style={{cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }} />
      {forgotMessage?<Typography id="modal-modal-title" variant="h6" component="h2">
        {forgotMessage}
      </Typography>:<><Typography id="modal-modal-title" variant="h6" component="h2">
        Reset Password
      </Typography>{emailVisible&&<TextField sx={{color:'#4b49ac'}}
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
              />}{buttonVisible&&(OTPloading?<Button
              
              
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              > <i class="fa fa-spinner fa-spin"></i> 
          
              </Button>:<Button
              onClick={handleGetOTP}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Get OTP
            </Button>)} 
            {!buttonVisible&&<><TextField sx={{color:'#4b49ac'}}
                size="small"
                margin="dense"
                required
                onChange={e => setResetOTP(e.target.value)}
                name="resetOTP"
                fullWidth
                helperText={resetOTPHelperText}
                value={resetOTP}
                error={resetOTPError}
                label="Enter OTP"
                type="password"
                id="password"
                autoComplete="password"
              />
            <TextField sx={{color:'#4b49ac'}}
                size="small"
                margin="dense"
                required
                helperText={resetPasswordHelperText}
                onChange={e => setResetPassword(e.target.value)}
                name="resetPassword"
                fullWidth
                value={resetPassword}
                error={resetPasswordError}
                label="Enter Password"
                type="password"
                id="password"
                autoComplete="password"
              />
              <TextField sx={{color:'#4b49ac'}}
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
            {resetLoading?<Button
              
            
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             <i class="fa fa-spinner fa-spin"></i> 
            </Button> :<Button
              onClick={handleResetSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Reset Password
            </Button>}</>}</>}</Box></Modal>
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
    </>
  )

        }
