import { ResponseUsuarios } from '@/interfaces/user.interface';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Modal } from '@/components/ui/modal/modal';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { LucideAngularModule, Shield, User, X } from 'lucide-angular';
import { cx } from '@/utils/cx';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '@/enum/Role';
import { toast } from 'ngx-sonner';
import { InputComponent } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { Bagde } from '@/components/ui/bagde/bagde';

@Component({
  selector: 'app-update-usuario',
  imports: [Modal, LucideAngularModule, InputComponent, Button, ReactiveFormsModule, Bagde],
  templateUrl: './update-usuario.html',
})
export class UpdateUsuario implements OnInit {
  @Input() onCloseModal!: () => void;
  @Input({ required: true }) user!: ResponseUsuarios;

  authService = inject(AuthService);
  httpService = inject(HttpService);

  XIcon = X;
  ShieldIcon = Shield;
  UserIcon = User;

  cx = cx;

  isLoading = signal(false);

  userForm = new FormGroup({
    nombre: new FormControl(this.user?.nombre, [Validators.required, Validators.minLength(1)]),
    username: new FormControl(this.user?.username, [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl<Role>(this.user?.role as Role, [Validators.required]),
  });

  ngOnInit(): void {
    this.userForm.get('nombre')?.setValue(this.user.nombre);
    this.userForm.get('username')?.setValue(this.user.username);
    this.userForm.get('role')?.setValue(this.user.role as Role);
  }

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
      .put(`usuarios/${this.user.usuarioId}`, newUser, {
        headers: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          toast.success('Usuario actualizado exitosamente.');
          this.onCloseModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          toast.error(err.error.message || 'Error al actualizar el usuario.');
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
