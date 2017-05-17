import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountManagement } from './account-management';

@NgModule({
  declarations: [
    AccountManagement,
  ],
  imports: [
    IonicPageModule.forChild(AccountManagement),
  ],
  exports: [
    AccountManagement
  ]
})
export class AccountManagementModule {}
