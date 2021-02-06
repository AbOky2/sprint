import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import Icon, { iconTypes, colorTypes } from './Icon';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 'fit-content',
    padding: '18px 23px',
    background: 'linear-gradient(180deg, #3563DC 0%, #3E6FEF 4.34%, #3062E3 94.05%, #154AD2 100%)',
    boxShadow: '0px 4px 14px rgba(14, 108, 218, 0.35), inset 0px 0px 6px rgba(24, 72, 196, 0.6)',
    borderRadius: '10px',
    '& a': {
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '28px',
      color: 'white',
    },
    '& svg': {
      marginRight: 20,
    },
  },
  whiteColor: {
    color: theme.palette.blue,
    backgroundColor: 'white',
  },
}));

const Btn = ({ onClick, href, text, iconType, iconColor, alignRight, whiteColor }) => {
  const classes = useStyles();
  const className = whiteColor ? classes.container : clsx(classes.container, classes.whiteColor);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={className}
      style={alignRight ? { marginLeft: 'auto' } : {}}
      onClick={onClick}
    >
      {iconType ? <Icon type={iconType} color={iconColor} /> : ''}
      <Link to={href}>{text}</Link>
    </Grid>
  );
};

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf(colorTypes).isRequired,
  iconType: PropTypes.oneOf(iconTypes).isRequired,
  alignRight: PropTypes.bool,
  whiteColor: PropTypes.bool,
};
Btn.defaultProps = {
  alignRight: false,
  whiteColor: false,
};

export default Btn;
