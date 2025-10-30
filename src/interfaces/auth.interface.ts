export interface User {
  token: string;
  usuarioId: number;
  nombre: string;
  username: string;
  role: string;
}

export interface UserInput {
  username: string;
  password: string;
}
