import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MapsCard } from 'components/card';
import CustomMarker from '../../static/img/icons/customMarker.svg';
import SelectedCustomMarker from '../../static/img/icons/selectedCustomMarker.svg';
import { styles } from './styles';

const useStyles = makeStyles(styles);
const Marker = ({ data, show, isMobile, inGroup }) => {
  const classes = useStyles({ isTop: data?.isTop, isLeft: data?.isLeft });
  let className = inGroup ? classes.markerInGroupStyled : classes.markerStyled;
  const Icon = show ? SelectedCustomMarker : CustomMarker;
  className = clsx(className, classes.markerPosition);

  return (
    <div>
      <div className={className}>
        <Icon className={classes.markerIcon} />
        {show && !isMobile && data?.showInfoWindow && <MapsCard {...data} />}
      </div>
    </div>
  );
};

Marker.propTypes = {
  data: PropTypes.object,
  inGroup: PropTypes.bool,
  isMobile: PropTypes.bool,
  show: PropTypes.bool,
};
Marker.defaultProps = {
  inGroup: false,
  show: false,
  isMobile: false,
};

export default Marker;
