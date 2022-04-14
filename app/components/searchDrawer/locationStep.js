import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const LocationStep = ({
  handleChange,
  showSearch,
  setShowSearch,
  handleNextStep,
}) => {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (e) => setInputValue(e);
  const onFocus = (e) => setInputValue('');
  const onChange = (args) => {
    handleChange({ name: 'loc', value: args.label });
    handleNextStep();
  };
  const containerRef = React.useRef(null);

  return (
    <Slide direction="up" in={showSearch} container={containerRef.current}>
      <div
        style={{
          background:
            'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
          paddingTop: '48px',
          borderRadius: '5px',
          width: '375px',
          alignContent: 'center',
        }}
      >
        <Box
          sx={{
            height: '524px',
            display: 'flex',
            flexDirection: 'column',
            top: '48px',
            padding: '24px',
            color: 'black',
            backgroundColor: 'white',
            borderTopLeftRadius: '22px',
            borderTopRightRadius: '22px',
          }}
        >
          <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
            <Grid container justifyContent="space-between">
              localisation
              <div type="button" onClick={() => setShowSearch(false)}>
                X
              </div>
            </Grid>
            <br />

            <GooglePlacesAutocomplete
              apiOptions={{ language: 'fr', region: 'fr' }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['fr'],
                },
                types: ['(regions)'],
              }}
              selectProps={{
                placeholder: 'Location',
                focus: true,
                onChange,
                onInputChange,
                inputValue,
                onFocus,
                isClearable: true,
                components: {
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                },
              }}
            />
          </Box>
        </Box>
      </div>
    </Slide>
  );
};
LocationStep.propTypes = {
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
};
LocationStep.defaultProps = {};
