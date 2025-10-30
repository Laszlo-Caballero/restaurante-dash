import { inject, Injectable } from '@angular/core';
import { User, UserInput } from '../../interfaces/auth.interface';
import { HttpService } from '../http/http-service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ResponseApi } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;
  public token = '';
  private readonly storageKey = 'auth_user';
  private httpService = inject(HttpService);
  private router = inject(Router);

  constructor() {
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser) {
      const parseUser: User = JSON.parse(storedUser);
      this.user = parseUser;
      this.token = parseUser.token;
    }
  }

  isAuthenticated() {
    return this.user !== null;
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/auth/login']);
  }

  login(user: UserInput) {
    this.httpService.post<ResponseApi<User>, UserInput>('auth/login', user).subscribe({
      next: (res) => {
        this.user = res.data;
        localStorage.setItem(this.storageKey, JSON.stringify(res.data));
        this.token = res.data.token;
        this.router.navigate(['/']);
        toast.success('Inicio de sesión exitoso');
      },
      error: (err) => {
        console.error('Login failed', err);
        toast.error('Error en el inicio de sesión');
      },
    });
  }
}
