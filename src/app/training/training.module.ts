import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentComponent } from './current/current.component';
import { NewComponent } from './new/new.component';
import { PastComponent } from './past/past.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentComponent,
    NewComponent,
    PastComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [
    TrainingComponent,
    CurrentComponent
  ]
})
export class TrainingModule {
}
