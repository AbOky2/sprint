import GoogleMapReact from 'google-map-react';
import Marker from '../static/img/icons/marker.svg';

const AnyReactComponent = () => (
  <div style={{ position: 'relative', width: 20 }}>
    <span style={{ position: 'absolute', top: -50, left: -30 }}>
      <Marker style={{ width: 20 }} />
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
export default Maps;
