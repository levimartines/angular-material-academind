import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  @Output() exitTraining = new EventEmitter<void>();
  progressValue = 0;
  interval: any;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.startTraining();
  }

  startTraining(): void {
    this.interval = setInterval(() => {
      this.progressValue += 5;
      if (this.progressValue >= 100) {
        this.stopTraining();
      }
    }, 1000);
  }

  stopTraining(): void {
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {width: '250px', height: '200px', data: {progress: this.progressValue}});
    dialogRef.afterClosed().subscribe(next => {
      if (next) {
        this.exitTraining.emit();
      } else {
        this.startTraining();
      }
    });
  }
}
