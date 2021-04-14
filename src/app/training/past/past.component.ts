import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseModel } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<ExerciseModel>;
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TrainingService) {
  }

  ngOnInit(): void {
    const exercises = this.service.getCompletedOrCancelledExercises();
    this.dataSource = new MatTableDataSource(exercises);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
