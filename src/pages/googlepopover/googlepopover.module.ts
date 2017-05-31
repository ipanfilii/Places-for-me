import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Googlepopover } from './googlepopover';

@NgModule({
  declarations: [
    Googlepopover,
  ],
  imports: [
    IonicPageModule.forChild(Googlepopover),
  ],
  exports: [
    Googlepopover
  ]
})
export class GooglepopoverModule {}
