import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  isLoading$: Subscription;

  constructor(private service: AuthService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.uiService.loadingStateChange
      .subscribe(next => this.isLoading = next);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    this.service.login({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }

  ngOnDestroy(): void {
    this.isLoading$?.unsubscribe();
  }
}
