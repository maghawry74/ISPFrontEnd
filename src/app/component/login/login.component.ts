import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm: FormGroup;

  constructor() {
    this.LoginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      RememberMe: new FormControl(''),
    });
  }

  LoginSubmitHandler() {
    const Email = this.LoginForm.controls.userName.value;
    const Password = this.LoginForm.controls.Password.value;
    const RememberMe = this.LoginForm.controls.RememberMe.value;

    console.log(Email, Password, RememberMe);
  }
}
