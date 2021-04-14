import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingComponent } from './training.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppModule } from '../app.module';
import { TrainingService } from './training.service';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let service: TrainingService;
  let fixture: ComponentFixture<TrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [TrainingService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TrainingService);
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    service.exerciseStartStop.next();
  });
});
