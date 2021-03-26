import GoogleMapReact from 'google-map-react';
import Marker from '../static/img/icons/marker.svg';
import CustomMarker from '../static/img/icons/customMarker.svg';
import { NEXT_PUCLIC_GOOGLE_MAPS_KEY } from '../config';

const AnyReactComponent = () => (
  <div style={{ position: 'relative', width: 20 }}>
    <span style={{ position: 'absolute', top: -50, left: -30 }}>
      <Marker style={{ width: 20 }} />
    </span>
  </div>
);
const CustomAnyReactComponent = () => (
  <div style={{ position: 'relative', width: 20 }}>
    <span style={{ position: 'absolute', top: -50, left: -30 }}>
      <CustomMarker style={{ width: 50 }} />
    </span>
  </div>
);

const Maps = ({ loc: [lng, lat] = [] }) => (
  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo' }}
    defaultCenter={{
      lat,
      lng,
    }}
    defaultZoom={15}
  >
    <AnyReactComponent lat={lat} lng={lng} text="My Marker" />
  </GoogleMapReact>
);

const MultipleMarkers = ({ locs = [] }) => (
  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo' }}
    defaultCenter={{
      lng: locs[0][0],
      lat: locs[0][1],
    }}
    defaultZoom={15}
  >
    <CustomAnyReactComponent
      lng={locs[0][0]}
      lat={locs[0][1]}
      text="My Marker"
    />
    {/* {locs.map(({ loc: { coordinates: [lat, lng] } }, key) => (
      <CustomAnyReactComponent key={key} lat={lat} lng={lng} text="My Marker" />
    ))} */}
  </GoogleMapReact>
);
export { MultipleMarkers };
export default Maps;
