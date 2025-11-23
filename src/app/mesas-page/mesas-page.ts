import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@/components/ui/title/title';
import { Button } from '@/components/ui/button/button';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { ResponseApi, ResponseMesa } from '@/interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';
import { CardTable } from '@/components/ui/card-table/card-table';
import { CreateMesa } from '@/modules/mesas/create-mesa/create-mesa';

@Component({
  selector: 'app-mesas-page',
  imports: [Title, Button, Load, CardTable, CreateMesa],
  templateUrl: './mesas-page.html',
})
export class MesasPage implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);

  isLoading = signal(false);
  isOpenCreateMesa = signal(false);

  mesas = signal<ResponseMesa[]>([]);

  ngOnInit(): void {
    this.loadMesas();
  }

  openCreateMesa() {
    this.isOpenCreateMesa.set(true);
  }

  closeCreateMesa = () => {
    this.isOpenCreateMesa.set(false);
    this.loadMesas();
  };

  loadMesas() {
    this.isLoading.set(true);

    this.httpService
      .get<ResponseApi<ResponseMesa[]>>('mesas', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.mesas.set(response.data);
          this.isLoading.set(false);
        },
        error: () => {
          toast.error('Error al cargar las mesas');
          this.isLoading.set(false);
        },
      });
  }
}
