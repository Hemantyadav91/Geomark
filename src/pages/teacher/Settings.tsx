import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Home, PlusCircle, Users, Settings as SettingsIcon, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/teacher' },
  { icon: PlusCircle, label: 'Create Session', href: '/teacher/create' },
  { icon: Users, label: 'Attendance Records', href: '/teacher/records' },
  { icon: SettingsIcon, label: 'Settings', href: '/teacher/settings' },
];

export default function TeacherSettings() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const initials = currentUser?.name?.substring(0, 2).toUpperCase() || 'TR';

  return (
    <DashboardLayout navItems={navItems} user={{ name: currentUser?.name || 'Teacher', initials, role: 'Teacher / Admin' }}>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your administrator preferences.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-slate-400" /> Admin Profile
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="w-20 h-20 border border-slate-200 shadow-sm">
                <AvatarFallback className="bg-indigo-50 text-indigo-600 text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-4 w-full text-center sm:text-left">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Full Name</label>
                  <p className="text-base font-semibold text-slate-900">{currentUser?.name}</p>
                </div>
                
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                  <p className="text-base font-semibold text-slate-900">{currentUser?.email}</p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Role</label>
                  <p className="text-base font-semibold text-slate-900 capitalize">{currentUser?.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button onClick={handleLogout} variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 font-semibold gap-2 transition-colors">
                <LogOut className="w-4 h-4" /> Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
