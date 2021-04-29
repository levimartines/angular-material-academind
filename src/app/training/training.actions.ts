import { Action } from '@ngrx/store';
import { ExerciseModel } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = 'SET_AVAILABLE_TRAININGS';
export const SET_FINISHED_TRAININGS = 'SET_FINISHED_TRAININGS';

export const START_TRAINING = 'TRAINING_START';
export const STOP_TRAINING = 'TRAINING_STOP';

export class SetAvailableTrainings {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: ExerciseModel[]) {
  }
}

export class SetFinishedTrainings {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: ExerciseModel[]) {
  }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {
  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
