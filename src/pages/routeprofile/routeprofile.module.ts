import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Routeprofile } from './routeprofile';

@NgModule({
  declarations: [
    Routeprofile,
  ],
  imports: [
    IonicPageModule.forChild(Routeprofile),
  ],
  exports: [
    Routeprofile
  ]
})
export class RouteprofileModule {}
