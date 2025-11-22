import { Component, inject, Input } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { LucideAngularModule, X } from 'lucide-angular';
import { ResponseUsuarios } from '@/interfaces/user.interface';
import { Button } from '@/components/ui/button/button';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';

@Component({
  selector: 'app-eliminar-usuario',
  imports: [Modal, LucideAngularModule, Button, Load],
  templateUrl: './eliminar-usuario.html',
})
export class EliminarUsuario {
  @Input({ required: true }) onCloseModal!: () => void;
  @Input({ required: true }) user!: ResponseUsuarios;

  XIcon = X;

  httpClient = inject(HttpService);
  authService = inject(AuthService);

  isLoading = false;

  deleteUser() {
    this.isLoading = true;
    this.httpClient
      .delete(`usuarios/${this.user.usuarioId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          toast.success('Usuario eliminado correctamente');
          this.onCloseModal();
        },
        error: () => {
          toast.error('Error al eliminar el usuario');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
