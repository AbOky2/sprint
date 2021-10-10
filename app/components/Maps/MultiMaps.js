import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Marker from './Marker';
import ClusterMarker from './ClusterMarker';
import styles from './styles';
import { shared } from 'lib/theme';

const MAP = {
  options: {
    minZoom: 5,
    maxZoom: 19,
  },
};
export const GoogleMap = (props) => {
  const {
    classes,
    curr,
    isMobile,
    pageList = [],
    data: { docs = [], near = [], zoom },
    delimiter: { coord, department } = {},
    handlePointChange,
    handleChildClick,
    toggleRefresh,
    setIsFirstRequest,
    isFirstRequest,
    liked,
    handleBookmark,
    reloadMaps = false,
    refresh = false,
  } = props;
  const [state, setState] = useState({
    mapOptions: {
      center: near,
      zoom,
    },
    clusters: [],
    clustersList: [],
    defaultReload: false,
  });
  const [gMap, setGMap] = useState(null);
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
        maxZoom: state.mapOptions.zoom - 1,
        radius: 60,
      }
    );

    return clusters(state.mapOptions);
  };

  const createClusters = (params) => {
    const clusters = state.mapOptions.bounds
      ? getClusters(params).map(({ wx, wy, numPoints, points }) => ({
          lat: wy,
          lng: wx,
          numPoints,
          id: `${numPoints}_${points[0].id}`,
          points,
        }))
      : [];

    setState({ ...state, clusters });
  };

  const handleMapChange = ({ center, zoom, bounds }, refresh = false) => {
    const box = [
      [bounds?.sw?.lng, bounds?.sw?.lat],
      [bounds?.ne?.lng, bounds?.ne?.lat],
    ];

    setState({
      ...state,
      mapOptions: { center, zoom, bounds, box },
      defaultReload: true,
    });

    if (state.defaultReload && !reloadMaps && !refresh && !isFirstRequest)
      return;
    setTriggerCreateClusters(true);
  };

  useEffect(() => {
    if (!gMap) return;
    if (gMap.data) gMap.data.forEach((e) => gMap.data.remove(e));
    if (department?.name && department?.coord)
      gMap.data.addGeoJson(department?.coord);
    if (coord) gMap.data.addGeoJson(coord);

    gMap.data.setStyle((feature) => ({
      fillColor:
        feature.getProperty('fillColor') || shared.colors.mapBlueOverlay,
      strokeWeight: 1,
    }));
  }, [gMap, coord, department]);

  useEffect(
    () => setState({ ...state, mapOptions: { ...state.mapOptions, zoom } }),
    [zoom]
  );
  useEffect(() => {
    if (refresh || reloadMaps) {
      setIsFirstRequest(false);
      handleMapChange(state.mapOptions, refresh);
      toggleRefresh && toggleRefresh(false);
    }
  }, [reloadMaps, refresh]);
  useEffect(() => {
    createClusters(props);

    if (!isFirstRequest) handlePointChange(state.clusters, state.mapOptions);
    setTriggerCreateClusters(false);
  }, [triggerCreateClusters]);

  return (
    <div className={classes.mapWrapper} id="maps-container">
      <GoogleMapReact
        defaultZoom={state.mapOptions.zoom}
        defaultCenter={near}
        options={MAP.options}
        onChange={handleMapChange}
        onChildClick={handleChildClick}
        onClick={() => handleChildClick(null)}
        yesIWantToUseGoogleMapApiInternals
        center={near}
        onGoogleApiLoaded={({ map }) => setGMap(map)}
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
