import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Attendance } from '../types/attendance';

export const attendanceService = {
  markAttendance: async (attendanceData: Omit<Attendance, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'attendance'), attendanceData);
      return docRef.id;
    } catch (error) {
      console.error("Error marking attendance: ", error);
      throw error;
    }
  },

  getStudentAttendance: async (studentId: string): Promise<Attendance[]> => {
    try {
      const q = query(
        collection(db, 'attendance'),
        where('studentId', '==', studentId)
      );
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const records: Attendance[] = [];
      querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() } as Attendance);
      });
      // Sort client-side to avoid needing a composite index
      return records.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
    } catch (error) {
      console.error("Error getting student attendance: ", error);
      throw error;
    }
  },

  getSessionAttendance: async (sessionId: string): Promise<Attendance[]> => {
    try {
      const q = query(
        collection(db, 'attendance'),
        where('sessionId', '==', sessionId)
      );
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const records: Attendance[] = [];
      querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() } as Attendance);
      });
      // Sort client-side to avoid needing a composite index
      return records.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
    } catch (error) {
      console.error("Error getting session attendance: ", error);
      throw error;
    }
  },
  
  getTeacherAttendanceRecords: async (teacherId: string): Promise<Attendance[]> => {
    // Note: Due to lack of direct join queries in Firestore, it's simpler to fetch all teacher's sessions 
    // and then fetch attendance for those, or fetch attendance and filter. 
    // Wait, the requirement says getSessionAttendance(), but the teacher view may need records for ALL of their sessions
    // Let's implement it to get all attendance where the sessionId matches their sessions.
    try {
      // First, get all sessions for this teacher
      const { sessionService } = await import('./sessionService');
      const sessions = await sessionService.getTeacherSessions(teacherId);
      const sessionIds = sessions.map(s => s.id as string).filter(id => id != null);
      
      if (sessionIds.length === 0) return [];

      // chunk the sessionIds in batches of 10 for 'in' queries
      const records: Attendance[] = [];
      for (let i = 0; i < sessionIds.length; i += 10) {
        const batch = sessionIds.slice(i, i + 10);
        const q = query(
          collection(db, 'attendance'),
          where('sessionId', 'in', batch)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          records.push({ id: doc.id, ...doc.data() } as Attendance);
        });
      }
      
      return records.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
    } catch (error) {
      console.error("Error getting all attendance for teacher: ", error);
      throw error;
    }
  }
};
