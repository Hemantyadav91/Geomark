import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, AlertCircle, MapPinOff } from 'lucide-react';
import { GPSStatus } from '../../types/geofence';

interface LocationStatusBadgeProps {
  status: GPSStatus;
}

export const LocationStatusBadge: React.FC<LocationStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'fetching':
      return (
        <Badge variant="outline" className="text-xs font-semibold bg-indigo-50 text-indigo-600 border-indigo-200">
          <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> Fetching GPS
        </Badge>
      );
    case 'success':
      return (
        <Badge variant="outline" className="text-xs font-semibold bg-emerald-50 text-emerald-600 border-emerald-200">
          <MapPin className="w-3 h-3 mr-1.5" /> GPS Active
        </Badge>
      );
    case 'denied':
      return (
        <Badge variant="outline" className="text-xs font-semibold bg-rose-50 text-rose-600 border-rose-200">
          <MapPinOff className="w-3 h-3 mr-1.5" /> Permission Denied
        </Badge>
      );
    case 'error':
      return (
        <Badge variant="outline" className="text-xs font-semibold bg-rose-50 text-rose-600 border-rose-200">
          <AlertCircle className="w-3 h-3 mr-1.5" /> GPS Error
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs font-semibold bg-slate-50 text-slate-500 border-slate-200">
          <MapPin className="w-3 h-3 mr-1.5" /> Location Idle
        </Badge>
      );
  }
};
