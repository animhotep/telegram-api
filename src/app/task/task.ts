export interface Task {
  id?: string;
  title: string;
  description: string;
}

export interface Hero {
  ok: boolean;
  result: {
    first_name: string;
    id: number;
    username: string;
  };
}


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
