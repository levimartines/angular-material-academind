import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { ExerciseModel } from '../exercise.model';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  exercise: ExerciseModel;
  progressValue = 0;
  interval: any;

  constructor(
    private dialog: MatDialog,
    private service: TrainingService
  ) {
  }

  ngOnInit(): void {
    this.exercise = this.service.getCurrentExercise();
    this.startTraining();
  }

  startTraining(): void {
    const stepTime = this.exercise?.duration / 60;
    this.interval = setInterval(() => {
      this.progressValue += 1;
      if (this.progressValue >= 100) {
        clearInterval(this.interval);
        this.service.finishExercise();
      }
    }, stepTime * 1000);
  }

  stopTraining(): void {
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '250px',
      height: '200px',
      data: {progress: this.progressValue}
    });
    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.service.cancelExercise(this.progressValue);
      } else {
        this.startTraining();
      }
    });
  }
}
