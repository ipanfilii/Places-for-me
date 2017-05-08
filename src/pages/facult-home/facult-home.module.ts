import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacultHome } from './facult-home';

@NgModule({
  declarations: [
    FacultHome,
  ],
  imports: [
    IonicPageModule.forChild(FacultHome),
  ],
  exports: [
    FacultHome
  ]
})
export class FacultHomeModule {}
