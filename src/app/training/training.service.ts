import { EventEmitter, Injectable } from '@angular/core';
import { ExerciseModel } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseStartStop = new Subject<boolean>();
  currentTraining: ExerciseModel;
  exercises: ExerciseModel[];
  exercisesChanged = new EventEmitter<ExerciseModel[]>();
  finishedExercisesChanged = new EventEmitter<ExerciseModel[]>();

  dbSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) {
  }

  fetchAvailableExercises(): void {
    this.uiService.loadingStateChange.emit(true);
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
        this.exercises = next;
        this.exercisesChanged.emit([...next]);
        this.uiService.loadingStateChange.emit(false);
      }, err => {
        this.uiService.showSnackBar('Fetching exercises failed. Please try again later.');
        this.exercisesChanged.emit(null);
        this.uiService.loadingStateChange.emit(false);
      })
    );
  }

  startExercise(exerciseId: string): void {
    this.db.doc(`availableExercises/${exerciseId}`).update({lastSelected: new Date()}).then();
    this.currentTraining = this.exercises.find(el => el.id === exerciseId);
    this.exerciseStartStop.next(true);
  }

  cancelExercise(progress: number): void {
    this.saveExerciseInDatabase(
      {
        ...this.currentTraining,
        state: 'cancelled',
        date: new Date(),
        duration: this.currentTraining.duration * (progress / 100),
        calories: this.currentTraining.calories * (progress / 100)
      });
    this.currentTraining = null;
    this.exerciseStartStop.next(false);
  }

  finishExercise(): void {
    this.saveExerciseInDatabase({...this.currentTraining, state: 'completed', date: new Date()});
    this.currentTraining = null;
    this.exerciseStartStop.next(false);
  }

  getCurrentExercise(): ExerciseModel {
    return this.currentTraining;
  }

  fetchFinishedExercises(): void {
    this.dbSubscriptions.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((next: ExerciseModel[]) => this.finishedExercisesChanged.emit(next)));
  }

  cancelSubscriptions(): void {
    this.dbSubscriptions.forEach(sub => sub?.unsubscribe());
  }

  private saveExerciseInDatabase(exercise: ExerciseModel): void {
    this.db.collection('finishedExercises').add(exercise).then();
  }
}
