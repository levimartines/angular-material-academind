import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { AppModule } from './app.module';

let fixture;
let component;
let el;

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      el = fixture.debugElement;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-material-academind'`, () => {
    expect(component.title).toEqual('angular-material-academind');
  });

});
