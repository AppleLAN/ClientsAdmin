export interface User {
  id: string;
  name: string;
  status: string;
  date: string;
  lastName: string;
  email: string;
  notes: string;
  userId: string;
}

export interface LogInUser {
  email: string;
  password: string;
}
