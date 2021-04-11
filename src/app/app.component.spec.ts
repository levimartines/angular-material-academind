import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

let fixture;
let component;
let el;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      el = fixture.debugElement;
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-material-academind'`, () => {
    expect(component.title).toEqual('angular-material-academind');
  });

  it('should render title', () => {
    fixture.detectChanges();

    const title = el.query(By.css('.content span')).nativeElement;
    expect(title.textContent).toContain('angular-material-academind app is running!');
  });
});
