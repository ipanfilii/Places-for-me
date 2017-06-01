import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationList } from './reservation-list';

@NgModule({
  declarations: [
    ReservationList,
  ],
  imports: [
    IonicPageModule.forChild(ReservationList),
  ],
  exports: [
    ReservationList
  ]
})
export class ReservationListModule {}
