import { Injectable } from '@angular/core';
import { ExerciseModel } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseStartStop = new Subject<boolean>();
  private currentTraining: ExerciseModel;
  private availableExercises: ExerciseModel[] = [
    {id: 'crunches', name: 'Crunches', duration: 10, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 60, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 90, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 120, calories: 8}
  ];
  doneExercises: ExerciseModel[] = [];

  getAvailableExercises(): ExerciseModel[] {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string): void {
    this.currentTraining = this.getAvailableExercises().find(el => el.id === exerciseId);
    this.exerciseStartStop.next(true);
  }

  cancelExercise(progress: number): void {
    this.doneExercises.push(
      {...this.currentTraining,
        state: 'cancelled',
        date: new Date(),
        duration: this.currentTraining.duration * (progress / 100),
        calories: this.currentTraining.calories * (progress / 100)
      });
    this.currentTraining = null;
    this.exerciseStartStop.next(false);
  }

  finishExercise(): void {
    this.doneExercises.push({...this.currentTraining, state: 'completed', date: new Date()});
    this.currentTraining = null;
    this.exerciseStartStop.next(false);
  }

  getCurrentExercise(): ExerciseModel {
    return this.currentTraining;
  }
}
