export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface GeoFenceValidationResult {
  isInside: boolean;
  distance: number;
  accuracyValid: boolean;
}

export type GPSStatus = 'idle' | 'fetching' | 'success' | 'error' | 'denied';

export type AttendanceEligibilityState = 'eligible' | 'not_eligible' | 'loading' | 'error';
