import { Role } from '../enum/Role';

export function getRole(role: string) {
  const rolesMap: Record<Role, string> = {
    [Role.ADMIN]: 'Administrador',
    [Role.USER]: 'Usuario',
  };
  return rolesMap[role as Role] || 'Desconocido';
}
