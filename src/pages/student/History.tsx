import React, { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, History as HistoryIcon, Settings, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAttendance } from '../../hooks/useAttendance';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/student' },
  { icon: HistoryIcon, label: 'Attendance History', href: '/student/history' },
  { icon: Settings, label: 'Settings', href: '/student/settings' },
];

export default function StudentHistory() {
  const { currentUser } = useAuth();
  const { attendanceRecords, loading, error, fetchStudentAttendance } = useAttendance();

  useEffect(() => {
    if (currentUser) {
      fetchStudentAttendance(currentUser.uid);
    }
  }, [currentUser, fetchStudentAttendance]);

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance History</h1>
          <p className="text-slate-500 text-sm mt-1">Review your past attendance records.</p>
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
                <HistoryIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">No History Found</h3>
              <p className="text-slate-500 text-sm mt-1">You haven't marked attendance for any sessions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-xs text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceRecords.map((record, i) => (
                    <tr key={record.id || i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-500">
                        {record.timestamp.toDate().toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge 
                          variant="outline" 
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 capitalize"
                        >
                          {record.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
