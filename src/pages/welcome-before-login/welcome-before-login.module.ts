import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeBeforeLogin } from './welcome-before-login';

@NgModule({
  declarations: [
    WelcomeBeforeLogin,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeBeforeLogin),
  ],
  exports: [
    WelcomeBeforeLogin
  ]
})
export class WelcomeBeforeLoginModule {}
