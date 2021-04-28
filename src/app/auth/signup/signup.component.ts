import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$ = this.store.select(fromRoot.getIsLoading);

  constructor(
    private service: AuthService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  submit(form: NgForm): void {
    this.service.register({
      email: form.value.email,
      password: form.value.password
    });
  }

}
