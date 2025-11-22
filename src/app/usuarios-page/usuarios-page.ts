import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { ResponseUsuarios } from '@/interfaces/user.interface';
import { ResponseApi } from '@/interfaces/response.interface';
import { toast } from 'ngx-sonner';
import { Load } from '@/components/ui/load/load';
import { Title } from '@/components/ui/title/title';

@Component({
  selector: 'app-usuarios-page',
  imports: [Load, Title],
  templateUrl: './usuarios-page.html',
})
export class UsuariosPage implements OnInit {
  httpService = inject(HttpService);
  authService = inject(AuthService);

  users = signal<ResponseUsuarios[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.loadUsers();
  }

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
