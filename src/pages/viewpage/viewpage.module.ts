import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Viewpage } from './viewpage';

@NgModule({
  declarations: [
    Viewpage,
  ],
  imports: [
    IonicPageModule.forChild(Viewpage),
  ],
  exports: [
    Viewpage
  ]
})
export class ViewpageModule {}
