import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ligacontent } from './ligacontent';

@NgModule({
  declarations: [
    Ligacontent,
  ],
  imports: [
    IonicPageModule.forChild(Ligacontent),
  ],
  exports: [
    Ligacontent
  ]
})
export class LigacontentModule {}
