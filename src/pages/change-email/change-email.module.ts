import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeEmail } from './change-email';

@NgModule({
  declarations: [
    ChangeEmail,
  ],
  imports: [
    IonicPageModule.forChild(ChangeEmail),
  ],
  exports: [
    ChangeEmail
  ]
})
export class ChangeEmailModule {}
