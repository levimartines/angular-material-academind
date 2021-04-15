import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<ExerciseModel>();
  dataSource$: Subscription;
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TrainingService) {
  }

  ngOnInit(): void {
    this.dataSource$ = this.service.finishedExercisesChanged.subscribe(next => {
      console.log(next);
      this.dataSource.data = next
    });
    this.service.fetchFinishedExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.dataSource$.unsubscribe();
  }
}
