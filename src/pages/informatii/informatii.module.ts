import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Informatii } from './informatii';

@NgModule({
  declarations: [
    Informatii,
  ],
  imports: [
    IonicPageModule.forChild(Informatii),
  ],
  exports: [
    Informatii
  ]
})
export class InformatiiModule {}
