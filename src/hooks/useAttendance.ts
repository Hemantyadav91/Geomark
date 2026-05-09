import { useState, useCallback } from 'react';
import { Attendance } from '../types/attendance';
import { attendanceService } from '../services/attendanceService';

export const useAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentAttendance = useCallback(async (studentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getStudentAttendance(studentId);
      setAttendanceRecords(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch student attendance');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSessionAttendance = useCallback(async (sessionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getSessionAttendance(sessionId);
      setAttendanceRecords(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch session attendance');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeacherAttendanceRecords = useCallback(async (teacherId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getTeacherAttendanceRecords(teacherId);
      setAttendanceRecords(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    attendanceRecords,
    loading,
    error,
    fetchStudentAttendance,
    fetchSessionAttendance,
    fetchTeacherAttendanceRecords
  };
};
