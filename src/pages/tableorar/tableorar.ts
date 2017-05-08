import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

/**
 * Generated class for the Tableorar page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tableorar',
  templateUrl: 'tableorar.html',
})
export class Tableorar {

  constructor(public navCtrl: NavController, 
      public modalCtrl: ModalController,
      public dataTabs: DataTabs,
      public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableorarPage');
  }

  dataOrar(event, item, serie, year){
    console.log(item,serie,year);
    let orarModal = this.modalCtrl.create('Orarcontent', {
      facData:item,
      serie:serie,
      year:year
    });
    orarModal.present();
  }
}
