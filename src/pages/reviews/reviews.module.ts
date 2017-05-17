import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reviews } from './reviews';

@NgModule({
  declarations: [
    Reviews,
  ],
  imports: [
    IonicPageModule.forChild(Reviews),
  ],
  exports: [
    Reviews
  ]
})
export class ReviewsModule {}
