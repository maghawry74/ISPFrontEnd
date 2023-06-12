import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm: FormGroup;
  userName = new FormControl('', [Validators.required]);
  Password = new FormControl('', [Validators.required]);
  RememberMe = new FormControl('');
  constructor() {
    this.LoginForm = new FormGroup({
      userName: this.userName,
      Password: this.Password,
      RememberMe: this.RememberMe,
    });
  }

  LoginSubmitHandler() {
    const Email = this.userName.value;
    const Password = this.Password.value;
    const RememberMe = this.RememberMe.value;

    console.log(Email, Password, RememberMe);
  }
}
