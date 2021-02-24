import {useEffect, useState} from "react";

import GoogleMapReact from 'google-map-react';
import {usePosition} from 'use-position';

import {GoogleMarker} from "./GoogleMarker";

function App() {
  const [marker, setMarker] = useState()
  const [center, setCenter] = useState()
  const [googleMap, setGoogleMap] = useState();
  const {latitude, longitude} = usePosition();


  useEffect(() => {
    if (latitude && longitude) {
      setCenter({
        lat: latitude,
        lng: longitude
      })
    } else {
      setCenter({
        lat: 42.1082128,
        lng: 43.2079191
      })
    }
  }, [latitude, longitude])

  const renderMarkers = (map, api) => setGoogleMap({map, api});

  const onMapClick = ({lat, lng}) => setMarker({lat, lng});

  return (
    <div style={{height: '100vh', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_MAP_KEY}}
        center={center}
        defaultZoom={9}
        onClick={onMapClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
      >
        {marker && <GoogleMarker
          map={googleMap}
          lat={marker.lat}
          lng={marker.lng}
        />}
      </GoogleMapReact>
    </div>
  );
}

export default App;
