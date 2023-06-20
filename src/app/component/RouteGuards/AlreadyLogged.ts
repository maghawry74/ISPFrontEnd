import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AlreadyLogged {
  constructor(private router: Router, private userService: UserService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.IsLogged) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
