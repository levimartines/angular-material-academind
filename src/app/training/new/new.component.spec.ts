import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponent } from './new.component';
import { AppModule } from '../../app.module';
import { TrainingService } from '../training.service';

describe('NewComponent', () => {
  let component: NewComponent;
  let service: TrainingService;
  let fixture: ComponentFixture<NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [TrainingService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TrainingService);
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start a new training', () => {
    expect(component.startTraining('crunches')).toBeFalsy();
  });
});
