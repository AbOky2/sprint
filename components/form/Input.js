import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  container: {
    '& input': {
      display: 'block',
      padding: '3rem 1.4rem',
      boxSizing: 'border-box',
      width: '100%',
      height: '38px',
      borderRadius: '6px',
      border: 'solid 1px #c7cfd6',
      fontFamily: 'Rubik',
      fontSize: '1.6rem',
      fontWeight: '600',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#1A2E6C',
    },
    '& input:focus': {
      boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.11)',
      border: '1px solid #4F80FF',
    },
    '& h4': {
      margin: '2rem 0 1rem',
      color: '#526190',
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

const positionType = ['left', 'right'];

const InputType = withStyles(styles)(
  ({ name, label, type, onChange, value, position, placeholder, classes }) => (
    <Grid
      item
      md={position ? 6 : 12}
      className={position ? clsx(classes.container, classes[position]) : classes.container}
    >
      {label ? <Typography variant="h4">{label}</Typography> : ''}
      <input value={value} onChange={onChange(name)} type={type} placeholder={placeholder} />
    </Grid>
  ),
);

InputType.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
};
InputType.defaultProps = {
  label: undefined,
  type: 'text',
  value: null,
  placeholder: '',
  position: null,
  classes: {},
};
export default InputType;
