import { Injectable } from '@angular/core';
import { AuthDataModel } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../shared/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {
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
    this.loadingService.loadingStateChange.emit(true);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.onSuccessfulLogin();
      })
      .catch(error => {
        this.snackBar.open(error.message, null, {duration: 3000});
      })
    .finally(() => this.loadingService.loadingStateChange.emit(false));
  }

  login(authData: AuthDataModel): void {
    this.loadingService.loadingStateChange.emit(true);
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.onSuccessfulLogin();
      })
      .catch(error => {
        this.snackBar.open(error.message, null, {duration: 3000});
      })
    .finally(() => this.loadingService.loadingStateChange.emit(false));
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
