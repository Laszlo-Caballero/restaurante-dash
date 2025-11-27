import { ResponseMesa } from '@/interfaces/response.interface';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { Component, inject, Input, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { Button } from '@/components/ui/button/button';

@Component({
  selector: 'app-delete-mesa',
  imports: [Button],
  templateUrl: './delete-mesa.html',
})
export class DeleteMesa {
  @Input({ required: true }) onClose!: () => void;
  @Input({ required: true }) mesa!: ResponseMesa;

  authService = inject(AuthService);
  httpService = inject(HttpService);

  isLoading = signal(false);

  onDelete() {
    this.isLoading.set(true);
    this.httpService
      .delete(`mesas/${this.mesa.mesaId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          toast.success('Mesa eliminada correctamente.');
          this.onClose();
        },
        error: () => {
          this.isLoading.set(false);
          toast.error('Error al eliminar la mesa.');
        },
      });
  }
}
