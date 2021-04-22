import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChange = new EventEmitter<boolean>();

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message: string, action?: any, duration = 3000): void {
    this.snackBar.open(message, action, {duration});
  }
}
