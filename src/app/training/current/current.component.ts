import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  progressValue = 0;
  interval: any;

  constructor(
    private dialog: MatDialog,
    private service: TrainingService,
    private store: Store<fromTraining.State>
  ) {
  }

  ngOnInit(): void {
    this.startTraining();
  }

  startTraining(): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      const stepTime = exercise.duration / 60;
      this.interval = setInterval(() => {
        this.progressValue += 1;
        if (this.progressValue >= 100) {
          clearInterval(this.interval);
          this.service.completeTraining();
        }
      }, stepTime * 1000);
    });
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
        this.service.cancelTraining(this.progressValue);
      } else {
        this.startTraining();
      }
    });
  }
}
