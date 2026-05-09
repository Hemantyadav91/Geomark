import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Session } from '../types/session';

export const sessionService = {
  createSession: async (sessionData: Omit<Session, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'sessions'), {
        ...sessionData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  },

  getActiveSessions: async (): Promise<Session[]> => {
    try {
      const q = query(
        collection(db, 'sessions'),
        where('isActive', '==', true)
      );
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const sessions: Session[] = [];
      querySnapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() } as Session);
      });
      // Sort client-side to avoid needing a composite index
      return sessions.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    } catch (error) {
      console.error("Error getting active sessions: ", error);
      throw error;
    }
  },

  getTeacherSessions: async (teacherId: string): Promise<Session[]> => {
    try {
      const q = query(
        collection(db, 'sessions'),
        where('teacherId', '==', teacherId)
      );
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const sessions: Session[] = [];
      querySnapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() } as Session);
      });
      // Sort client-side to avoid needing a composite index
      return sessions.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    } catch (error) {
      console.error("Error getting teacher sessions: ", error);
      throw error;
    }
  }
};
