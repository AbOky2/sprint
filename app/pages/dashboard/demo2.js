import * as React from 'react';
import Box from '@mui/material/Box';
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
import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Demo from './demo'
import Demo3 from './demo3'



export const GoogleMaps = ({ onChange, value, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);
  const onInputChange = (e) => setInputValue(e);
  const onClick = (e) => setInputValue('');
  const [step, setStep] = useState(1);
  const onclick = (args) =>{
    console.log(args);
    if (step ==1 && args){
       setStep(2)
    }
   };
   
  
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  
  return (
    <>
    
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show from target"
      />
      {open && step == 1?
 (
        <>
        
       
      <Slide direction="up" in={checked} container={containerRef.current}>

        <div style={{background: 'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)', paddingTop:'48px', borderRadius:'5px',width:'375px', alignContent :'center'}}>
       
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
              <div style={{marginBottom : '20px', display:'inline-flex'}}> localisation
              <button style={{marginBottom :'10px', marginLeft : '216px', background:'white', border :'transparent'}} type="button" onClick={() => setStep(1)}>
              X
            </button>
              </div> 
              <br/>

              <GooglePlacesAutocomplete
                                apiOptions={{ language: 'fr', region: 'fr' }}
                                autocompletionRequest={{
                                  componentRestrictions: {
                                    country: ['fr'],
                                  },
                                  types: ['(regions)'],
                                }}
                                selectProps={{
                                  placeholder,
                                  onChange : onclick,
                                  onInputChange,
                                  inputValue,
                                  onFocus: onClick,
                                  isClearable: true,
                                  components: {
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null,
                                  },
                                }} />
        
            

            
          
           
            
          </Box>
            
       
        </Box>
        
            </div> 
            
            </Slide>

        </>

      ): step==2?<Demo setStep={setStep}/>: <Demo3 setStep={setStep}/>}
      
      </>
  );

 


};
GoogleMaps.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
GoogleMaps.defaultProps = {
  value: '',
  placeholder: '',
};
  export default GoogleMaps;