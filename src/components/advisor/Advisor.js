import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from '../Login';
import image5 from "../../assets/first.png"
import { useState,useEffect } from 'react';
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Advisor() {
 
  const backgroundImageURLs=[image5]

    const [currentBackground, setCurrentBackground] = useState(backgroundImageURLs[0]);
  
    const changeBackgroundImage = () => {
      const randomIndex = Math.floor(Math.random() * backgroundImageURLs.length);
      const randomImageURL = backgroundImageURLs[randomIndex];
      setCurrentBackground(randomImageURL);
    };
  
    useEffect(() => {
      const intervalId = setInterval(changeBackgroundImage, 3000); // 5000 milliseconds = 5 seconds
      return () => clearInterval(intervalId); // Cleanup on unmount
    }, []); 


  return (

    
    <ThemeProvider theme={defaultTheme}>
      <Grid container  sx={{ height: '100vh' ,overflow:"hidden" }}>
        
        <Grid
          item
          xs={false}
          sm={3}
          md={8}
          sx={{
          
            backgroundImage: `url(${currentBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            
            backgroundPosition: 'center',
            
          }}
        />
         

  
        <Login/>
    
      </Grid>
    </ThemeProvider>
  );
}