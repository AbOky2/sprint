/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, Grid, Checkbox, Typography } from '@material-ui/core';
import { toggleArray } from '../../helpers/convertAndCheck';

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
  customSelectContainer: {
    position: 'relative',
    height: '100%',
    '& input': {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      paddingLeft: '1.4rem',
      border: 'solid 1px #c7cfd6',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.6rem',
      lineHeight: '2.2rem',
      color: 'rgba(26, 46, 108, 0.5)',
    },
    '& > span': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    '& > div': {
      display: 'none',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '1.6rem .5rem',
      transform: 'translateY(100%)',
      backgroundColor: 'white',
      zIndex: 3,
      '& > div > span': {
        padding: 6,
      },
      '& > div p': {
        fontStyle: 'normal',
        color: theme.palette.blue,
      },
    },
  },
  open: {
    '& > div': {
      display: 'flex',
    },
  },
});

const DropdownSelect = withStyles(styles)(({ onChange, position, list, classes }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleOpen = (e) => setOpen(!open);
  const handleSelected = (e) => {
    const values = toggleArray(selected, e.target.value);

    setSelected(values);
    onChange(values);
  };

  return (
    <Grid
      item
      md={position ? 6 : 12}
      xs={12}
      className={
        open ? clsx(classes.customSelectContainer, classes.open) : classes.customSelectContainer
      }
    >
      <input value={selected.join(' - ')} disabled />
      <span onClick={toggleOpen} />
      <Grid container>
        {list?.map((elem) => (
          <Grid container item key={elem.name} md={6} alignItems="center">
            <Checkbox
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              key={elem.name}
              value={elem.value}
              onClick={handleSelected}
            />
            <Typography variant="body2">{elem.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});
export { DropdownSelect };
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
