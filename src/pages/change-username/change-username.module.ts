import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeUsername } from './change-username';

@NgModule({
  declarations: [
    ChangeUsername,
  ],
  imports: [
    IonicPageModule.forChild(ChangeUsername),
  ],
  exports: [
    ChangeUsername
  ]
})
export class ChangeUsernameModule {}
