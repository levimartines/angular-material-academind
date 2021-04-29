import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ExerciseModel>();
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TrainingService,
    private store: Store<fromTraining.State>
  ) {
  }

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedTrainings).subscribe(next => this.dataSource.data = next);
    this.service.fetchFinishedTrainings();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
