import { geofenceUtils } from '../utils/geofence';
import { GeolocationCoordinates, GeoFenceValidationResult } from '../types/geofence';

export const geofenceService = {
  validateAttendanceEligibility: (
    userLocation: GeolocationCoordinates,
    sessionLocation: { latitude: number; longitude: number },
    sessionRadius: number
  ): GeoFenceValidationResult => {
    return geofenceUtils.validateGeoFence(
      userLocation,
      sessionLocation,
      sessionRadius
    );
  }
};
