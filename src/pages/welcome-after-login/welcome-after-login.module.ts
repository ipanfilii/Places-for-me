import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeAfterLogin } from './welcome-after-login';

@NgModule({
  declarations: [
    WelcomeAfterLogin,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeAfterLogin),
  ],
  exports: [
    WelcomeAfterLogin
  ]
})
export class WelcomeAfterLoginModule {}
