import React from 'react';
import { Navigation, Target, Activity } from 'lucide-react';
import { LocationStatusBadge } from './LocationStatusBadge';
import { GeoFenceValidationResult, GPSStatus, GeolocationCoordinates } from '../../types/geofence';
import { Button } from '@/components/ui/button';

interface GeoFenceStatusCardProps {
  status: GPSStatus;
  location: GeolocationCoordinates | null;
  validationResult: GeoFenceValidationResult | null;
  fetchLocation: () => void;
  error?: string | null;
}

export const GeoFenceStatusCard: React.FC<GeoFenceStatusCardProps> = ({ 
  status, 
  location, 
  validationResult, 
  fetchLocation,
  error 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Navigation className="w-4 h-4 text-slate-400" /> Device Status
        </h3>
        <LocationStatusBadge status={status} />
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
            <p className="text-xs font-medium text-rose-600">{error}</p>
          </div>
        )}

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">GPS Accuracy</span>
            </div>
            {location ? (
              <span className={`text-xs font-mono font-bold ${validationResult?.accuracyValid === false ? 'text-rose-600' : 'text-slate-900'}`}>
                {Math.round(location.accuracy)}m
              </span>
            ) : (
              <span className="text-xs font-mono text-slate-400">--</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600">Distance from Class</span>
            </div>
            {validationResult ? (
              <span className={`text-xs font-mono font-bold ${validationResult.isInside ? 'text-emerald-600' : 'text-rose-600'}`}>
                {validationResult.distance}m
              </span>
            ) : (
              <span className="text-xs font-mono text-slate-400">--</span>
            )}
          </div>
        </div>

        {validationResult && !validationResult.isInside && (
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-center">
            <p className="text-xs font-bold text-amber-700">Outside Attendance Zone</p>
            <p className="text-[10px] text-amber-600 mt-0.5">Move closer to your classroom building to mark attendance.</p>
          </div>
        )}

        {validationResult && !validationResult.accuracyValid && (
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-center">
            <p className="text-xs font-bold text-amber-700">Low GPS Accuracy</p>
            <p className="text-[10px] text-amber-600 mt-0.5">Step outside or connect to Wi-Fi to improve location precision.</p>
          </div>
        )}

        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchLocation} 
          disabled={status === 'fetching'}
          className="w-full text-xs font-bold mt-2"
        >
          {status === 'fetching' ? 'Acquiring Signal...' : 'Refresh Location'}
        </Button>
      </div>
    </div>
  );
};
