import { Component } from '@angular/core';
import { InputComponent } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';

@Component({
  selector: 'app-login',
  imports: [InputComponent, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
