import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from './../training.reducer';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  training$ = this.store.select(fromTraining.getAvailableTrainings);
  isLoading$ = this.store.select(fromRoot.getIsLoading);

  constructor(
    private service: TrainingService,
    private store: Store<fromTraining.State>
  ) {
  }

  ngOnInit(): void {
    this.fetchExercises();
  }

  startTraining(trainingId: string): void {
    this.service.startTraining(trainingId);
  }

  fetchExercises(): void {
    this.service.fetchAvailableTrainings();
  }
}
