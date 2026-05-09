import { getDistance } from 'geolib';
import { GeolocationCoordinates, GeoFenceValidationResult } from '../types/geofence';

const MINIMUM_REQUIRED_ACCURACY = 50; // meters

export const geofenceUtils = {
  calculateDistance: (
    userLocation: Omit<GeolocationCoordinates, 'accuracy'>,
    targetLocation: Omit<GeolocationCoordinates, 'accuracy'>
  ): number => {
    return getDistance(
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: targetLocation.latitude, longitude: targetLocation.longitude }
    );
  },

  validateGeoFence: (
    userLocation: GeolocationCoordinates,
    targetLocation: Omit<GeolocationCoordinates, 'accuracy'>,
    radius: number
  ): GeoFenceValidationResult => {
    const distance = geofenceUtils.calculateDistance(userLocation, targetLocation);
    
    // Check if distance is within radius
    const isInside = distance <= radius;

    // Validate GPS precision
    const accuracyValid = userLocation.accuracy <= MINIMUM_REQUIRED_ACCURACY;

    return {
      isInside,
      distance,
      accuracyValid,
    };
  }
};
