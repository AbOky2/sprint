import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import { blue } from '@mui/material/colors';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import NumberFormat from 'react-number-format';
import { Grid, Typography } from '@material-ui/core';
import {CustomInput } from 'components/form/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Demo2 from './demo2'


export const BasicTrapFocus = withStyles()( 
  ({classes, setStep, handleBudget, handleSumit, ...inputProps }) => {

    
  
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const containerRef = React.useRef(null);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [value, setValue] = useState(inputProps.value);
    const [state, setState] = useState({
      salary: '',
      contributtion: '',
    });
    const calc = (value) => {
      const s = state.salary.split(' ').join('');
      const c = state.contributtion.split(' ').join('');
      const v = value ? parseInt(value.split(' ').join(''), 10) : value;
      let val = v || parseInt(s, 10) * 83.33 + parseInt(c, 10);
      val = Math.trunc(val);
      setValue(val);
    };
    const onChange = ({ target: { value } }) => {
      const { salary, contributtion } = state;

      //if (salary && contributtion) return;
      calc(value);
    };
    const onKeyPress = (e) => {
      if (e.key === 'Enter') handleSumit();
    };
    const handleChange1 = (name) => ({ target: { value } }) =>
      setState({ ...state, [name]: value });


      useEffect(() => {
        const { salary, contributtion } = state;
  
        if (salary && contributtion) calc();
        else setValue('');
      }, [state]);
      useEffect(() => setValue(inputProps.value), [inputProps.value]);

      


  return (
    <>
    
   
        <>
      <Slide direction="up" in={checked} container={containerRef.current}>

        <div style={{background: 'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)', paddingTop:'282px', borderRadius:'5px',width:'375px', alignContent :'center'}}>
       
        <Box
        sx={{
          height : '524px',
          display: 'flex',
          flexDirection: 'column',
          top : '48px',
          padding :'24px',
          color : "black",
          backgroundColor :'white',
          borderTopLeftRadius:'22px',
          borderTopRightRadius:'22px',
  
        }}
      >
        
           <Box tabIndex={-1} sx={{ mt: 1, p: 1}}>
        
              <div style={{marginBottom : '20px', display:'inline-flex'}}> Budget
              <button style={{marginBottom :'10px', marginLeft : '216px', background:'white', border :'transparent'}} type="button" onClick={() => setStep(1)}>
              X
            </button>
              </div> 
              <br/>

               Votre Budget
               <NumberFormat style={{border : '2px solid #EFF4FF', width : '327px', height : '42px', borderRadius : '12px', marginTop : '8px'}}
            thousandSeparator=" "
            suffix=" €"
            prefix='  '
            {...inputProps}
            value={value}
            placeholder="  Budget maximal"
            onChange={onChange}
            className={classes.container}
            onKeyPress={onKeyPress}
            autoComplete="off"
          />
            <br />
            <br/>

            Votre salaire mensuel net (avant impôt)
               <br/>
               <NumberFormat style={{border : '2px solid #EFF4FF', width : '327px', height : '42px', borderRadius : '12px', marginTop : '8px'}}
              thousandSeparator=" "
              suffix=" €"
              prefix='   '
              value={state.salary}
              onChange={handleChange1('salary')}
              placeholder="  Votre salaire net mensuel"
            />
            <br />
            <br />
            Votre apport
               <br/>
  
               <NumberFormat style={{border : '2px solid #EFF4FF', width : '327px', height : '42px', borderRadius : '12px', marginTop : '8px'}}
              thousandSeparator=" "
              suffix=" €"
              prefix='    '
              value={state.contributtion}
              placeholder="  Votre apport personnel"
              onChange={handleChange1('contributtion')}
            />
            <button onClick={handleSumit} className={classes.submit} type='submit' style={{background :'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',display:'flex', alignItems : 'flex-end', color:'white', fontWeight : 'bold', width : '120px', height :'2px', borderRadius :'12px', border :'transparent', flexDirection : 'row', margin : '12px', marginLeft : '210px', placeItems :'center', position:'static', padding:'22px'}}> Valider </button>

            

            
          
           
              </Box>
            
       
            </Box>
         
       
            </div> 
            
            </Slide>

        </>

   
      </>
  );

 


});
 

  export default BasicTrapFocus;