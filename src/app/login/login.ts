import { Component, inject } from '@angular/core';
import { InputComponent } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http-service';
import { InputError } from '../../interfaces/input.interface';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  imports: [InputComponent, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  private httpService = inject(HttpService);

  usernameErrors: InputError[] = [
    { type: 'required', message: 'El usuario es obligatorio.' },
    { type: 'minlength', message: 'El usuario debe tener al menos 1 carácter.' },
  ];

  passwordErrors: InputError[] = [
    { type: 'required', message: 'La contraseña es obligatoria.' },
    { type: 'minlength', message: 'La contraseña debe tener al menos 1 carácter.' },
  ];

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.httpService.post('auth/login', { username, password }).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          toast.success('Inicio de sesión exitoso');
        },
        error: (err) => {
          console.error('Login failed', err);
          toast.error('Error en el inicio de sesión');
        },
      });
    }
  }
}
