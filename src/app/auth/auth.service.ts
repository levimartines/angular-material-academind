import { Injectable } from '@angular/core';
import { AuthDataModel } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ui: fromRoot.State}>
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
    this.store.dispatch(new UI.StartLoading());
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.onSuccessfulLogin();
      })
      .catch(error => {
        this.uiService.showSnackBar(error.message);
      })
      .finally(() => this.store.dispatch(new UI.StopLoading()));
  }

  login(authData: AuthDataModel): void {
    this.store.dispatch(new UI.StartLoading());
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this.onSuccessfulLogin();
      })
      .catch(error => {
        this.uiService.showSnackBar(error.message);
      })
      .finally(() => this.store.dispatch(new UI.StopLoading()));
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

  isAuth(): boolean {
    let isAuth = false;
    this.authChange.pipe(take(1)).subscribe(next => isAuth = next);
    return isAuth;
  }

}
