import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title fxLayoutAlign="center">Are you sure ?</h1>
    <mat-dialog-content fxLayoutAlign="center">
      <p>You already got {{data.progress}}%</p>
    </mat-dialog-content>
    <mat-dialog-actions fxLayoutAlign="center">
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>`
})
export class StopTrainingComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { progress: number }) {
  }
}
