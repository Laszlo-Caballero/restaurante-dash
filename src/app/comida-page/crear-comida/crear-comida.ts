import { Component, inject } from '@angular/core';
import { Title } from '../../../components/ui/title/title';
import { Button } from '../../../components/ui/button/button';
import { Router } from '@angular/router';
import { InputComponent } from '../../../components/ui/input/input';
import { TextArea } from '../../../components/ui/text-area/text-area';
import { Checkbox } from '../../../components/ui/checkbox/checkbox';

@Component({
  selector: 'app-crear-comida',
  imports: [Title, Button, InputComponent, TextArea, Checkbox],
  templateUrl: './crear-comida.html',
})
export class CrearComida {
  private router = inject(Router);

  backTo() {
    this.router.navigate(['/comidas']);
  }
}
