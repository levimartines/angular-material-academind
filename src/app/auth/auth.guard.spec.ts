import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthService;
  let guard: any;
  let httpTestingController: any;

  const createMockRoute = (id: string) => {
    return {
      params: {id: id}
    } as any;
  };

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
        AuthService,
        AuthGuard
      ]
    });
    service = TestBed.inject(AuthService);
    guard = TestBed.inject(AuthGuard);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should not be able to activate invalid route', () => {
    spyOn(service, 'isAuth').and.returnValue(false);
    const route = createMockRoute(null);
    const state = null;
    const res$ = guard.canActivate(route, state);
    expect(res$).toBeFalsy();
  });
});
