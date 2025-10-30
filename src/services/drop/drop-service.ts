import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropService {
  public isOver = false;
  private onDrop: (files: File[]) => void = () => {};

  setOnDropCallback(callback: (files: File[]) => void) {
    this.onDrop = callback;
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files;
    if (file && file.length > 0) {
      this.onDrop(Array.from(file));
      this.isOver = false;
    }
  }

  handleDragOver(e: DragEvent) {
    e.preventDefault();
    this.isOver = true;
  }

  handleDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isOver = false;
  }

  onChangeInputFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.onDrop(Array.from(input.files));
    }
  }
}
