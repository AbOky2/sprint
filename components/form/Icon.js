import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import * as icons from '../../static/img/icons';

const SIZES = { small: 16, medium: 24, large: 48, big: 67 };
const ICON_COLORS = {
  darkBlue: '#1A2E6C',
  skyBlue: '#9B7B0A',
  lightBlue: '#5379EF',
  white: '#fff',
  red: '#E02A50',
};

export const iconTypes = Object.keys(icons);
export const colorTypes = Object.keys(ICON_COLORS);
const sizeTypes = Object.keys(SIZES);
const useStyles = makeStyles({
  svg: {
    '& path': {
      fill: (props) => props.fill,
    },
  },
});

const Icon = ({ type, color, size, customSize, strokeColor, rotate }) => {
  const SvgIcon = icons[type];
  const svgSize = SIZES[size];
  const fill = ICON_COLORS[color] ?? color;
  const classes = useStyles({ fill });
  // for some reason, using the css prop here does not work
  // console.log(typeof iconTypes, typeof colorTypes, typeof sizeTypes, sizeTypes);

  return (
    <SvgIcon
      className={classes.svg}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        fill,
        ...(strokeColor ? { stroke: strokeColor } : {}),
        ...(customSize || {
          width: svgSize,
          height: svgSize,
        }),
        ...(rotate ? { transform: `rotate(${rotate})` } : {}),
      }}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.oneOf(iconTypes).isRequired,
  color: PropTypes.oneOf(colorTypes),
  size: PropTypes.oneOf(sizeTypes),
  customSize: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  strokeColor: PropTypes.string,
  rotate: PropTypes.string,
};
Icon.defaultProps = {
  color: 'darkBlue',
  size: 'medium',
  customSize: undefined,
  strokeColor: undefined,
  rotate: undefined,
};

export default Icon;
