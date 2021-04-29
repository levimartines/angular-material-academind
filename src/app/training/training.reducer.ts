import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions
} from './training.actions';
import { ExerciseModel } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableTrainings: ExerciseModel[];
  finishedTrainings: ExerciseModel[];
  activeTraining: ExerciseModel;
}

const initialState: TrainingState = {
  availableTrainings: [],
  finishedTrainings: [],
  activeTraining: null
};

export interface State extends fromRoot.State {
  training: TrainingState;
}

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions): TrainingState {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {...state, availableTrainings: action.payload};
    case SET_FINISHED_TRAININGS:
      return {...state, finishedTrainings: action.payload};
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableTrainings.find(ex => ex.id === action.payload)}
      };
    case STOP_TRAINING:
      return {...state, activeTraining: null};
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState, (state: TrainingState) => state.availableTrainings);
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedTrainings);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

