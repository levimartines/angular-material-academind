import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { CurrentComponent } from './current/current.component';
import { NewComponent } from './new/new.component';
import { PastComponent } from './past/past.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentComponent,
    NewComponent,
    PastComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    TrainingComponent,
    CurrentComponent
  ]
})
export class TrainingModule {
}
