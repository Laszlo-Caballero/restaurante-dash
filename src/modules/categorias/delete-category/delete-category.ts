import { ResponseCategoria } from '@/interfaces/response.interface';
import { Component, inject, Input } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { LucideAngularModule, X } from 'lucide-angular';
import { Button } from '@/components/ui/button/button';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-delete-category',
  imports: [Modal, LucideAngularModule, Button],
  templateUrl: './delete-category.html',
})
export class DeleteCategory {
  @Input() category: ResponseCategoria | undefined;
  @Input({ required: true }) onCloseModal!: () => void;

  XIcon = X;

  authService = inject(AuthService);
  httpService = inject(HttpService);

  onSubmitDelete() {
    if (!this.category) {
      return;
    }
    this.httpService
      .delete(`categorias/${this.category.id}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          toast.success('Categoría eliminada correctamente');
          this.onCloseModal();
        },
        error: () => {
          toast.error('Error al eliminar la categoría');
        },
      });
  }
}
