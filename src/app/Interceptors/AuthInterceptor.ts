import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${this.userService.GetToken()}` },
    });
    return next.handle(clonedReq);
  }
}
