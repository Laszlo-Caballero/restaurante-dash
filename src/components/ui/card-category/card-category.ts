import { Component, inject, Input } from '@angular/core';
import { Button } from '../button/button';
import { Pen, LucideAngularModule, Trash } from 'lucide-angular';
import { ENV } from '@/config/env';
import { Bagde } from '../bagde/bagde';
import { AuthService } from '@/services/auth/auth-service';
import { Tooltip } from '../tooltip/tooltip';
import { PositionTooltip } from '../tooltip/enum';

@Component({
  selector: 'app-card-category',
  imports: [Button, LucideAngularModule, Bagde, Tooltip],
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

  authService = inject(AuthService);
  PositionTooltip = PositionTooltip;

  isOpenEdit = false;

  EditIcon = Pen;
  TrashIcon = Trash;

  public getImageUrl() {
    return `${this.imageUrl}/${this.categoryImageUrl}`;
  }
}
