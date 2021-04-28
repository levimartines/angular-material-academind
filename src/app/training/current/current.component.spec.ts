import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentComponent } from './current.component';
import { AppModule } from '../../app.module';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

describe('CurrentComponent', () => {
  let component: CurrentComponent;
  let fixture: ComponentFixture<CurrentComponent>;
  let service: any;
  let responseControl = true;

  const mockDialog = {
    open: () => {
      return {
        afterClosed: () => {
          return new BehaviorSubject(responseControl);
        }
      };
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: MatDialog, useValue: mockDialog},
        TrainingService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TrainingService);
    spyOn(service, 'getCurrentExercise')
    .and.returnValue({id: 'burpees', name: 'Burpees', duration: 1, calories: 8});
    responseControl = !responseControl;
    fixture = TestBed.createComponent(CurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should stop the training', () => {
    expect(component.stopTraining()).toBeFalsy();
  });

  it('should stop the training else condition', () => {
    expect(component.stopTraining()).toBeFalsy();
  });

  it('should create a StopTrainingComponent', () => {
    expect(new StopTrainingComponent({progress: 20})).toBeTruthy();
  });
});
