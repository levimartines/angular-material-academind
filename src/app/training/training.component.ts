import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

  constructor(private store: Store<fromTraining.TrainingState>) {
  }

}
