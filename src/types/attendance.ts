import { Timestamp } from 'firebase/firestore';

export interface Attendance {
  id?: string;
  studentId: string;
  studentName: string;
  sessionId: string;
  subject: string;
  timestamp: Timestamp;
  status: "present";
}
