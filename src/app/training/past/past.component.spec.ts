import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastComponent } from './past.component';
import { AppModule } from '../../app.module';

describe('PastComponent', () => {
  let component: PastComponent;
  let fixture: ComponentFixture<PastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter', () => {
    expect(component.applyFilter({target: {value: 'TEST'}} as unknown as Event)).toBeFalsy();
  });
});
