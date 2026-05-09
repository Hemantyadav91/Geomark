import React, { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, PlusCircle, Users, Settings, Target, UserCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSessions } from '../../hooks/useSessions';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/teacher' },
  { icon: PlusCircle, label: 'Create Session', href: '/teacher/create' },
  { icon: Users, label: 'Attendance Records', href: '/teacher/records' },
  { icon: Settings, label: 'Settings', href: '/teacher/settings' },
];

export default function TeacherDashboard() {
  const { currentUser } = useAuth();
  const { sessions, loading, error, fetchTeacherSessions } = useSessions();

  useEffect(() => {
    if (currentUser) {
      fetchTeacherSessions(currentUser.uid);
    }
  }, [currentUser, fetchTeacherSessions]);

  const activeSession = sessions.find(s => s.isActive);

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Manage attendance and quick actions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Active Session Card */}
          <div className="bg-white rounded-2xl border border-indigo-100 shadow-[0_4px_20px_rgba(79,70,229,0.06)] overflow-hidden flex flex-col min-h-[250px]">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : error ? (
              <div className="p-6">
                 <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              </div>
            ) : activeSession ? (
              <>
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight">Active Session</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">{activeSession.subject}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-700">
                      <Target className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">{activeSession.radius}m Radius</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <UserCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-medium">Session in progress</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
                  <PlusCircle className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900 tracking-tight">No Active Session</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">You don't have any sessions running right now.</p>
                <Link to="/teacher/create">
                  <Button variant="outline" className="font-bold text-sm h-10 border-slate-200">
                    Start a Session
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center gap-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-2">Quick Actions</h3>
            
            <Link to="/teacher/create">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl shadow-sm transition-all gap-2 justify-start px-6">
                <PlusCircle className="w-5 h-5" />
                Create New Session
              </Button>
            </Link>

            <Link to="/teacher/records">
              <Button variant="outline" className="w-full h-12 font-bold rounded-xl text-slate-700 border-slate-200 hover:bg-slate-50 transition-all gap-2 justify-start px-6">
                <Users className="w-5 h-5" />
                View Attendance Records
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
