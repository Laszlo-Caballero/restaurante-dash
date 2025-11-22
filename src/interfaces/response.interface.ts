export interface ComidaResponse {
  comidaId: number;
  nombre: string;
  slug: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  cantidadPedidos: number;
  ventasTotales: number;
  gananciaTotal: number;
  categorias: ResponseCategoria[];
  recurso: ResponseRecurso;
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
