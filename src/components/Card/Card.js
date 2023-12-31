import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Card.css"
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  return (
    <Card  className={props.color} sx={{ width:'250px' ,height:'120px', margin:'5px' }}>
      <CardContent>
       
        <Typography variant="h6" component="div">
          {props.heading}
        </Typography>
        <Typography  className='number' variant="h6" color="text.secondary">
          {props.number}
        </Typography>
      
      </CardContent>
     
    </Card>
  );
}
