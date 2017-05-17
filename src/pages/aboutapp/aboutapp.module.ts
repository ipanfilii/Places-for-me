import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Aboutapp } from './aboutapp';

@NgModule({
  declarations: [
    Aboutapp,
  ],
  imports: [
    IonicPageModule.forChild(Aboutapp),
  ],
  exports: [
    Aboutapp
  ]
})
export class AboutappModule {}
