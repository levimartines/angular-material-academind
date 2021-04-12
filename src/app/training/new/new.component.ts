import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface ITypes {
  name: string;
  value: string;
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();
  types: ITypes[] = [
    {name: 'Crunches', value: 'crunches'},
    {name: 'Touch Toes', value: 'touch_toes'},
    {name: 'Side Lunges', value: 'side_lunges'},
    {name: 'Burpees', value: 'burpees'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
