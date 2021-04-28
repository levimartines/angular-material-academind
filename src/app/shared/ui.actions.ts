import { Action } from '@ngrx/store';

export const START_LOADING = 'UI_START_LOADING';
export const STOP_LOADING = 'UI_STOP_LOADING';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type UiActions = StartLoading | StopLoading;
