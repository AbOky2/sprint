import GoogleMapReact from 'google-map-react';
import Marker from '../static/img/icons/marker.svg';
import CustomMarker from '../static/img/icons/customMarker.svg';
import SelectedCustomMarker from '../static/img/icons/selectedCustomMarker.svg';
import { MapsCard } from 'components/card';
import { NEXT_PUBLIC_UPLOAD_URL } from '../config';

const AnyReactComponent = () => (
  <div style={{ position: 'relative', width: 20 }}>
    <span style={{ position: 'absolute', top: -50, left: -30 }}>
      <Marker style={{ width: 20 }} />
    </span>
  </div>
);
const CustomAnyReactComponent = ({
  show,
  isMobile,
  data,
  handleNext,
  handlePrev,
}) => (
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
    {show && !isMobile && (
      <MapsCard
        {...data}
        src={NEXT_PUBLIC_UPLOAD_URL + data?.pictures[0]}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    )}
  </>
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

const MultipleMarkers = ({
  data = [],
  curr: {
    loc: { coordinates: [lng, lat] } = { coordinates: [] },
    _id: currId,
  } = {},
  handleChildClick,
  handleNext,
  handlePrev,
  isMobile = true,
}) => (
  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyD7NrR47b_NReW4PF6kCDd1vGSUrm9xkzo' }}
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
          handleNext={handleNext}
          handlePrev={handlePrev}
          isMobile={isMobile}
        />
      );
    })}
  </GoogleMapReact>
);
export { MultipleMarkers };
export default Maps;
