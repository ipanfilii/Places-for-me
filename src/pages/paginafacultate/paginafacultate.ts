import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  selector: 'page-paginafacultate',
  templateUrl: 'paginafacultate.html',
})
export class Paginafacultate {
  public item: any;
  public rootPage: string = "Viewpage";
  public rootOrar: string = "Orarcontent";
  public rootLiga: string = "Ligacontent";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataTabs: DataTabs,
              public modalCtrl: ModalController ) {
          this.item = navParams.get('item');
          this.dataTabs.setMessage( this.item );
  }

  ionViewDidLoad() {
  }

  presentProfileModal() { 
   let profileModal = this.modalCtrl.create( 'facult-home', { tip: this.item });
   profileModal.present();

 }

  addNew() {
    let profileModall = this.modalCtrl.create( 'facult-home', { idd: 1 , facultate:this.dataTabs.message.note});
    profileModall.present();

 }
}
