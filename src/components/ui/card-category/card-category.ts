import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { Pen, LucideAngularModule } from 'lucide-angular';
import { ENV } from '../../../config/env';

@Component({
  selector: 'app-card-category',
  imports: [Button, LucideAngularModule],
  templateUrl: './card-category.html',
})
export class CardCategory {
  private imageUrl = ENV.imagesUrl;
  @Input({ required: true }) categoryName!: string;
  @Input({ required: true }) categoryImageUrl!: string;
  @Input({ required: true }) categoryDescription!: string;
  @Input({ required: true }) categoryId!: number;
  @Input() itemCount: number = 0;
  @Input() openEditModal!: (categoryId: number) => void;

  isOpenEdit = false;

  EditIcon = Pen;

  public getImageUrl() {
    return `${this.imageUrl}/${this.categoryImageUrl}`;
  }
}
