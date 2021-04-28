import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExerciseModel } from '../exercise.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {
  trainings: ExerciseModel[];
  training$: Subscription;
  isLoading$ = this.store.select(fromRoot.getIsLoading);

  constructor(
    private service: TrainingService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit(): void {
    this.training$ = this.service.exercisesChanged.subscribe(next => this.trainings = next);
    this.fetchExercises();
  }

  startTraining(trainingId: string): void {
    this.service.startExercise(trainingId);
  }

  fetchExercises(): void {
    this.service.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.training$?.unsubscribe();
  }
}
