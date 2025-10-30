export class ElementRef<T> {
  nativeElement: T;

  constructor(nativeElement: T) {
    this.nativeElement = nativeElement;
  }
}
