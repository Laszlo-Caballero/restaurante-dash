import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { Pen, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-card-category',
  imports: [Button, LucideAngularModule],
  templateUrl: './card-category.html',
})
export class CardCategory {
  private imageUrl = 'http://localhost:8080/images';
  @Input({ required: true }) categoryName!: string;
  @Input({ required: true }) categoryImageUrl!: string;
  @Input({ required: true }) categoryDescription!: string;
  @Input() itemCount: number = 0;

  EditIcon = Pen;

  public getImageUrl() {
    return `${this.imageUrl}/${this.categoryImageUrl}`;
  }
}
