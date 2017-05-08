import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Orarcontent } from './orarcontent';

@NgModule({
  declarations: [
    Orarcontent,
  ],
  imports: [
    IonicPageModule.forChild(Orarcontent),
  ],
  exports: [
    Orarcontent
  ]
})
export class OrarcontentModule {}
