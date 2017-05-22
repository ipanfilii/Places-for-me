import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomsManagement } from './rooms-management';

@NgModule({
  declarations: [
    RoomsManagement,
  ],
  imports: [
    IonicPageModule.forChild(RoomsManagement),
  ],
  exports: [
    RoomsManagement
  ]
})
export class RoomsManagementModule {}
