import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading = false;
  isLoading$: Subscription;

  constructor(private service: AuthService, private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.loadingStateChange
    .subscribe(next => this.isLoading = next);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  submit(form: NgForm): void {
    this.service.register({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    this.isLoading$.unsubscribe();
  }

}
