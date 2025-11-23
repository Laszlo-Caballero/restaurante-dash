import { ENV } from '@/config/env';
import { Injectable, signal } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJs from 'sockjs-client';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  webSocketEnpoint = ENV.websocketUrl;
  stompClient = signal<Client>(
    new Client({
      webSocketFactory: () => new SockJs(this.webSocketEnpoint),
      reconnectDelay: 5000,
      onConnect: () => {
        toast.success('WebSocket connected successfully!');
      },
      onStompError: () => {
        toast.error('WebSocket connection error. Reconnecting...', { duration: 5000 });
      },
    })
  );

  connetct() {
    this.stompClient().activate();
  }

  disconnect() {
    this.stompClient().deactivate();
  }
}
