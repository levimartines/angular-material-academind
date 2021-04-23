import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  training$: Subscription;

  constructor(private service: TrainingService) {
  }

  ngOnInit(): void {
    this.training$ = this.service.exerciseStartStop.subscribe(next => this.ongoingTraining = next);
  }

  ngOnDestroy(): void {
    this.training$?.unsubscribe();
  }

}
