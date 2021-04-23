import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() itemClicked = new EventEmitter<void>();
  isAuth$: Subscription = new Subscription();
  isAuth = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuth$ = this.authService.authChange.subscribe(next => this.isAuth = next);
  }

  ngOnDestroy(): void {
    this.isAuth$?.unsubscribe();
  }

  onLogoutClick(): void {
    this.itemClicked.emit();
    this.authService.logout();
  }
}
