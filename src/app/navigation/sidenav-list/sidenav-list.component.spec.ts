import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent } from './sidenav-list.component';
import { AppModule } from '../../app.module';
import { AuthService } from '../../auth/auth.service';

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.onLogoutClick()).toBeFalsy();
  });
});
