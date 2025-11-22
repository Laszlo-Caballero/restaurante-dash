import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http/http-service';
import { ComidaResponse, ResponseApi } from '../../../interfaces/response.interface';
import { AuthService } from '../../../services/auth/auth-service';
import { toast } from 'ngx-sonner';
import { Title } from '../../../components/ui/title/title';
import { Button } from '../../../components/ui/button/button';
import { LucideAngularModule, PencilLine } from 'lucide-angular';
import { Details } from '../../../components/ui/details/details';
import { InputComponent } from '../../../components/ui/input/input';
import { TextArea } from '../../../components/ui/text-area/text-area';
import { Checkbox } from '../../../components/ui/checkbox/checkbox';
import { ENV } from '../../../config/env';

@Component({
  selector: 'app-detalle-comida',
  imports: [
    Title,
    Button,
    RouterLink,
    LucideAngularModule,
    Details,
    InputComponent,
    TextArea,
    Checkbox,
  ],
  templateUrl: './detalle-comida.html',
})
export class DetalleComida implements OnInit {
  comidaId = signal<number | null>(null);
  comidaDetails = signal<ComidaResponse | null>(null);
  isLoading = signal(false);

  EditIcon = PencilLine;

  private activeRouter = inject(ActivatedRoute);
  private httpService = inject(HttpService);
  private authService = inject(AuthService);

  constructor() {
    this.activeRouter.params.subscribe((params) => {
      this.comidaId.set(+params['id']);
    });
  }

  ngOnInit() {
    if (this.comidaId() !== null) {
      const id = this.comidaId()!;
      this.loadComidaDetails(id);
    }
  }

  loadComidaDetails(id: number) {
    this.isLoading.set(true);

    this.httpService
      .get<ResponseApi<ComidaResponse>>(`comidas/${id}`, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.comidaDetails.set(response.data);
        },
        error: () => {
          toast.error('Error al cargar los detalles de la comida');
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  getUrlImagen(): string {
    return `${ENV.imagesUrl}/${this.comidaDetails()?.recurso.nombre}`;
  }
}
