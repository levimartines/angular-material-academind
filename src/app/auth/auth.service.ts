import { Injectable } from '@angular/core';
import { AuthDataModel } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService) {
  }

  initAuthListener(): void {
    this.auth.authState.subscribe((next) => {
      if (next) {
        this.authChange.next(true);
        this.router.navigate(['/training']).then();
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']).then();
      }
    });
  }

  register(authData: AuthDataModel): void {
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.onSuccessfulLogin();
      })
      .catch(error => {
        console.error(error);
      });
  }

  login(authData: AuthDataModel): void {
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.onSuccessfulLogin();
      })
      .catch(error => {
        console.error(error);
      });
  }

  logout(): void {
    this.auth.signOut();
    this.trainingService.cancelSubscriptions();
    this.authChange.next(false);
    this.router.navigate(['/login']).then();
  }

  onSuccessfulLogin(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']).then();
  }

}
