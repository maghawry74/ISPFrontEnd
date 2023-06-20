import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HasPermission {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const newState = state as unknown as {
      data: {
        Permission: string;
      };
    };
    for (let P of this.userService.Permissions) {
      if (P == newState.data.Permission) {
        return true;
      }
    }
    this.router.navigateByUrl('/forbidden');
    return false;
  }
}
