import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Paginafacultate } from './paginafacultate';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    Paginafacultate,
  ],
  imports: [
    IonicPageModule.forChild(Paginafacultate),
    SuperTabsModule
  ],
  exports: [
    Paginafacultate
  ]
})
export class PaginafacultateModule {}
