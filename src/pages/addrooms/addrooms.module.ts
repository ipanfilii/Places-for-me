import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Addrooms } from './addrooms';

@NgModule({
  declarations: [
    Addrooms,
  ],
  imports: [
    IonicPageModule.forChild(Addrooms),
  ],
  exports: [
    Addrooms
  ]
})
export class AddroomsModule {}
