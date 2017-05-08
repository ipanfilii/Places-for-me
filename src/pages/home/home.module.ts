import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage),
  SuperTabsModule
  ],
  exports:[ HomePage ]
})
export class HomePageModule { }
