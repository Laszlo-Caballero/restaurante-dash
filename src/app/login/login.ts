import { Component } from '@angular/core';
import { InputComponent } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [InputComponent, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
