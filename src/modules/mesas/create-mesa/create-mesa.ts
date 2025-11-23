import { Component, inject, Input, signal } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { Modal } from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';
import { InputComponent } from '@/components/ui/input/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputError } from '@/interfaces/input.interface';
import { toast } from 'ngx-sonner';
import { HttpService } from '@/services/http/http-service';
import { AuthService } from '@/services/auth/auth-service';
import { Load } from '@/components/ui/load/load';

@Component({
  selector: 'app-create-mesa',
  imports: [LucideAngularModule, Modal, Button, InputComponent, ReactiveFormsModule, Load],
  templateUrl: './create-mesa.html',
})
export class CreateMesa {
  @Input({ required: true }) onClose!: () => void;

  httpService = inject(HttpService);
  authService = inject(AuthService);

  isLoading = signal(false);

  mesaForm = new FormGroup({
    numeroMesa: new FormControl(0, [Validators.required, Validators.min(1)]),
    capacidad: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  numeroMesaErrors: InputError[] = [
    {
      type: 'required',
      message: 'El número de mesa es obligatorio.',
    },
    {
      type: 'min',
      message: 'El número de mesa debe ser al menos 1.',
    },
  ];
  capacidadErrors: InputError[] = [
    {
      type: 'required',
      message: 'La capacidad de la mesa es obligatoria.',
    },
    {
      type: 'min',
      message: 'La capacidad de la mesa debe ser al menos 1.',
    },
  ];

  XIcon = X;

  submitForm() {
    if (this.mesaForm.invalid) {
      toast.error('Por favor, completa el formulario correctamente.');
      return;
    }

    this.isLoading.set(true);

    this.httpService
      .post(
        'mesas',
        {
          numeroMesa: this.mesaForm.value.numeroMesa,
          capacidad: this.mesaForm.value.capacidad,
        },
        {
          headers: {
            Authorization: `Bearer ${this.authService.token}`,
          },
        }
      )
      .subscribe({
        next: () => {
          toast.success('Mesa creada correctamente.');
          this.isLoading.set(false);
          this.onClose();
        },
        error: () => {
          toast.error('Error al crear la mesa.');
          this.isLoading.set(false);
        },
      });
  }
}
