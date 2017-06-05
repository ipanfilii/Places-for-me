import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEvent } from './create-event';

@NgModule({
  declarations: [
    CreateEvent,
  ],
  imports: [
    IonicPageModule.forChild(CreateEvent),
  ],
  exports: [
    CreateEvent
  ]
})
export class CreateEventModule {}
