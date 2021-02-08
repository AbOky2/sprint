import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, Grid } from '@material-ui/core';

const positionType = ['left', 'right'];

const styles = (theme) => ({
  container: {
    '& p': {
      fontFamily: 'Open Sans',
      textAlign: 'left',
      margin: '2rem 0 1rem',
      fontSize: '1.8rem',
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: '28px',
      color: 'rgba(26, 46, 108, 0.75)',
    },
    '& select': {
      padding: '2.27rem 1.4rem',
      fontSize: '1.4rem',
      color: '#8e97a1',
    },
  },
  formControl: {
    minWidth: 120,
    width: '100%',
    fontSize: '2rem',
    margin: 0,
    '& > div': {
      borderRadius: '10px',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  left: {
    paddingRight: '1.3rem',
  },
  right: {
    paddingLeft: '1.3rem',
  },
});

const NativeSelects = ({ name, onChange, value, position, list, label, classes }) => (
  <Grid
    item
    md={position ? 6 : 12}
    xs={12}
    className={position ? clsx(classes.container, classes[position]) : classes.container}
  >
    <FormControl variant="outlined" className={classes.formControl}>
      {label ? <p>{label}</p> : ''}
      <Select native autoWidth value={value} onChange={onChange(name)} inputProps={{ name }}>
        {list?.map((elem) => (
          <option key={elem.name} value={elem.value}>
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
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.oneOf(positionType),
  list: PropTypes.arrayOf(PropTypes.object),
};
NativeSelects.defaultProps = {
  label: '',
  value: '',
  position: '',
  list: null,
};
export default withStyles(styles)(NativeSelects);
