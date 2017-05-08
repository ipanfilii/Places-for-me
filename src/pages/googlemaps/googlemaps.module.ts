import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Googlemaps } from './googlemaps';

@NgModule({
  declarations: [
    Googlemaps,
  ],
  imports: [
    IonicPageModule.forChild(Googlemaps),
  ],
  exports: [
    Googlemaps
  ]
})
export class GooglemapsModule {}
