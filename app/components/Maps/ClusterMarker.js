import React from 'react';
import PropTypes from 'prop-types';
import Marker from './Marker';
import styles from './styles';

const clusterLimit = 1;
class ClusterMarker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, clusterLimit),
  };

  render() {
    const { classes, ...props } = this.props;

    return (
      <div className={classes.markerGroup} length={this.props.points.length}>
        {this.state.clusterFaceMarkers.map((marker) => (
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            name={marker.id}
            inGroup
            {...props}
          />
        ))}
        {this.props.points.length > clusterLimit && (
          <div className={classes.markerCounter}>
            +{this.props.points.length - clusterLimit}
          </div>
        )}
      </div>
    );
  }
}

ClusterMarker.propTypes = {
  points: PropTypes.array,
  selected: PropTypes.bool,
};

export default styles(ClusterMarker);
