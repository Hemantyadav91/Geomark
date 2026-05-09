import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, PlusCircle, Users, Settings, MapPin, CheckCircle2, Loader2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sessionService } from '../../services/sessionService';
import { useAuth } from '../../hooks/useAuth';
import { Timestamp } from 'firebase/firestore';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/teacher' },
  { icon: PlusCircle, label: 'Create Session', href: '/teacher/create' },
  { icon: Users, label: 'Attendance Records', href: '/teacher/records' },
  { icon: Settings, label: 'Settings', href: '/teacher/settings' },
];

export default function TeacherCreateSession() {
  const { currentUser } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState('');
  const [radius, setRadius] = useState('50');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');

  const handleFetchLocation = () => {
    setIsFetching(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsFetching(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsFetching(false);
      },
      (geoError) => {
        setError(geoError.message || 'Failed to fetch location. Please ensure GPS is enabled and permissions are granted.');
        setIsFetching(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !locationCoords) return;
    setLoading(true);
    setError(null);

    try {
      const today = new Date();
      
      const startTimeSplit = startTime.split(':');
      const startDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]));

      const endTimeSplit = endTime.split(':');
      const endDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(endTimeSplit[0]), parseInt(endTimeSplit[1]));

      await sessionService.createSession({
        subject,
        teacherId: currentUser.uid,
        teacherName: currentUser.name || 'Unknown Teacher',
        radius: parseInt(radius),
        latitude: locationCoords.lat,
        longitude: locationCoords.lng,
        startTime: Timestamp.fromDate(startDateTime),
        endTime: Timestamp.fromDate(endDateTime),
        isActive: true,
      });

      setIsStarted(true);
      setSubject('');
      setLocationCoords(null);
    } catch (err: any) {
      setError(err.message || 'Failed to create session');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsStarted(false);
    setSubject('');
    setRadius('50');
    setStartTime('09:00');
    setEndTime('10:30');
    setLocationCoords(null);
  }

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Session</h1>
          <p className="text-slate-500 text-sm mt-1">Start a new geo-fenced attendance session.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          {isStarted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Session Started</h2>
              <p className="text-slate-500 max-w-sm">
                The attendance session is now live. Students within the designated radius can mark their attendance.
              </p>
              <Button onClick={handleReset} variant="outline" className="mt-6 border-slate-200">
                Create Another Session
              </Button>
            </div>
          ) : (
            <form onSubmit={handleStartSession} className="space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subject Name</label>
                <Input 
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Operating Systems" 
                  className="h-11 text-sm bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-indigo-500" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target Radius</label>
                <select 
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <option value="50">50 meters</option>
                  <option value="100">100 meters</option>
                  <option value="200">200 meters</option>
                  <option value="500">500 meters</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
                  <Input 
                    required
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="h-11 text-sm bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-indigo-500" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">End Time</label>
                  <Input 
                    required
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="h-11 text-sm bg-white border-slate-200 shadow-sm rounded-xl focus-visible:ring-indigo-500" 
                  />
                </div>
              </div>

              {/* Location Picker */}
              <div className="space-y-1.5 mt-8 border-t border-slate-100 pt-6">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fence Location Center</label>
                
                {locationCoords ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-800">Location Acquired</span>
                      </div>
                      <p className="text-xs text-emerald-600 font-medium font-mono">
                        Lat: {locationCoords.lat} • Lng: {locationCoords.lng}
                      </p>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setLocationCoords(null)} className="text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 h-8 text-xs">
                      Reset
                    </Button>
                  </div>
                ) : (
                  <Button 
                    type="button"
                    onClick={handleFetchLocation}
                    disabled={isFetching}
                    variant="outline" 
                    className="w-full text-sm font-semibold h-12 bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-none rounded-xl gap-2"
                  >
                    {isFetching ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Fetching GPS Data...</>
                    ) : (
                      <><MapPin className="w-4 h-4" /> Use Current Location</>
                    )}
                  </Button>
                )}
              </div>

              <div className="pt-6">
                <Button 
                  type="submit"
                  disabled={!locationCoords || loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-md transition-all gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Play className="w-4 h-4 fill-current" /> Start Attendance Session</>}
                </Button>
              </div>

            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
