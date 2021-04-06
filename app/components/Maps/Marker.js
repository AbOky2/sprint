import React from 'react';
import PropTypes from 'prop-types';
import { MapsCard } from 'components/card';
import CustomMarker from '../../static/img/icons/customMarker.svg';
import SelectedCustomMarker from '../../static/img/icons/selectedCustomMarker.svg';
import Styles from './styles';

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
    show: false,
    isMobile: false,
  };

  render() {
    const { classes, show, isMobile, data } = this.props;
    const className = this.props.inGroup
      ? classes.markerInGroupStyled
      : classes.markerStyled;
    const Icon = show ? SelectedCustomMarker : CustomMarker;

    return (
      <div>
        <div className={className}>
          <Icon className={classes.markerIcon} />
          {show && !isMobile && <MapsCard {...data} />}
        </div>
      </div>
    );
  }
}

Marker.propTypes = {
  data: PropTypes.object,
  inGroup: PropTypes.bool,
  isMobile: PropTypes.bool,
  show: PropTypes.bool,
};

export default Styles(Marker);
