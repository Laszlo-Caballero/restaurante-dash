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
  estado: boolean;
}

export interface ResponseRecurso {
  recursoId: number;
  nombre: string;
  fechaCreacion: string;
}

export interface ResponseMesa {
  mesaId: number;
  numeroMesa: number;
  capacidad: number;
  disponible: boolean;
  pedidos: ResponsePedido[];
}

export interface ResponsePedido {
  pedidoId: number;
  fechaCreacion: string;
  metodoPago: string;
  estado: string;
  total: number;
}
