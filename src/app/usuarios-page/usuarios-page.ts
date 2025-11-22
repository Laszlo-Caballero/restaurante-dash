import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { ResponseUsuarios } from '@/interfaces/user.interface';
import { ResponseApi } from '@/interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';
import { Title } from '@/components/ui/title/title';
import { ColumnDef } from '@/interfaces/table.interface';
import { parseDate } from '@/utils/parseDate';
import { Table } from '@/components/ui/table/table';
import { Bagde } from '@/components/ui/bagde/bagde';
import { Shield, UserIcon, LucideAngularModule } from 'lucide-angular';
import { Button } from '@/components/ui/button/button';
import { EliminarUsuario } from '@/modules/usuarios/eliminar-usuario/eliminar-usuario';

@Component({
  selector: 'app-usuarios-page',
  imports: [Load, Title, Table, Bagde, LucideAngularModule, Button, EliminarUsuario],
  templateUrl: './usuarios-page.html',
})
export class UsuariosPage implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);

  @ViewChild('role', { static: true }) roleTemplate!: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actionsTemplate!: TemplateRef<any>;

  ShieldIcon = Shield;
  UserIcon = UserIcon;

  users = signal<ResponseUsuarios[]>([]);
  isLoading = signal(false);
  isOpenModal = signal(false);
  selectedUser = signal<ResponseUsuarios | null>(null);

  columns = signal<ColumnDef<ResponseUsuarios>[]>([
    {
      header: 'Usuario',
      accessorKey: 'username',
    },
    {
      header: 'Nombre Completo',
      accessorKey: 'nombre',
    },
    {
      header: 'Estado',
      cell({ row }) {
        return `<span class="p-2 rounded-3xl border border-slate-300 bg-slate-100">${
          row.estado ? 'Activo' : 'Inactivo'
        }</span>`;
      },
    },
    {
      header: 'Ultimo Inicio de Sesión',
      cell({ row }) {
        return parseDate(row.lastLogin);
      },
    },
  ]);

  ngOnInit() {
    this.loadUsers();
    this.columns.set([
      ...this.columns(),
      {
        header: 'Rol',
        cellTemplate: this.roleTemplate,
      },
      {
        header: 'Acciones',
        cellTemplate: this.actionsTemplate,
      },
    ]);
  }

  onDeleteUser(user: ResponseUsuarios) {
    this.selectedUser.set(user);
    this.isOpenModal.set(true);
  }

  onCloseModal = () => {
    this.isOpenModal.set(false);
    this.selectedUser.set(null);
    this.loadUsers();
  };

  loadUsers() {
    this.isLoading.set(true);

    this.httpService
      .get<ResponseApi<ResponseUsuarios[]>>('usuarios', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.users.set(response.data);
        },
        error: () => {
          toast.error('Error al cargar los usuarios');
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
