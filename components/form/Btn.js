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
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.8rem',
    fontWeight: '600',
    '& a': {
      fontStyle: 'normal',
      lineHeight: '28px',
      color: 'white',
    },
    '& svg': {
      marginRight: 20,
    },
  },
  whiteColor: {
    '& a': {
      color: theme.palette.blue,
    },
    color: theme.palette.blue,
    background: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
  },
}));

const Btn = ({ onClick, href, text, iconType, iconColor, alignRight, whiteColor, download }) => {
  const classes = useStyles();
  const className = !whiteColor ? classes.container : clsx(classes.container, classes.whiteColor);

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
      {href ? (
        <Link href={href}>
          <a download={download} target={download ? '_blank' : ''}>
            {text}
          </a>
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </Grid>
  );
};

Btn.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  iconColor: PropTypes.oneOf(colorTypes),
  iconType: PropTypes.oneOf(iconTypes),
  alignRight: PropTypes.bool,
  whiteColor: PropTypes.bool,
  download: PropTypes.bool,
};
Btn.defaultProps = {
  href: '',
  onClick: undefined,
  iconColor: undefined,
  iconType: undefined,
  alignRight: false,
  whiteColor: false,
  download: false,
};

export default Btn;
