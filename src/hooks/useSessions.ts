import { useState, useCallback } from 'react';
import { Session } from '../types/session';
import { sessionService } from '../services/sessionService';

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.getActiveSessions();
      setSessions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch active sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeacherSessions = useCallback(async (teacherId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionService.getTeacherSessions(teacherId);
      setSessions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch teacher sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sessions,
    loading,
    error,
    fetchActiveSessions,
    fetchTeacherSessions,
  };
};
