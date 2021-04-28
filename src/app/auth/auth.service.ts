import { Injectable } from '@angular/core';
import { AuthDataModel } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

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
    private store: Store<fromRoot.State>
  ) {
  }

  initAuthListener(): void {
    this.auth.authState.subscribe((next) => {
      if (next) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']).then();
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']).then();
      }
    });
  }

  register(authData: AuthDataModel): void {
    this.store.dispatch(new UI.StartLoading());
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.router.navigate(['/training']).then();
    })
    .catch(error => {
      this.uiService.showSnackBar(error.message);
    })
    .finally(() => this.store.dispatch(new UI.StopLoading()));
  }

  login(authData: AuthDataModel): void {
    this.store.dispatch(new UI.StartLoading());
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.router.navigate(['/training']).then();
    })
    .catch(error => {
      this.uiService.showSnackBar(error.message);
    })
    .finally(() => this.store.dispatch(new UI.StopLoading()));
  }

  logout(): void {
    this.auth.signOut().then();
    this.trainingService.cancelSubscriptions();
    this.router.navigate(['/login']).then();
  }

}
