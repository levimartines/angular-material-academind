import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExerciseModel } from '../exercise.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  trainings: ExerciseModel[];

  constructor(private service: TrainingService) {
  }

  ngOnInit(): void {
    this.trainings = this.service.getAvailableExercises();
  }

  startTraining(trainingId: string): void {
    this.service.startExercise(trainingId);
  }

}
