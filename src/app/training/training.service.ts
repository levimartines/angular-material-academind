import { Injectable } from '@angular/core';
import { ExerciseModel } from './exercise.model';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  dbSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.TrainingState>
  ) {
  }

  fetchAvailableTrainings(): void {
    this.store.dispatch(new UI.StartLoading());
    this.dbSubscriptions.push(
      this.db.collection('availableExercises').snapshotChanges()
      .pipe(
        map(collection => {
          return collection.map(el => {
            const data = el.payload.doc.data() as ExerciseModel;
            return {
              id: el.payload.doc.id,
              ...data
            };
          });
        })
      ).subscribe((next: ExerciseModel[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(next));
      }, () => {
        this.uiService.showSnackBar('Fetching exercises failed. Please try again later.');
        this.store.dispatch(new UI.StopLoading());
      })
    );
  }

  startTraining(exerciseId: string): void {
    this.store.dispatch(new Training.StartTraining(exerciseId));
  }

  cancelTraining(progress: number): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeTraining => {
      this.saveExerciseInDatabase(
        {
          ...activeTraining,
          state: 'cancelled',
          date: new Date(),
          duration: activeTraining.duration * (progress / 100),
          calories: activeTraining.calories * (progress / 100)
        });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  completeTraining(): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeTraining => {
      this.saveExerciseInDatabase({...activeTraining, state: 'completed', date: new Date()});
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchFinishedTrainings(): void {
    this.dbSubscriptions.push(
      this.db.collection('finishedExercises').valueChanges()
      .subscribe((next: ExerciseModel[]) => this.store.dispatch(new Training.SetFinishedTrainings(next))));
  }

  cancelSubscriptions(): void {
    this.dbSubscriptions.forEach(sub => sub?.unsubscribe());
  }

  private saveExerciseInDatabase(exercise: ExerciseModel): void {
    this.db.collection('finishedExercises').add(exercise).then();
  }
}
