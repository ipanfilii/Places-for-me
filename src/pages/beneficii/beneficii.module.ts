import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Beneficii } from './beneficii';

@NgModule({
  declarations: [
    Beneficii,
  ],
  imports: [
    IonicPageModule.forChild(Beneficii),
  ],
  exports: [
    Beneficii
  ]
})
export class BeneficiiModule {}
