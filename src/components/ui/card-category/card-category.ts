import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { Pen, LucideAngularModule, Trash } from 'lucide-angular';
import { ENV } from '@/config/env';
import { Bagde } from '../bagde/bagde';

@Component({
  selector: 'app-card-category',
  imports: [Button, LucideAngularModule, Bagde],
  templateUrl: './card-category.html',
})
export class CardCategory {
  private imageUrl = ENV.imagesUrl;
  @Input({ required: true }) categoryName!: string;
  @Input({ required: true }) categoryImageUrl!: string;
  @Input({ required: true }) categoryDescription!: string;
  @Input({ required: true }) categoryId!: number;
  @Input({ required: true }) categoryStatus!: boolean;
  @Input() itemCount: number = 0;
  @Input() openEditModal!: (categoryId: number) => void;
  @Input() openDeleteModal!: (categoryId: number) => void;

  isOpenEdit = false;

  EditIcon = Pen;
  TrashIcon = Trash;

  public getImageUrl() {
    return `${this.imageUrl}/${this.categoryImageUrl}`;
  }
}
