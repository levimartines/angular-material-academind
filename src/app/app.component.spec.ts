import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let fixture;
let component;
let el;

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;

      el = fixture.debugElement;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
