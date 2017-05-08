import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tableorar } from './tableorar';

@NgModule({
  declarations: [
    Tableorar,
  ],
  imports: [
    IonicPageModule.forChild(Tableorar),
  ],
  exports: [
    Tableorar
  ]
})
export class TableorarModule {}
