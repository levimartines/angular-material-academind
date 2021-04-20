import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingStateChange = new EventEmitter<boolean>();

  constructor() { }
}
