import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Bell, LogOut, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/hooks/useAuth';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  user?: {
    name: string;
    initials: string;
    role: string;
  };
}

export default function DashboardLayout({ children, navItems, user: overrideUser }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    navigate('/');
  };

  const name = currentUser?.name || overrideUser?.name || 'User';
  const displayRole = currentUser?.role || overrideUser?.role || 'User';
  const initials = currentUser?.name?.substring(0, 2).toUpperCase() || overrideUser?.initials || 'U';

  const SidebarContent = () => (
    <>
      <Link to="/" className="flex items-center gap-2 mb-10 pl-2 hover:opacity-90 transition-opacity">
        <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg shadow-sm flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1">
             <div className="w-2 h-2 bg-indigo-500 rounded-full" />
             <div className="w-2 h-2 bg-slate-800 rounded-full" />
             <div className="w-2 h-2 bg-slate-800 rounded-full" />
             <div className="w-2 h-2 bg-slate-800 rounded-full" />
          </div>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">GeoMark</span>
      </Link>
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-2 mb-3 block">Menu</span>
      <nav className="space-y-1 flex-1">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={i} to={item.href} onClick={() => setMobileMenuOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                isActive 
                  ? 'text-indigo-700 bg-indigo-50 border border-indigo-100/50' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}>
                <item.icon className="w-4 h-4" /> {item.label}
              </div>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer rounded-lg">
          <LogOut className="w-4 h-4" /> Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="md:hidden fixed inset-y-0 left-0 w-[260px] bg-white p-6 z-50 flex flex-col border-r border-slate-200 shadow-xl"
            >
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[260px] lg:w-[280px] border-r border-slate-200 bg-white p-6 z-20 sticky top-0 h-screen">
        <SidebarContent />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative w-full h-screen overflow-hidden">
        {/* Top Navbar */}
        <div className="h-16 flex-shrink-0 border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-slate-500 hover:text-slate-700 focus:outline-none -ml-1 p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="hidden sm:inline">Welcome back,</span> {name} 👋
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white" />
             </button>
             <Avatar className="w-9 h-9 cursor-pointer border border-slate-200">
               <AvatarImage src="" />
               <AvatarFallback className="bg-slate-100 text-slate-600 text-sm font-bold">{initials}</AvatarFallback>
             </Avatar>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#fafafa]">
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
