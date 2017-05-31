import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Reservations } from './reservations';

@NgModule({
  declarations: [
    Reservations,
  ],
  imports: [
    IonicPageModule.forChild(Reservations),
  ],
  exports: [
    Reservations
  ]
})
export class ReservationsModule {}
