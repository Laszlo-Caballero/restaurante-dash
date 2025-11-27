import { InputError } from '@/interfaces/input.interface';
import { ResponseMesa } from '@/interfaces/response.interface';
import { AuthService } from '@/services/auth/auth-service';
import { HttpService } from '@/services/http/http-service';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { InputComponent } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';

@Component({
  selector: 'app-update-mesa',
  imports: [InputComponent, Button, ReactiveFormsModule],
  templateUrl: './update-mesa.html',
})
export class UpdateMesa implements OnInit {
  @Input({ required: true }) onClose!: () => void;
  @Input({ required: true }) mesa!: ResponseMesa;

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

  ngOnInit(): void {
    this.mesaForm.setValue({
      numeroMesa: this.mesa.numeroMesa,
      capacidad: this.mesa.capacidad,
    });
  }

  submitForm() {
    if (this.mesaForm.invalid) {
      toast.error('Por favor, completa el formulario correctamente.');
      return;
    }

    this.isLoading.set(true);

    this.httpService
      .put(
        `mesas/${this.mesa.mesaId}`,
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
          toast.success('Mesa actualizada correctamente.');
          this.isLoading.set(false);
          this.onClose();
        },
        error: () => {
          toast.error('Error al actualizar la mesa.');
          this.isLoading.set(false);
        },
      });
  }
}
