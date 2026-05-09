import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/student/Dashboard';
import StudentHistory from './pages/student/History';
import StudentSettings from './pages/student/Settings';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherCreateSession from './pages/teacher/CreateSession';
import TeacherRecords from './pages/teacher/Records';
import TeacherSettings from './pages/teacher/Settings';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { RoleBasedRoute } from './routes/RoleBasedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<ProtectedRoute />}>
            {/* Student Routes */}
            <Route element={<RoleBasedRoute allowedRole="student" />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/history" element={<StudentHistory />} />
              <Route path="/student/settings" element={<StudentSettings />} />
            </Route>

            {/* Teacher Routes */}
            <Route element={<RoleBasedRoute allowedRole="teacher" />}>
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/create" element={<TeacherCreateSession />} />
              <Route path="/teacher/records" element={<TeacherRecords />} />
              <Route path="/teacher/settings" element={<TeacherSettings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
