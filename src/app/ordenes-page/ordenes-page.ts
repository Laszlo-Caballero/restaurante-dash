import { WebsocketService } from '@/services/websocket/websocket-service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes-page',
  imports: [],
  templateUrl: './ordenes-page.html',
})
export class OrdenesPage implements OnInit {
  websocketService = inject(WebsocketService);

  ngOnInit() {
    this.websocketService.connect();
  }
}
