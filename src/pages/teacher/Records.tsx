import React, { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, PlusCircle, Users, Settings, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAttendance } from '../../hooks/useAttendance';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/teacher' },
  { icon: PlusCircle, label: 'Create Session', href: '/teacher/create' },
  { icon: Users, label: 'Attendance Records', href: '/teacher/records' },
  { icon: Settings, label: 'Settings', href: '/teacher/settings' },
];

export default function TeacherRecords() {
  const { currentUser } = useAuth();
  const { attendanceRecords, loading, error, fetchTeacherAttendanceRecords } = useAttendance();

  useEffect(() => {
    if (currentUser) {
      fetchTeacherAttendanceRecords(currentUser.uid);
    }
  }, [currentUser, fetchTeacherAttendanceRecords]);

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Records</h1>
          <p className="text-slate-500 text-sm mt-1">View student attendance logs across all subjects.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full p-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            </div>
          ) : attendanceRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">No Records Found</h3>
              <p className="text-slate-500 text-sm mt-1">There are no attendance records for your sessions yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {attendanceRecords.map((record, i) => (
                <div key={record.id || i} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-slate-900 text-sm">{record.studentName}</span>
                    <div className="flex items-center text-slate-500 text-xs">
                      <span className="truncate max-w-[120px] sm:max-w-none">{record.subject}</span>
                      <span className="mx-1.5 opacity-50">•</span>
                      <span className="font-mono">{record.timestamp.toDate().toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <Badge 
                      variant="outline" 
                      className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 capitalize"
                    >
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
