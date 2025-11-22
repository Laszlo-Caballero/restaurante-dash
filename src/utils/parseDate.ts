import { isToday, isYesterday, differenceInDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

export function parseDate(fechaISO?: string) {
  if (!fechaISO) {
    return 'N/A';
  }

  const fecha = new Date(fechaISO);
  const ahora = new Date();

  const hora = format(fecha, 'HH:mm', { locale: es });

  // 👉 Hoy
  if (isToday(fecha)) {
    return `Hoy, ${hora} horas`;
  }

  // 👉 Ayer
  if (isYesterday(fecha)) {
    return `Ayer, ${hora} horas`;
  }

  // 👉 Hace X días
  const dias = differenceInDays(ahora, fecha);
  return `Hace ${dias} días, ${hora} horas`;
}
