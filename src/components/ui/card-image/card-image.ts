import { Component, EventEmitter, Input } from '@angular/core';
import { Image, LucideAngularModule } from 'lucide-angular';
import { parseTitle } from '@/utils/parseTitleImage';
import { cx } from '@/utils/cx';
import { ENV } from '@/config/env';

@Component({
  selector: 'app-card-image',
  imports: [LucideAngularModule],
  templateUrl: './card-image.html',
})
export class CardImage {
  private imageUrl = ENV.imagesUrl;

  @Input({ required: true }) imageTitle = '';
  @Input({ required: true }) uploadImage = '';
  @Input({ required: false }) click = new EventEmitter<Event>();
  @Input({ required: false }) className?: string;

  cx = cx;

  ImageIcon = Image;

  public getImageUrl() {
    return `${this.imageUrl}/${this.imageTitle}`;
  }

  public getTitle() {
    return parseTitle(this.imageTitle);
  }
}
