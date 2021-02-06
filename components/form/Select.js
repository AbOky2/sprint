import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, Grid } from '@material-ui/core';

const positionType = ['left', 'right'];

const styles = (theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    fontSize: '2rem',
    margin: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const NativeSelects = ({ name, onChange, value, position, list, label, classes }) => (
  <Grid item md={position ? 6 : 12} xs={12} className={`select-container ${position}`}>
    <FormControl variant="outlined" className={classes.formControl}>
      {label ? <p>{label}</p> : ''}
      <Select native autoWidth value={value} onChange={onChange(name)} inputProps={{ name }}>
        {list?.map((elem, key) => (
          <option key={`${elem.name}-${key}`} value={elem.value}>
            {elem.name}
          </option>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

NativeSelects.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
  list: PropTypes.arrayOf(PropTypes.object),
};
NativeSelects.defaultProps = {
  label: '',
  value: '',
  position: 'left',
  list: null,
};
export default withStyles(styles)(NativeSelects);
