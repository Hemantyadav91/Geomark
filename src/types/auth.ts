export type Role = 'student' | 'teacher';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: Role;
}
