import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Facultati } from './facultati';

@NgModule({
  declarations: [
    Facultati,
  ],
  imports: [
    IonicPageModule.forChild(Facultati),
  ],
  exports: [
    Facultati
  ]
})
export class FacultatiModule {}
