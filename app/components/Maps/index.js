import GoogleMapReact from 'google-map-react';
import Marker from '../../static/img/icons/marker.svg';
import CustomMarker from '../../static/img/icons/customMarker.svg';
import SelectedCustomMarker from '../../static/img/icons/selectedCustomMarker.svg';
import { MapsCard } from 'components';

const AnyReactComponent = () => (
  <div style={{ position: 'relative', width: 20 }}>
    <span style={{ position: 'absolute', top: -50, left: -30 }}>
      <Marker style={{ width: 20 }} />
    </span>
  </div>
);
const CustomAnyReactComponent = ({ show, isMobile, data }) => (
  <>
    <div style={{ position: 'relative', width: 20 }}>
      <span style={{ position: 'absolute', top: -50, left: -30 }}>
        {show ? (
          <SelectedCustomMarker
            style={{ width: 50, position: 'absolute', zIndex: 6 }}
          />
        ) : (
          <CustomMarker style={{ width: 50, position: 'absolute' }} />
        )}
      </span>
    </div>
    {show && !isMobile && <MapsCard {...data} />}
  </>
);

export const Maps = ({ loc: [lng, lat] = [] }) => (
  <GoogleMapReact
    defaultCenter={{
      lat,
      lng,
    }}
    defaultZoom={15}
  >
    <AnyReactComponent lat={lat} lng={lng} text="My Marker" />
  </GoogleMapReact>
);

export const MultipleMarkers = ({
  data = [],
  curr: {
    loc: { coordinates: [lng, lat] } = { coordinates: [] },
    _id: currId,
  } = {},
  handleChildClick,
  isMobile = true,
}) => (
  <GoogleMapReact
    defaultCenter={{
      lng,
      lat,
    }}
    center={{
      lat,
      lng,
    }}
    defaultZoom={13}
    onChildClick={handleChildClick}
    options={{
      fullscreenControl: !isMobile,
      zoomControl: !isMobile,
    }}
  >
    {data.map((elem) => {
      const {
        loc: { coordinates: [lng, lat] } = { coordinates: [] },
        _id,
      } = elem;
      return (
        <CustomAnyReactComponent
          key={_id}
          lat={lat}
          lng={lng}
          show={currId === _id}
          data={elem}
          isMobile={isMobile}
        />
      );
    })}
  </GoogleMapReact>
);
