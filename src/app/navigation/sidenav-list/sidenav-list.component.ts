import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() itemClicked = new EventEmitter<void>();
  isAuth$ = this.store.select(fromRoot.getIsAuthenticated);

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
  }

  onLogoutClick(): void {
    this.itemClicked.emit();
    this.authService.logout();
  }
}
