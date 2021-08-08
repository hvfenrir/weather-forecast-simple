import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  // State
  const [coordinate, setCoordinate] = useState();

  // Asking permission for location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude }} = position;
  
      setCoordinate(`${latitude}, ${longitude}`);
    });
  }, []);

  return coordinate;
}