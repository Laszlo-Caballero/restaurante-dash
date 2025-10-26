import { ComidaResponse } from '../interfaces/response.interface';

export const comidaMock: ComidaResponse[] = [
  {
    comidaId: 1,
    nombre: 'Tacos al Pastor',
    descripcion: 'Deliciosos tacos de cerdo marinados con piña y especias.',
    precio: 100,
    disponible: true,
  },
  {
    comidaId: 2,
    nombre: 'Enchiladas Verdes',
    descripcion: 'Tortillas rellenas de pollo bañadas en salsa verde y queso.',
    precio: 120,
    disponible: true,
  },
];
