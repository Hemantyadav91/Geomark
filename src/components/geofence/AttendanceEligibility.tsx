import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { AttendanceEligibilityState } from '../../types/geofence';

interface AttendanceEligibilityProps {
  state: AttendanceEligibilityState;
  errorMessage?: string;
}

export const AttendanceEligibility: React.FC<AttendanceEligibilityProps> = ({ state, errorMessage }) => {
  if (state === 'loading') {
    return (
      <Badge variant="outline" className="text-xs font-semibold bg-slate-50 text-slate-500 border-slate-200">
        Checking Location...
      </Badge>
    );
  }

  if (state === 'error') {
    return (
      <Badge variant="outline" className="text-xs font-semibold bg-rose-50 text-rose-600 border-rose-200" title={errorMessage}>
        <AlertCircle className="w-3 h-3 mr-1.5" /> Validation Failed
      </Badge>
    );
  }

  if (state === 'eligible') {
    return (
      <Badge variant="outline" className="text-xs font-semibold bg-emerald-50 text-emerald-600 border-emerald-200">
        <CheckCircle2 className="w-3 h-3 mr-1.5" /> Inside Zone
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-xs font-semibold bg-amber-50 text-amber-600 border-amber-200">
      <XCircle className="w-3 h-3 mr-1.5" /> Outside Zone
    </Badge>
  );
};
