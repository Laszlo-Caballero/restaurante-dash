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
      onStompError: () => {
        toast.error('WebSocket connection error. Reconnecting...', { duration: 5000 });
      },
    })
  );

  connect(onConnectCallback?: () => void) {
    this.stompClient().onConnect = () => {
      toast.success('WebSocket connected successfully!', { duration: 3000 });
      onConnectCallback?.();
    };
    this.stompClient().activate();
  }

  disconnect() {
    this.stompClient().deactivate();
  }

  subscribe<T>(destination: string, callback: (message: T) => void) {
    if (!this.stompClient().connected) {
      console.error('WebSocket is not connected. Cannot subscribe to destination:', destination);
      return;
    }
    this.stompClient().subscribe(destination, (message) => {
      const body: T = JSON.parse(message.body);
      callback(body);
    });
  }

  sendMessage<T>(destination: string, body: T) {
    this.stompClient().publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}
