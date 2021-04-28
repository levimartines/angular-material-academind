import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppModule } from '../app.module';
import { TrainingService } from './training.service';

describe('AuthService', () => {
  let service: TrainingService;
  let httpTestingController: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule,
      ],
      providers: [TrainingService]
    });
    service = TestBed.inject(TrainingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should start exercise and cancel a exercise', () => {
    service.startExercise('crunches');
    service.cancelExercise(50);
    expect(service.getCurrentExercise()).toEqual(null);
  });
  it('should start exercise and finish a exercise', () => {
    service.startExercise('crunches');
    service.finishExercise();
    expect(service.getCurrentExercise()).toEqual(null);
  });

});
