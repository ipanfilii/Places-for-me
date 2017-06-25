import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reviews } from './reviews';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    Reviews,
  ],
  imports: [
    IonicPageModule.forChild(Reviews),
    IonicImageViewerModule
  ],
  exports: [
    Reviews
  ]
})
export class ReviewsModule {}
