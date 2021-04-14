import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { LoginComponent } from './login/login.component';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent
          }
        ])
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should logout', () => {
    expect(service.logout()).toBeFalsy();
  });

  it('should get authenticated user', () => {
    service.user = {id: '1', email: 'test@test.com'}
    expect(service.getUser()).toBeTruthy();
  });
});
