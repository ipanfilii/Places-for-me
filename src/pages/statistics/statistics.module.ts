import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Statistics } from './statistics';

@NgModule({
  declarations: [
    Statistics,
  ],
  imports: [
    IonicPageModule.forChild(Statistics),
  ],
  exports: [
    Statistics
  ]
})
export class StatisticsModule {}
