import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Icon } from 'components/form';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const styles = (theme) => ({
  container: {
    '& input, & textarea': {
      display: 'block',
      padding: '3rem 1.4rem',
      boxSizing: 'border-box',
      width: '100%',
      height: '38px',
      borderRadius: '.6rem',
      border: `solid 1px ${theme.palette.gray}`,
      fontFamily: 'Open Sans',
      fontSize: '1.6rem',
      fontWeight: '600',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#1A2E6C',
    },
    '& textarea': {
      height: 'auto',
    },
    '& input:focus': {
      boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.11)',
      border: `1px solid ${theme.palette.gray}`,
    },
    '& h4': {
      margin: '2rem 0 1rem',
      color: '#526190',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  left: {
    paddingRight: '1.3rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  right: {
    paddingLeft: '1.3rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
});

export const GoogleMaps = ({ onChange, value }) => {
  const [inputValue, setInputValue] = React.useState(value);
  const onInputChange = (e) => setInputValue(e);

  return (
    <GooglePlacesAutocomplete
      apiKey="AIzaSyAbFT5TLCN_JPoPoZTZ9vOCd1fhkgKpAhs"
      apiOptions={{ language: 'fr', region: 'fr' }}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['fr'],
        },
      }}
      selectProps={{
        placeholder: 'Localisation',
        onChange,
        onInputChange,
        inputValue,
        isClearable: true,
      }}
    />
  );
};
GoogleMaps.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
GoogleMaps.defaultProps = {
  value: '',
};

const positionType = ['left', 'right'];

const InputType = withStyles(styles)(
  ({
    name,
    label,
    type,
    onChange,
    value,
    position,
    placeholder,
    classes,
    rows = 10,
  }) => (
    <Grid
      item
      md={position ? 6 : 12}
      className={
        position
          ? clsx(classes.container, classes[position])
          : classes.container
      }
    >
      {label ? <Typography variant="h4">{label}</Typography> : ''}
      {type !== 'textarea' ? (
        <input
          value={value}
          onChange={onChange(name)}
          type={type}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          onChange={onChange(name)}
          placeholder={placeholder}
          rows={rows}
        >
          {value}
        </textarea>
      )}
    </Grid>
  )
);
const CustomInput = withStyles(styles)(
  ({ classes, handleSumit, handleSearch, queryData, ...inputProps }) => {
    const [value, setValue] = useState(queryData.value);
    const [state, setState] = useState({
      salary: 0,
      contributtion: 0,
    });

    const handleChange = (name) => ({ target: { value } }) =>
      setState({ ...state, [name]: value });

    useEffect(() => {
      const { salary, contributtion } = state;

      if (salary > 0 && contributtion > 0)
        setValue(salary * 83.33 + contributtion);
    }, [state]);

    return (
      <Grid container>
        <InputType {...inputProps} value={value} />
        <div onClick={handleSumit} className="pointer">
          <Icon type="search" size="large" color="white" />
        </div>
        <Grid container>
          <Typography variant="h4">Quel est votre budget ?</Typography>
          <Typography>
            Nous vous aidons à déterminer votre budget maximal en simulant le
            montant que vous pouvez emprunter.
          </Typography>
          <InputType
            name="salary"
            value={
              state.salary > 0 && !Number.isNaN(state.salary)
                ? state.salary
                : ''
            }
            onChange={handleChange}
            placeholder="Votre salaire net mensuel"
          />
          <InputType
            name="contributtion"
            value={
              state.contributtion > 0 && !Number.isNaN(state.contributtion)
                ? state.contributtion
                : ''
            }
            onChange={handleChange}
            placeholder="Votre apport personnel"
          />
          <Typography>
            Ce calcul est réalisé avec les hypothèses suivantes : durée de prêt
            : 25 ans taux d’intérêt : 1,5%
          </Typography>
        </Grid>
      </Grid>
    );
  }
);
const samePropTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
};
const sameDefaultProps = {
  label: undefined,
  type: 'text',
  value: undefined,
  placeholder: '',
  position: null,
  classes: {},
};
CustomInput.propTypes = {
  ...samePropTypes,
  queryData: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSumit: PropTypes.func.isRequired,
};
CustomInput.defaultProps = sameDefaultProps;
InputType.propTypes = samePropTypes;
InputType.defaultProps = sameDefaultProps;

export { CustomInput };
export default InputType;
