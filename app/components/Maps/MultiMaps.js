import React, { useState, useEffect } from 'react';
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
  defaultZoom: 12,
  defaultCenter,
  options: {
    maxZoom: 19,
  },
};
export const GoogleMap = (props) => {
  const {
    classes,
    curr,
    isMobile,
    pageList = [],
    data: { docs = [], near = [] },
    handlePointChange,
    handleChildClick,
    liked,
    handleBookmark,
  } = props;
  const [state, setState] = useState({
    mapOptions: {
      center: near,
      zoom: MAP.defaultZoom,
    },
    clusters: [],
    clustersList: [],
  });
  const [center, setCenter] = useState(near);

  const [triggerCreateClusters, setTriggerCreateClusters] = useState(false);

  const getClusters = () => {
    const clusters = supercluster(
      docs.map(({ _id, loc }) => ({
        lng: loc?.coordinates[0],
        lat: loc?.coordinates[1],
        id: _id,
      })),
      {
        minZoom: 0,
        maxZoom: MAP.defaultZoom - 1,
        radius: 60,
      }
    );

    return clusters(state.mapOptions);
  };

  const createClusters = (props) => {
    const clusters = state.mapOptions.bounds
      ? getClusters(props).map(({ wx, wy, numPoints, points }) => ({
          lat: wy,
          lng: wx,
          numPoints,
          id: `${numPoints}_${points[0].id}`,
          points,
        }))
      : [];

    setState({ ...state, clusters });
  };

  const handleMapChange = ({ center, zoom, bounds }) => {
    const mapOptions = { center, zoom, bounds };
    setState({ ...state, mapOptions });
    setTriggerCreateClusters(true);
  };

  // useEffect(() => {
  //   let newCenter = [];

  //   if (near)
  //     newCenter = [curr?.loc?.coordinates[1], curr?.loc?.coordinates[0]];
  //   else newCenter = near;
  //   // setCenter(newCenter);
  // }, [near, curr]);

  // useEffect(() => {
  //   // setTriggerCreateClusters(false);
  // }, [queryData]);
  useEffect(() => setTriggerCreateClusters(true), [docs]);
  useEffect(() => {
    createClusters(props);
    handlePointChange(state.clusters);
    setTriggerCreateClusters(false);
    console.log(state.clusters.length);
  }, [triggerCreateClusters]);

  return (
    <div className={classes.mapWrapper} id="maps-container">
      <GoogleMapReact
        defaultZoom={MAP.defaultZoom}
        defaultCenter={near}
        options={MAP.options}
        onChange={handleMapChange}
        onChildClick={handleChildClick}
        yesIWantToUseGoogleMapApiInternals
        center={near}
      >
        {state.clusters
          .filter((e) => pageList.find((i) => e.id.includes(i)))
          .map((item) => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  data={curr}
                  show={item.id.includes(curr?._id)}
                  isMobile={isMobile}
                  handleBookmark={handleBookmark}
                  liked={liked}
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
                handleBookmark={handleBookmark}
                liked={liked}
              />
            );
          })}
      </GoogleMapReact>
    </div>
  );
};

export default styles(GoogleMap);
