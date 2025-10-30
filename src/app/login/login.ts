import { Component, inject } from '@angular/core';
import { InputComponent } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputError } from '../../interfaces/input.interface';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  private authService = inject(AuthService);

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
      const data = this.loginForm.value;
      this.authService.login({
        username: data.username || '',
        password: data.password || '',
      });
    }
  }
}
