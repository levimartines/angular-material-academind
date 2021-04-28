import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth$ = this.store.select(fromRoot.getIsAuthenticated);

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
  }
}
