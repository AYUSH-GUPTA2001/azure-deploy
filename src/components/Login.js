import * as React from 'react';
import { PhoneInput } from 'react-international-phone';
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
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

// import { PhoneInput } from 'react-international-phone';


export default function Login(){

  const navigate=useNavigate()
  const [message,setMessage]=useState("")
  const [forgotMessage,setForgotMessage]=useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginEmailError, setLoginEmailError] = useState(false)
  const [loginPasswordError, setLoginPasswordError] = useState(false)
  const [loading,setLoading]=useState(false)
  const [OTPloading,setOTPLoading]=useState(false)
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

  const [forgotEmail,setForgotEmail]=useState('')
  const [resetOTP,setResetOTP]=useState('')
  const [resetPassword,setResetPassword]=useState('')
  const [confirmResetPassword,setConfirmResetPassword]=useState('')


  const [forgotEmailError,setForgotEmailError]=useState(false)
  const [resetOTPError,setResetOTPError]=useState(false)
  const [resetPasswordError,setResetPasswordError]=useState(false)
  const [confirmResetPasswordError,setConfirmResetPasswordError]=useState(false)
  const [OTPError,setOTPError]=useState(false)
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
  const handleClose = () => {
    setMessage('')
    setLoginMessage('')
    setOpen(false)};

    const [forgotOpen, setForgotOpen] = useState(false);
    const handleForgotOpen = () => setForgotOpen(true);
    const handleForgotClose = () => {
      setForgotMessage('')
      setForgotOpen(false)};  
    
    // const dashboard="/advisor/dashboard"
    // const hash="#"
    const [value, setValue] = React.useState('2');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }; 
    const handleForgotPassword=()=>{
      handleForgotOpen()
    }
    const handleGetOTP=()=>{
           if(forgotEmail===''){
            setForgotEmailError(true)
            return
           }
           axios({
            method:'post',
            url:'https://investmentportal.azurewebsites.net/api/AdvisorSignUp/forgot-password?api-version=1',
            data:{email:forgotEmail}
           }).then((response)=>{
            console.log(response)
                setButtonVisible(false)
           },(error)=>{
              console.log(error)
           })
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
        url:'https://investmentportal.azurewebsites.net/api/AdvisorSignUp/verify-otp?api-version=1',
        data:otpData
      }).then((response)=>{
        setOTPLoading(false)
        console.log(response)
           setMessage(response.data.message)
           setLoginMessage(response.data.message)
           setOTP('')
           setFirstName('')
                setLastName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setPhone('+91')
                setCompany('')
                setCity('')
                setState('')
                setAddress('')
              
                
      },(error)=>{
        setOTPLoading(false)
        console.log(error)
          if(error.response.data.message==="Invalid OTP."){
            setOTPError(true)
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
    
        if (firstName === '') {
          setFirstNameError(true)
          return
      }
        if (lastName === '') {
          setLastNameError(true)
          return
      } 
        if(address===""){
          setAddressError(true)
          return
        }
        if (email === '') {
        setEmailError(true)
        return
      }
        if (phone === '') {
        setPhoneError(true)
        return
      }
    
      if (company === '') {
        setCompanyError(true)
        return
    }
      if (city === '') {
        setCityError(true)
        return
    } 
      if (state === '') {
      setStateError(true)
      return
    }
      if (password === '') {
      setPasswordError(true)
      return
    }
    if (confirmPassword === '') {
      setConfirmPasswordError(true)
      return
    }
    
    const advisorData={
      
      
      "firstName": firstName,
      "lastName" :  lastName,
      "email":     email,
      "password":  password,
      "confirmPassword": confirmPassword,
      "phoneNumber":  phone.replace(/\s+/g, "").replace(/-/g, "").replace("+91",""),
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
                    setMessage("'Password' and 'Confirm Password' does not Match or Invalid Email")
                    }
                    handleOpen()
            }) 
        }

    // const handleLoginVerify=(e)=>{
    // handleOpen()
    // }
const handleResetSubmit=()=>{
  if(resetOTP===''){
    setResetOTPError(true)
  }
  if(resetPassword===''){
    setResetPasswordError(true)
  }
  if(confirmResetPassword===''){
    setConfirmResetPasswordError(true)
    return
  }
  const resetData={
    "email": forgotEmail,
    "otp": resetOTP,
    "newPassword":  resetPassword,
    "confirmPassword": confirmResetPassword
  }

 axios({
    method:'post',
    url:'https://investmentportal.azurewebsites.net/api/AdvisorSignUp/reset-password?api-version=1',
    data:resetData
  }).then((response)=>{
     setForgotMessage(response.data.message)
     setForgotEmail('')
     setResetOTP('')
     setResetPassword('')
     setButtonVisible(true)
     setConfirmResetPassword('')
  },(error)=>{
      setForgotMessage(error.response.data.message)
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
          navigate(`/advisor/dashboard/${advisorId}`)
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
                <TextField
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
                  style={{"padding": "10px 0px",
                  "--react-international-phone-border-color" : "#bab2b2",
                  "--react-international-phone-background-color":"#e4f1ff" ,
                  
                }}
                hideDropdown={true}
                inputStyle ={ {
                  "width" : "145px"
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
                required
                fullWidth
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
           
           <Button
                onClick={handleLoginSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Sign In
              </Button>
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
                fullWidth
                value={forgotEmail}
                error={forgotEmailError}
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
              />{buttonVisible&&<Button
              onClick={handleGetOTP}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Get OTP
            </Button>} 
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
            <Button
              onClick={handleResetSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Reset Password
            </Button></>}</Box></Modal>
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
