import { Component, inject, OnInit } from '@angular/core';
import { Title } from '../../components/ui/title/title';
import { LucideAngularModule } from 'lucide-angular';
import { Load } from '../../components/ui/load/load';
import { HttpService } from '../../services/http/http-service';
import { ResponseApi, ResponseRecurso } from '../../interfaces/response.interface';
import { AuthService } from '../../services/auth/auth-service';
import { CardImage } from '../../components/ui/card-image/card-image';

@Component({
  selector: 'app-galeria-page',
  imports: [Title, LucideAngularModule, Load, CardImage],
  templateUrl: './galeria-page.html',
})
export class GaleriaPage implements OnInit {
  isLoading = false;
  isError = false;
  httpService = inject(HttpService);
  recursos: ResponseRecurso[] = [];
  authService = inject(AuthService);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.httpService
      .get<ResponseApi<ResponseRecurso[]>>('recursos', {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.recursos = response.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading recursos', err);
          this.isError = true;
          this.isLoading = false;
        },
      });
  }
}
