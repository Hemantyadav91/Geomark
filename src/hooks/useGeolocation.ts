import { useState, useCallback, useEffect } from 'react';
import { GeolocationCoordinates, GPSStatus } from '../types/geofence';

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [status, setStatus] = useState<GPSStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(() => {
    setStatus('fetching');
    setError(null);

    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setStatus('success');
      },
      (geoError) => {
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setStatus('denied');
          setError('Location permission denied. Please enable location access.');
        } else {
          setStatus('error');
          setError(geoError.message || 'Failed to fetch location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Optionally fetch location immediately on mount, 
  // but it's typically better to let the component trigger it.
  
  return {
    location,
    status,
    error,
    fetchLocation,
  };
};
