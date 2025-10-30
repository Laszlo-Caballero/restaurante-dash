export interface ComidaResponse {
  comidaId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
}

export interface ResponseApi<T> {
  code: number;
  message: string;
  data: T;
}

export interface ResponseRecurso {
  recursoId: number;
  nombre: string;
  fechaCreacion: string;
}
