import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm: FormGroup;
  errorMessage = '';
  userName = new FormControl('', [Validators.required]);
  Password = new FormControl('', [Validators.required]);
  constructor(private userService: UserService, private router: Router) {
    this.LoginForm = new FormGroup({
      userName: this.userName,
      Password: this.Password,
    });
  }

  LoginSubmitHandler() {
    const loginCredentials = {
      Email: this.userName.value!,
      Password: this.Password.value!,
    };
    this.userService.Login(loginCredentials).subscribe({
      next: (data) => {
        console.log(data);
        this.errorMessage = '';
        var decodedData = encodeURIComponent(JSON.stringify(data));
        document.cookie = `token=${decodedData};expires=${data.expireDate}`;
        this.userService.IsLogged = true;
        this.router.navigateByUrl('/');
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 401) {
          this.errorMessage = 'Wrong Email Or Password';
        } else {
          this.errorMessage = 'An Error Has Occured, Try Again Later.';
        }
      },
    });
  }
}
