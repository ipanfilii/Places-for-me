import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Googleregister } from './googleregister';

@NgModule({
  declarations: [
    Googleregister,
  ],
  imports: [
    IonicPageModule.forChild(Googleregister),
  ],
  exports: [
    Googleregister
  ]
})
export class GoogleregisterModule {}
