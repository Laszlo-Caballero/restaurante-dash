import { Component, inject, Input, signal } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { LucideAngularModule, Shield, User, X } from 'lucide-angular';
import { InputComponent } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '@/enum/Role';
import { toast } from 'ngx-sonner';
import { cx } from '@/utils/cx';
import { Bagde } from '@/components/ui/bagde/bagde';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';

@Component({
  selector: 'app-create-usuario',
  imports: [Modal, LucideAngularModule, InputComponent, Button, ReactiveFormsModule, Bagde],
  templateUrl: './create-usuario.html',
})
export class CreateUsuario {
  @Input({ required: true }) onCloseModal!: () => void;

  authService = inject(AuthService);
  httpService = inject(HttpService);

  XIcon = X;
  ShieldIcon = Shield;
  UserIcon = User;

  cx = cx;

  isLoading = signal(false);

  userForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl<Role>(Role.USER, [Validators.required]),
  });

  onSubmitUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      toast.error('Por favor, complete todos los campos correctamente.');
      return;
    }
    this.isLoading.set(true);

    const newUser = {
      nombre: this.userForm.get('nombre')?.value!,
      username: this.userForm.get('username')?.value!,
      password: this.userForm.get('password')?.value!,
      role: this.getRole(),
    };

    this.httpService
      .post('auth/register', newUser, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          toast.success('Usuario creado exitosamente.');
          this.onCloseModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          toast.error(err.error.message || 'Error al crear el usuario.');
        },
      });
  }

  setRole(role: keyof typeof Role) {
    this.userForm.get('role')?.setValue(Role[role]);
  }
  getRole(): Role {
    return this.userForm.get('role')?.value!;
  }
}
