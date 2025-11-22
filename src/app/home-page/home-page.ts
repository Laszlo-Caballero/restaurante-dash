import { Component, inject } from '@angular/core';
import { AuthService } from '@/services/auth/auth-service';
import { Button } from '@/components/ui/button/button';

@Component({
  selector: 'app-home-page',
  imports: [Button],
  templateUrl: './home-page.html',
})
export class HomePage {
  authService = inject(AuthService);
}
