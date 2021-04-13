import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth$: Subscription;
  isAuth = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuth$ = this.authService.authChange.subscribe(next => this.isAuth = next);
  }

  ngOnDestroy(): void {
    this.isAuth$.unsubscribe();
  }
}
