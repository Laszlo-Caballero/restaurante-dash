import { Component, inject } from '@angular/core';
import { AuthService } from '@/services/auth/auth-service';
import { Button } from '@/components/ui/button/button';
import { Title } from '@/components/ui/title/title';
import { Card } from '@/components/ui/card/card';

@Component({
  selector: 'app-home-page',
  imports: [Button, Title, Card],
  templateUrl: './home-page.html',
})
export class HomePage {
  authService = inject(AuthService);
}
