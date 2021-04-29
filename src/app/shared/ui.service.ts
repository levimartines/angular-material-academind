import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message: string, action?: any, duration = 3000): void {
    this.snackBar.open(message, action, {duration});
  }
}
