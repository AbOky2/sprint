import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Marker from './Marker';
import ClusterMarker from './ClusterMarker';
import styles from './styles';

const defaultCenter = {
  lat: 48.786738670953156,
  lng: 2.348329772716056,
};
const MAP = {
  defaultZoom: 11,
  defaultCenter,
  options: {
    maxZoom: 19,
  },
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
    },
    clusters: [],
    clustersList: [],
  };

  getClusters = () => {
    const clusters = supercluster(
      this.props.data.map(({ _id, loc }) => ({
        lng: loc?.coordinates[0],
        lat: loc?.coordinates[1],
        id: _id,
      })),
      {
        minZoom: 0,
        maxZoom: 16,
        radius: 60,
      }
    );

    return clusters(this.state.mapOptions);
  };

  createClusters = (props) => {
    const clusters = this.state.mapOptions.bounds
      ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
          lat: wy,
          lng: wx,
          numPoints,
          id: `${numPoints}_${points[0].id}`,
          points,
        }))
      : [];

    this.setState({ clusters }, () => this.props.handlePointChange(clusters));
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    const mapOptions = { center, zoom, bounds };
    this.setState({ mapOptions }, () => {
      this.createClusters(this.props);
    });
  };

  render() {
    const { classes, handleChildClick, curr, isMobile } = this.props;

    return (
      <div className={classes.mapWrapper}>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          onChildClick={handleChildClick}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.clusters.map((item) => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  data={curr}
                  show={item.id.includes(curr?._id)}
                  isMobile={isMobile}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points || []}
                data={curr}
                show={item.points?.find((e) => e.id.includes(curr?._id))}
                isMobile={isMobile}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default styles(GoogleMap);
