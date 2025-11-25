import { EstadoOrden } from '@/enum/EstadoOrden';
import { ComidaResponse, ResponseMesa } from './response.interface';
import { ResponseUsuarios } from './user.interface';

export interface MesasOrdenesMessage {
  ordenId?: number;
  mesa: ResponseMesa;
  comidas: ComidaResponse[];
  estado: EstadoOrden;
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
  cantidad: number;
  comida: ComidaResponse;
  usuario: ResponseUsuarios;
}
