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

export interface ResponseCategoria {
  id: number;
  nombre: string;
  descripcion: string;
  // comidas: any[]
  recurso: ResponseRecurso;
  totalComidas: number;
}

export interface ResponseRecurso {
  recursoId: number;
  nombre: string;
  fechaCreacion: string;
}
