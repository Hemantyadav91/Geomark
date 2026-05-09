import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Menu,
  ArrowRight,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  LogOut,
  MapPinOff,
  Navigation,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Navbar() {
  const { currentUser } = useAuth();
  
  return (
    <nav className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200 z-50 sticky top-0">
      <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg shadow-sm flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1">
             <div className="w-2 h-2 bg-indigo-500 rounded-full" />
             <div className="w-2 h-2 bg-slate-800 rounded-full" />
             <div className="w-2 h-2 bg-slate-800 rounded-full" />
             <div className="w-2 h-2 bg-slate-800 rounded-full" />
          </div>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">GeoMark</span>
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
        <a href="#preview" className="hover:text-indigo-600 transition-colors">Preview</a>
      </div>
      <div className="flex items-center gap-4">
        {currentUser ? (
          <Link to={`/${currentUser.role}`} className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2 rounded-full shadow-sm hover:bg-indigo-700 transition-colors">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="hidden sm:inline-flex text-sm font-semibold px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">Login</Link>
            <Link to="/signup" className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2 rounded-full shadow-sm hover:bg-indigo-700 transition-colors">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function HeroCTA() {
  const { currentUser } = useAuth();
  
  return (
    <Link to={currentUser ? `/${currentUser.role}` : "/signup"}>
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-[1.1rem] shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 transition-all w-full sm:w-auto tracking-wide"
      >
        {currentUser ? "Go to Dashboard" : "Get free demo"}
      </motion.button>
    </Link>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40 z-10 flex flex-col items-center min-h-[600px] lg:min-h-[800px] justify-center bg-[#f9fafb]">
      {/* Dot grid background */}
      <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

      {/* Floating Elements (Visible on lg screens and up) */}
      
      {/* Top Left: Sticky Note & Squircle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-28 left-[2%] xl:left-[10%] hidden lg:flex flex-col items-center z-0"
      >
        <div className="relative">
          {/* Paper behind */}
          <div className="absolute w-48 h-48 bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.06)] -left-6 top-6 rotate-[-12deg] border border-slate-100" />
          
          {/* Yellow Sticky */}
          <div className="relative w-52 h-52 bg-[#feea76] shadow-md rounded-sm rotate-[-4deg] p-6 border border-[#f5df5b]">
            <div className="absolute -top-3 left-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md -translate-x-1/2 flex items-center justify-center border border-red-800/20">
               <div className="w-1.5 h-1.5 bg-black/30 rounded-full shadow-inner" />
            </div>
            <p className="text-slate-800 text-[1.2rem] leading-[1.2] pt-2" style={{ fontFamily: "'Caveat', cursive" }}>
              Draw virtual fences<br/> around classrooms,<br/> and let location data<br/> handle roll calls.
            </p>
          </div>
          
          {/* Floating Squircle */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-[1.75rem] shadow-xl flex items-center justify-center border border-slate-50 rotate-[5deg]"
          >
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-inner">
               <CheckCircle2 className="text-white w-7 h-7" strokeWidth={3} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Top Right: Reminders Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-28 right-[2%] xl:right-[10%] hidden lg:block z-0"
      >
        <div className="relative">
          {/* Folder Tab background effect */}
          <div className="absolute -top-3 right-0 w-3/4 h-8 bg-slate-100 rounded-t-2xl border border-slate-200 rotate-[6deg]" />
          
          <div className="w-64 bg-slate-50/80 rounded-3xl shadow-xl border border-slate-200/50 p-1.5 rotate-[6deg] relative z-10 backdrop-blur-sm">
             <div className="bg-white rounded-2xl h-full w-full p-5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-slate-800 text-sm">Next Class</h3>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide">Schedule</span>
                </div>
                <div className="bg-slate-50 p-4 border-l-2 border-indigo-500 rounded-r-xl">
                  <p className="text-xs font-bold text-slate-800 mb-1">Computer Science 101</p>
                  <p className="text-[10px] text-slate-500 mb-3">Room 402 • Prof. Turing</p>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-indigo-600 w-fit px-3 py-1.5 rounded-lg border border-indigo-200/60 bg-white shadow-sm">
                    <Clock className="w-3 h-3" strokeWidth={2.5}/> 09:00 - 10:30
                  </div>
                </div>
             </div>
          </div>
          
          {/* Floating Clock Squircle */}
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -left-12 top-6 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-slate-50 rotate-[-5deg] z-20"
          >
             <Clock className="w-8 h-8 text-slate-800" strokeWidth={2.5}/>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Left: Tasks */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-[10%] left-[2%] xl:left-[8%] hidden lg:block z-0"
      >
        <div className="relative">
          {/* Tab effect */}
          <div className="absolute -top-3 left-0 w-3/4 h-8 bg-slate-100 rounded-t-2xl border border-slate-200 rotate-[-3deg]" />
          
          <div className="w-80 bg-slate-50/80 rounded-3xl shadow-2xl border border-slate-200/50 p-1.5 rotate-[-3deg] backdrop-blur-sm relative z-10">
             <div className="bg-white rounded-2xl p-6 h-full w-full">
                 <h3 className="font-bold text-slate-800 text-[15px] mb-6">Live Attendance</h3>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-slate-700 flex items-center gap-2.5">
                            <div className="w-5 h-5 bg-orange-500 text-white rounded flex items-center justify-center text-[10px] font-bold shadow-sm"><Users className="w-3 h-3" /></div> 
                            CS 101
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">92%</span>
                       </div>
                       <div className="flex gap-4 items-center">
                         <div className="text-[10px] text-slate-400 font-medium">35/38 Checked-in</div>
                         <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full w-[92%]"/>
                         </div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-slate-700 flex items-center gap-2.5">
                            <div className="w-5 h-5 bg-emerald-500 text-white rounded flex items-center justify-center text-[10px] font-bold shadow-sm"><Users className="w-3 h-3" /></div> 
                            Physics 202
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">85%</span>
                       </div>
                       <div className="flex gap-4 items-center">
                         <div className="text-[10px] text-slate-400 font-medium">25/30 Checked-in</div>
                         <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full w-[85%] max-w-full"/>
                         </div>
                       </div>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right: Integrations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-[10%] right-[2%] xl:right-[10%] hidden lg:block z-0"
      >
        <div className="relative">
          <div className="absolute -top-3 left-0 w-3/4 h-8 bg-slate-100 rounded-t-2xl border border-slate-200 rotate-[4deg]" />
          
          <div className="w-72 bg-slate-50/80 rounded-3xl shadow-xl border border-slate-200/50 p-1.5 rotate-[4deg] backdrop-blur-sm relative z-10">
             <div className="bg-white rounded-2xl p-6 h-full w-full">
                 <h3 className="font-bold text-slate-800 text-[15px] mb-6">LMS Integrations</h3>
                 <div className="flex justify-center gap-5">
                    <div className="w-16 h-16 bg-white shadow-[0_4px_15px_rgb(0,0,0,0.08)] rounded-2xl flex items-center justify-center border border-slate-50 hover:-translate-y-1 transition-transform cursor-pointer">
                       <svg className="w-8 h-8" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                    <div className="w-16 h-16 bg-white shadow-[0_4px_15px_rgb(0,0,0,0.08)] rounded-2xl flex items-center justify-center border border-slate-50 hover:-translate-y-1 transition-transform cursor-pointer">
                       <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A"/><path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0"/><path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.52A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.835a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.835a2.528 2.528 0 0 1-2.522 2.52h-2.522v-2.52z" fill="#2EB67D"/><path d="M17.688 8.835a2.528 2.528 0 0 1-2.523 2.52 2.528 2.528 0 0 1-2.52-2.52V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.313z" fill="#2EB67D"/><path d="M15.165 18.958a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.528 2.528 0 0 1-2.523-2.52v-2.522h2.523z" fill="#ECB22E"/><path d="M15.165 17.687a2.528 2.528 0 0 1-2.523-2.523 2.528 2.528 0 0 1 2.523-2.52h6.312A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522-2.521h-6.313z" fill="#ECB22E"/></svg>
                    </div>
                    <div className="w-16 h-16 bg-white shadow-[0_4px_15px_rgb(0,0,0,0.08)] rounded-2xl flex items-center justify-center border border-slate-50 hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30">
                       <div className="absolute top-0 left-0 right-0 h-4 bg-[#6366f1] flex items-center justify-center"></div>
                       <div className="text-[22px] font-bold text-slate-800 mt-3 tracking-tighter">31</div>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center mt-[-20px]">
        {/* Animated logo */}
        <a href="/">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center mb-10 border border-slate-50 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-shadow"
          >
            <div className="grid grid-cols-2 gap-2.5">
               <div className="w-5 h-5 bg-indigo-500 rounded-full" />
               <div className="w-5 h-5 bg-slate-800 rounded-full" />
               <div className="w-5 h-5 bg-slate-800 rounded-full" />
               <div className="w-5 h-5 bg-slate-800 rounded-full" />
            </div>
          </motion.div>
        </a>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[3.5rem] sm:text-6xl md:text-[5rem] font-medium tracking-tight text-slate-900 mb-6 leading-[1.05] max-w-4xl pb-2"
        >
          Track, verify, and monitor <br className="hidden md:block"/>
          <span className="text-[#a1a1aa] font-normal">attendance effortlessly</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#52525b] mb-12 max-w-2xl mx-auto font-normal tracking-wide"
        >
          Eliminate manual roll calls using high-precision, secure geo-fencing for your institution.
        </motion.p>

        <HeroCTA />
      </div>
    </section>
  );
}

const features = [
  {
    icon: Navigation,
    title: "Real-Time Location Verification",
    description: "Instantly verify student presence using high-precision GPS and network location data."
  },
  {
    icon: MapPinOff,
    title: "Radius-Based Geo-Fencing",
    description: "Draw custom virtual perimeters around classrooms or lecture halls with pinpoint accuracy."
  },
  {
    icon: ShieldCheck,
    title: "Secure Attendance Tracking",
    description: "Prevent buddy-punching and location spoofing with advanced anti-fraud algorithms."
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly Experience",
    description: "Students mark attendance with a single tap from their iOS or Android devices."
  }
];

function Features() {
  return (
    <section id="features" className="py-32 bg-transparent z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Everything you need to manage attendance
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A comprehensive suite of tools designed to make attendance tracking effortless, accurate, and secure.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
             <div
              key={i}
              className="p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    step: "01",
    title: "Teacher Creates Session",
    description: "Set up a class, define the geographical radius, and start an active attendance session in seconds."
  },
  {
    step: "02",
    title: "Student Enters Geo-Fence",
    description: "Students arrive at the designated location and open the app. The system confirms they are within bounds."
  },
  {
    step: "03",
    title: "Attendance Verified Automatically",
    description: "With one tap, attendance is marked. Records are securely stored and synced to the teacher's dashboard."
  }
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-transparent z-10 relative border-t border-slate-200/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            How GeoMark works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A frictionless experience for both educators and students. Follow these simple steps.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 justify-center relative">
          <div className="hidden md:block absolute top-[28px] lg:top-[32px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          
          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center gap-5 relative z-10">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm text-indigo-600 flex items-center justify-center text-lg lg:text-xl font-black ring-8 ring-slate-50 z-10 mb-2">
                {step.step.replace('0', '')}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <section id="preview" className="hidden md:block py-32 bg-transparent z-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Powerful dashboard for educators
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Get a birds-eye view of your classes, monitor live attendance sessions, and export reports seamlessly.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white shadow-2xl flex flex-col md:flex-row min-h-[700px] overflow-hidden">
          
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-[280px] border-r border-slate-100 bg-slate-50 p-8 z-20 relative">
            <div className="flex items-center gap-3 mb-12 pl-2">
              <div className="bg-white border border-slate-100 shadow-sm p-1.5 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                   <div className="w-1.5 h-1.5 bg-indigo-500 rounded-[2px]" />
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-[2px]" />
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-[2px]" />
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-[2px]" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">GeoMark</span>
            </div>

            <nav className="space-y-2 flex-1">
              <div className="flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-xl text-indigo-600 bg-indigo-50 border border-indigo-100/50">
                <BarChart3 className="w-5 h-5" /> Overview
              </div>
              <div className="flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer">
                <Users className="w-5 h-5" /> Classes
              </div>
              <div className="flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5" /> Locations
              </div>
              <div className="flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer">
                <Settings className="w-5 h-5" /> Settings
              </div>
            </nav>
            <div className="mt-auto">
              <div className="flex items-center gap-4 px-4 py-3 text-sm font-medium text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer rounded-xl">
                <LogOut className="w-5 h-5" /> Log out
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white overflow-hidden flex flex-col relative w-full">
            {/* Header */}
            <div className="h-20 border-b border-slate-100 flex items-center justify-between px-8 bg-white z-10 sticky top-0">
              <div className="text-sm font-bold text-slate-800">Hello, Dr. Smith 👋</div>
              <div className="flex items-center gap-6">
                 <button className="text-slate-400 hover:text-slate-600 transition-colors">
                   <Bell className="w-5 h-5" />
                 </button>
                 <Avatar className="w-10 h-10 cursor-pointer border border-slate-100">
                   <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />
                   <AvatarFallback className="bg-slate-100 text-slate-600 text-sm font-bold">DS</AvatarFallback>
                 </Avatar>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Total Students', value: '432' },
                  { label: 'Average Attendance', value: '94%' },
                  { label: 'Active Sessions', value: '2' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-medium text-slate-500 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Active Session */}
              <div className="bg-white rounded-2xl border border-slate-200 mb-8 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Active Session: Data Structures</h3>
                    <p className="text-sm text-slate-500 mt-1">Room 101 • Ending in 24m</p>
                  </div>
                  <button className="px-5 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 shadow-sm">End Session</button>
                </div>
                <div className="p-6 bg-slate-50/50">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="font-medium text-slate-500">Attendance Rate</span>
                    <span className="text-emerald-600 font-bold">42 / 45 Present</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>

              {/* Fake Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-6">Recent Records</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Alice Johnson', time: '09:02 AM', status: 'Present' },
                    { name: 'Michael Chen', time: '09:05 AM', status: 'Present' },
                    { name: 'Sarah Williams', time: '--:--', status: 'Absent' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-3 border-b border-slate-100 last:border-0 pointer-events-none hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-indigo-50 text-indigo-600 text-xs font-bold">{row.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-sm text-slate-700">{row.name}</span>
                      </div>
                      <div className="text-sm text-slate-500 font-medium">{row.time}</div>
                      <div className={`px-3 py-1 text-xs font-bold rounded-full border ${row.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {row.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { currentUser } = useAuth();
  return (
    <section className="py-24 bg-transparent z-10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 border border-slate-800 shadow-2xl">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to modernize your operations?</h2>
            <p className="text-lg text-slate-400">Join over 500+ institutions using GeoMark for automated tracking.</p>
          </div>
          <Link to={currentUser ? `/${currentUser.role}` : "/signup"}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold whitespace-nowrap shadow-lg shadow-indigo-600/20 transition-colors text-lg">
              {currentUser ? "Go to Dashboard" : "Start for free"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="h-20 border-t border-slate-200 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between text-sm font-medium text-slate-500 z-10 bg-white relative gap-4">
      <div className="flex items-center gap-4">
        <span className="font-bold text-slate-900 tracking-tight">GeoMark &copy; {new Date().getFullYear()}</span>
        <span className="hidden sm:inline">Status: Systems Operational</span>
      </div>
      <div className="flex gap-8 uppercase tracking-wider text-xs">
        <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative selection:bg-indigo-100 selection:text-indigo-900">
      {/* Global Background Decoration matching the Professional Polish theme */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[20%] w-px bg-slate-100/50" />
        <div className="absolute top-0 bottom-0 right-[20%] w-px bg-slate-100/50" />
      </div>

      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <CTA />
      <Footer />
    </div>
  );
}
