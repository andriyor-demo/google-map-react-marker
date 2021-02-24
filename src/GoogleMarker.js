import React, {FC} from 'react'


export const GoogleMarker = ({map, lat, lng}) => {

  React.useEffect(() => {
    if (map.api) {
      const marker = new map.api.Marker({
        map: map.map,
        position: {
          lat,
          lng,
        },
      });
      return () => {
        marker.setMap(null);
      };
    }
  }, [map, lat, lng]);
  return null;
};
