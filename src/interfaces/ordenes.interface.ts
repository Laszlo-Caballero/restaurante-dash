import { ComidaResponse, ResponseMesa } from './response.interface';
import { ResponseUsuarios } from './user.interface';

export interface MesasOrdenesMessage {
  mesa: ResponseMesa;
  comidas: ComidaResponse[];
}

export interface ResponseOrden {
  pedidoId: number;
  fechaCreacion: string;
  metodoPago: string;
  estado: string;
  mesa: ResponseMesa;
  total: number;
  comidas: ComidaOrden[];
}

export interface ComidaOrden {
  comida: ComidaResponse;
  usuario: ResponseUsuarios;
}
