import { EstadoOrden } from '@/enum/EstadoOrden';

export function parseEstadoOrden(estado: EstadoOrden): string {
  const estadoMap: Record<EstadoOrden, string> = {
    [EstadoOrden.PENDIENTE]: 'Pendiente',
    [EstadoOrden.EN_PREPARACION]: 'En Preparación',
    [EstadoOrden.EN_ESPERA]: 'En Espera',
    [EstadoOrden.CANCELADA]: 'Cancelada',
    [EstadoOrden.LISTA]: 'Lista',
  };

  return estadoMap[estado] || 'Desconocido';
}
