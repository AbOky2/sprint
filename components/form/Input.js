import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const positionType = ['left', 'right'];

const InputType = ({ name, label, type, onChange, value, position }) => (
  <Grid item md={position ? 6 : 12}>
    {label ? <p>{label}</p> : ''}
    <input value={value} onChange={onChange(name)} type={type} />
  </Grid>
);

InputType.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
};
InputType.defaultProps = {
  label: undefined,
  type: 'text',
  value: '',
  position: 'left',
};
export default InputType;
