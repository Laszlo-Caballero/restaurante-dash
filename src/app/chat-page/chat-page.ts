import { ChatMessage } from '@/interfaces/chat.interface';
import { AuthService } from '@/services/auth/auth-service';
import { WebsocketService } from '@/services/websocket/websocket-service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from '@/components/ui/title/title';
import { Details } from '@/components/ui/details/details';
import { cx } from '@/utils/cx';

@Component({
  selector: 'app-chat-page',
  imports: [Title, Details],
  templateUrl: './chat-page.html',
})
export class ChatPage implements OnInit, OnDestroy {
  webSocketService = inject(WebsocketService);
  messages = signal<ChatMessage[]>([]);
  authService = inject(AuthService);

  messageContent = signal<string>('');

  onChangeMessageContent(event: Event) {
    const input = event.target as HTMLInputElement;
    this.messageContent.set(input.value);
  }

  cx = cx;

  ngOnInit(): void {
    this.webSocketService.connect(() => {
      this.webSocketService.subscribe<ChatMessage>('/topic/messages', (message) => {
        this.onMessageReceived(message);
      });
      this.webSocketService.subscribe<ChatMessage[]>('/topic/history', (message) => {
        console.log('Chat history received:', message);
        this.messages.set(message);
      });
      this.webSocketService.sendMessage('/app/history', {});
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  onMessageReceived(message: ChatMessage) {
    this.messages.update((msgs) => [...msgs, message]);
  }

  sendMessage() {
    const message = {
      sender: this.authService.user?.nombre,
      content: this.messageContent(),
    };
    this.webSocketService.sendMessage('/app/chat', message);
    this.messageContent.set('');
  }
}
