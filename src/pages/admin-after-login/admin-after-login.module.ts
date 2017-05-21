import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAfterLogin } from './admin-after-login';

@NgModule({
  declarations: [
    AdminAfterLogin,
  ],
  imports: [
    IonicPageModule.forChild(AdminAfterLogin),
  ],
  exports: [
    AdminAfterLogin
  ]
})
export class AdminAfterLoginModule {}
