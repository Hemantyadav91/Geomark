import { Timestamp } from 'firebase/firestore';

export interface Session {
  id?: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  radius: number;
  latitude: number;
  longitude: number;
  startTime: Timestamp;
  endTime: Timestamp;
  isActive: boolean;
  createdAt: Timestamp;
}
