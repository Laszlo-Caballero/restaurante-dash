import { ENV } from '@/config/env';
import { ComidaResponse } from '@/interfaces/response.interface';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Minus, Plus } from 'lucide-angular';

@Component({
  selector: 'app-menu-counter',
  imports: [LucideAngularModule],
  templateUrl: './menu-counter.html',
})
export class MenuCounter {
  @Input({ required: true }) count!: number;
  @Input({ required: true }) comida!: ComidaResponse;
  @Input({ required: true }) onIncrease!: (comidaId: number) => void;
  @Input({ required: true }) onDecrease!: (comidaId: number) => void;

  MinusIcon = Minus;
  PlusIcon = Plus;

  private imageSrc = ENV.imagesUrl;

  getImageUrl() {
    return `${this.imageSrc}/${this.comida.recurso.nombre}`;
  }
}
