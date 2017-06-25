import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountManagement } from './account-management';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    AccountManagement,
  ],
  imports: [
    IonicPageModule.forChild(AccountManagement),
    IonicImageViewerModule
  ],
  exports: [
    AccountManagement
  ]
})
export class AccountManagementModule {}
