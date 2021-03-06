import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

const modules = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {
}
