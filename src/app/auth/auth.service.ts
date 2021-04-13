import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { AuthDataModel } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  user: UserModel;

  constructor(private router: Router) {
  }

  register(authData: AuthDataModel): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 1000).toString(10)
    };
    this.onSuccessfulLogin();
  }

  login(authData: AuthDataModel): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 1000).toString(10)
    };
    this.onSuccessfulLogin();
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']).then();
  }

  isAuth(): boolean {
    return !!this.user;
  }

  getUser(): UserModel {
    return {...this.user};
  }

  onSuccessfulLogin(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']).then();
  }

}
