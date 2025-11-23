import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-table',
  imports: [],
  templateUrl: './card-table.html',
})
export class CardTable {
  @Input() tableNumber = 0;
  @Input() capacity = 0;
  @Input() status = false;
}
