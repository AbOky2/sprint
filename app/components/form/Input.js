import { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Icon } from 'components/form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useToggleOpen } from 'helpers/hooks';

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
  custom: {
    position: 'relative',
    '& > div:last-of-type': {
      display: 'none',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '2.1rem',
      transform: 'translateY(100%)',
      backgroundColor: 'white',
      boxShadow: '0px 4.15441px 16.6176px rgba(0, 0, 0, 0.1)',
      borderRadius: '0px 0px 15px 15px',
      zIndex: 3,
      '& input': {
        borderRadius: '1rem!important',
        borderLeft: `1px solid ${theme.palette.lightGray}!important`,
        marginTop: '1.6rem',
      },
      '& > p': {
        fontSize: '1.2rem',
        '&:first-of-type': {
          marginTop: '1.6rem',
        },
        '&:last-of-type': {
          marginTop: '1.6rem',
          fontWeight: '600',
          fontStyle: 'italic',
          color: '#526190',
        },
      },
    },
  },
  customOpen: {
    '& > div:last-of-type': {
      display: 'flex',
    },
  },
  submit: {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    zIndex: 1,
  },
});

export const GoogleMaps = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const onInputChange = (e) => setInputValue(e);

  return (
    <GooglePlacesAutocomplete
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

const InputBase = withStyles(styles)(
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
  ({ classes, handleSumit, showSub, ...inputProps }) => {
    const [value, setValue] = useState(inputProps.value);
    const [node, open] = useToggleOpen();
    const [state, setState] = useState({
      salary: 0,
      contributtion: 0,
    });
    const calc = (value) => {
      let val =
        value ||
        (
          parseInt(state.salary, 10) * 83.33 +
          parseInt(state.contributtion, 10)
        ).toFixed(2);

      setValue(val);
      inputProps.onChange(val);
    };
    const onChange = () => (e) => {
      const { salary, contributtion } = state;

      if (salary && contributtion) return;
      calc(e.target.value);
    };
    const handleChange = (name) => ({ target: { value } }) =>
      setState({ ...state, [name]: value });

    useEffect(() => {
      const { salary, contributtion } = state;

      if (salary > 0 && contributtion > 0) calc();
      else setValue('');
    }, [state]);
    useEffect(() => setValue(inputProps.value), [inputProps.value]);

    return (
      <div className="relative">
        <Grid
          container
          className={
            showSub && open
              ? clsx(classes.custom, classes.customOpen)
              : classes.custom
          }
          ref={node}
        >
          <InputBase {...inputProps} onChange={onChange} value={value} />
          <Grid container>
            <Typography variant="h4">Quel est votre budget ?</Typography>
            <Typography>
              Nous vous aidons à déterminer votre budget maximal en simulant le
              montant que vous pouvez emprunter.
            </Typography>
            <InputBase
              name="salary"
              value={
                state.salary > 0 && !Number.isNaN(state.salary)
                  ? state.salary
                  : ''
              }
              onChange={handleChange}
              placeholder="Votre salaire net mensuel"
            />
            <InputBase
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
              Ce calcul est réalisé avec les hypothèses suivantes : durée de
              prêt : 25 ans taux d’intérêt : 1,5%
            </Typography>
          </Grid>
        </Grid>
        <div onClick={handleSumit} className={classes.submit}>
          <Icon type="search" size="large" color="white" />
        </div>
      </div>
    );
  }
);
const samePropTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  showSub: PropTypes.bool.isRequired,
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
  handleSumit: PropTypes.func.isRequired,
};
CustomInput.defaultProps = sameDefaultProps;
InputBase.propTypes = samePropTypes;
InputBase.defaultProps = sameDefaultProps;

export { CustomInput };
export default InputBase;
