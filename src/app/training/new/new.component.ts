import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExerciseModel } from '../exercise.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {
  trainings: ExerciseModel[];
  training$: Subscription;
  isLoading = false;
  isLoading$: Subscription;

  constructor(private service: TrainingService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.uiService.loadingStateChange
    .subscribe(next => this.isLoading = next);
    this.training$ = this.service.exercisesChanged.subscribe(next => this.trainings = next);
    this.service.fetchAvailableExercises();
  }

  startTraining(trainingId: string): void {
    this.service.startExercise(trainingId);
  }

  ngOnDestroy(): void {
    this.training$.unsubscribe();
    this.isLoading$.unsubscribe();
  }

}
