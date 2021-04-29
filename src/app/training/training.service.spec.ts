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

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

});
