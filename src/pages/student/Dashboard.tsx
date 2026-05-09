import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, History, Settings, MapPin, CheckCircle2, Navigation, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSessions } from '../../hooks/useSessions';
import { useAttendance } from '../../hooks/useAttendance';
import { useAuth } from '../../hooks/useAuth';
import { Timestamp } from 'firebase/firestore';
import { useGeolocation } from '../../hooks/useGeolocation';
import { geofenceService } from '../../services/geofenceService';
import { GeoFenceStatusCard } from '../../components/geofence/GeoFenceStatusCard';
import { GeoFenceValidationResult } from '../../types/geofence';
import { Session } from '../../types/session';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/student' },
  { icon: History, label: 'Attendance History', href: '/student/history' },
  { icon: Settings, label: 'Settings', href: '/student/settings' },
];

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const { sessions, loading: sessionsLoading, error: sessionsError, fetchActiveSessions } = useSessions();
  const { attendanceRecords, fetchStudentAttendance } = useAttendance();
  const { location, status: gpsStatus, error: gpsError, fetchLocation } = useGeolocation();
  
  const [markingSessionId, setMarkingSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveSessions();
    if (currentUser) {
      fetchStudentAttendance(currentUser.uid);
    }
  }, [fetchActiveSessions, fetchStudentAttendance, currentUser]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const getValidationResult = (session: Session): GeoFenceValidationResult | null => {
    if (!location) return null;
    return geofenceService.validateAttendanceEligibility(
      location,
      { latitude: session.latitude, longitude: session.longitude },
      session.radius
    );
  };

  const handleMarkAttendance = async (session: Session) => {
    if (!currentUser || !session.id || !location) return;
    
    const validation = getValidationResult(session);
    if (!validation?.isInside || !validation?.accuracyValid) {
       alert("You are either outside the zone or your GPS accuracy is too low.");
       return;
    }

    setMarkingSessionId(session.id);
    
    try {
      const { attendanceService } = await import('../../services/attendanceService');
      await attendanceService.markAttendance({
        studentId: currentUser.uid,
        studentName: currentUser.name || 'Unknown Student',
        sessionId: session.id,
        subject: session.subject,
        timestamp: Timestamp.now(),
        status: "present"
      });
      // Refresh attendance records to show success
      await fetchStudentAttendance(currentUser.uid);
    } catch (err: any) {
      console.error(err);
      alert('Failed to mark attendance: ' + err.message);
    } finally {
      setMarkingSessionId(null);
    }
  };

  const markedSessionIds = new Set(attendanceRecords.map(r => r.sessionId));

  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  // Using the first active session for the overall device status card
  const activeSessionForStatus = sessions.length > 0 ? sessions[0] : null;
  const overallValidationResult = activeSessionForStatus ? getValidationResult(activeSessionForStatus) : null;

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 max-w-4xl">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">{today}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-6">
            
            {sessionsLoading ? (
              <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : sessionsError ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {sessionsError}
              </div>
            ) : sessions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
                <MapPin className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">No Active Sessions</h3>
                <p className="text-slate-500 text-sm mt-1">There are no attendance sessions active right now.</p>
              </div>
            ) : (
              sessions.map((session) => {
                const isMarked = session.id ? markedSessionIds.has(session.id) : false;
                const isMarking = markingSessionId === session.id;
                const validation = getValidationResult(session);
                const canMark = validation?.isInside && validation?.accuracyValid;

                return (
                  <div key={session.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs font-semibold bg-indigo-50 text-indigo-600 border-indigo-200">
                            Attendance Open
                          </Badge>
                          {validation && (
                            <Badge variant="outline" className={`text-xs font-semibold ${validation.isInside ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                              {validation.isInside ? 'Inside Zone' : 'Outside Zone'}
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{session.subject}</h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">{session.teacherName}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                          <MapPin className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Target Area</p>
                          <p className="text-[11px] font-medium text-slate-500">{session.radius} meters</p>
                        </div>
                      </div>
                      {validation && (
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-800">Distance</p>
                          <p className="text-[11px] font-medium text-slate-500">{validation.distance}m</p>
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={() => handleMarkAttendance(session)} 
                      disabled={isMarked || isMarking || !canMark || gpsStatus !== 'success'}
                      className={`w-full py-6 rounded-xl font-bold text-base shadow-sm transition-all ${
                        isMarked 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-50' 
                        : canMark
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      }`}
                      variant={isMarked ? "outline" : "default"}
                    >
                      {isMarked ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Attendance Marked
                        </span>
                      ) : isMarking ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : !canMark ? (
                        spanTextForDisabledState(gpsStatus, validation)
                      ) : (
                        "Mark Attendance"
                      )}
                    </Button>
                  </div>
                )
              })
            )}

          </div>

          {/* Geo-Fence Status Card */}
          <div className="col-span-1">
            <GeoFenceStatusCard 
              status={gpsStatus}
              location={location}
              validationResult={overallValidationResult}
              fetchLocation={fetchLocation}
              error={gpsError}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function spanTextForDisabledState(gpsStatus: string, validation: GeoFenceValidationResult | null) {
  if (gpsStatus === 'fetching') return 'Acquiring GPS...';
  if (gpsStatus === 'denied') return 'Location Access Denied';
  if (gpsStatus === 'error') return 'Location Error';
  if (!validation) return 'Finding Location...';
  if (!validation.isInside) return 'Outside Attendance Zone';
  if (!validation.accuracyValid) return 'Accuracy Too Low';
  return 'Mark Attendance';
}
