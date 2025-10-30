import { Component, Input } from '@angular/core';
import { Image, LucideAngularModule } from 'lucide-angular';
import { parseTitle } from '../../../utils/parseTitleImage';

@Component({
  selector: 'app-card-image',
  imports: [LucideAngularModule],
  templateUrl: './card-image.html',
})
export class CardImage {
  private imageUrl = 'http://localhost:8080/images';

  @Input({ required: true }) imageTitle = '';
  @Input({ required: true }) uploadImage = '';

  ImageIcon = Image;

  public getImageUrl() {
    return `${this.imageUrl}/${this.imageTitle}`;
  }

  public getTitle() {
    return parseTitle(this.imageTitle);
  }
}
